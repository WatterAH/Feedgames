import { BotConfig, botConfigs } from "../libs/bits";
import { supabase } from "../middlewares/connection";

class GamerBot {
  private config: BotConfig;
  private baseUrl = "http://localhost:11434/api";

  constructor(botname: keyof typeof botConfigs) {
    this.config = botConfigs[botname];
  }

  public async post(): Promise<
    | { success: true; post: string; memoryId: string }
    | { success: false; error: string }
  > {
    try {
      const styleKey = this.pickStyle();
      const style =
        this.config.styles[styleKey as keyof typeof this.config.styles];

      const memoriesData = await this.memories(style.topic);

      const memoriasTop = memoriesData
        .sort((a: any, b: any) => b.points - a.points)
        .slice(0, 3)
        .map((m: any) => `- ${m.content}`)
        .join("\n");

      const memoryContext = memoriasTop
        ? `HISTORIAL DE TUS MEJORES POSTS:\n${memoriasTop}\n\nREGLA DE ORO: PROHIBIDO repetir estas frases palabra por palabra. Úsalas solo para entender la vibra, pero inventa algo NUEVO.`
        : "No tienes recuerdos previos. Sé original.";

      const messages = [
        {
          role: "system",
          content: `
            IDENTIDAD:
            ${this.config.lore}

            CONTEXTO:
            ${memoryContext}

            REGLAS ESTRICTAS DE FORMATO (¡CRÍTICO!):
            1. TONO Y LONGITUD: ${style.rules}
            2. FORMATO: TODO en minúsculas, español latinoamericano natural.
            3. ORIGINALIDAD (¡MUY IMPORTANTE!): PROHIBIDO copiar los ejemplos de las reglas o tus posts anteriores. Tienes prohibido decir las mismas frases.
            4. PROHIBIDO usar comillas ("" o '').
            5. PROHIBIDO mezclar temas. Si es de un tema, no hables de otro.
            6. Devuelve ÚNICAMENTE el texto del post. Cero introducciones, cero explicaciones, cero hashtags.
          `.trim(),
        },
        {
          role: "user",
          content: `Escribe un NUEVO post para tus seguidores. Tema principal para este post: ${style.topic.toUpperCase()}. Recuerda seguir estrictamente tu límite de palabras.`,
        },
      ];

      const rawText = await this.call(messages);

      const cleanText = rawText.replace(/^["']|["']$/g, "").trim();

      const embedding = await this.getEmbedding(cleanText);
      const query = await this.save(cleanText, embedding);

      if (query.error) return { success: false, error: query.error.message };
      if (!query.data) return { success: false, error: "No se pudo guardar" };

      return { success: true, post: cleanText, memoryId: query.data.id };
    } catch (error: any) {
      console.error("Error generando post:", error);
      return { success: false, error: error.message || "Error desconocido" };
    }
  }

  public getId() {
    return this.config.id;
  }

  public async forcePost(text: string) {
    const embedding = await this.getEmbedding(text);
    const data = await this.save(text, embedding);
    if (data.error) return { success: false, error: data.error.message };
    if (!data.data) return { success: false, error: "No se pudo guardar" };

    return { success: true, memoryId: data.data.id };
  }

  public async update(id: string, data: any) {
    await supabase.from("bot_memories").update(data).eq("id", id);
  }

  private async call(messages: { role: string; content: string }[]) {
    const res = await fetch(`${this.baseUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        stream: false,
        options: {
          temperature: 0.85,
          top_p: 0.9,
          repeat_penalty: 1.15,
        },
      }),
    });

    const data = await res.json();
    return data.message.content;
  }

  private pickStyle(): string {
    const dice = Math.random();
    let accumulator = 0;

    for (const [styleKey, styleData] of Object.entries(this.config.styles)) {
      accumulator += (styleData as any).prob;

      if (dice < accumulator) {
        return styleKey;
      }
    }

    return Object.keys(this.config.styles)[0];
  }

  private async getEmbedding(text: string) {
    const res = await fetch(`${this.baseUrl}/embeddings`, {
      method: "POST",
      body: JSON.stringify({ model: "nomic-embed-text", prompt: text }),
    });
    const data = await res.json();
    return data.embedding;
  }

  private async memories(topic: string) {
    const embedding = await this.getEmbedding(topic);
    const { data, error } = await supabase.rpc("match_memories", {
      query_embedding: embedding,
      match_threshold: 0.4,
      match_count: 3,
      target_username: this.config.name,
    });
    if (error || !data) return "";
    return data;
  }

  private async save(content: string, embedding: number[]) {
    const { data, error } = await supabase
      .from("bot_memories")
      .insert([{ username: this.config.name, content, embedding }])
      .select("id")
      .single();

    return { data, error };
  }
}

export default GamerBot;
