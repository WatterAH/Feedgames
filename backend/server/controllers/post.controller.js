import { supabase } from "../database/connection.js";
import { getPostsByIds, getSavedById } from "../database/simpleGet.js";
import { getDate } from "../libs/dates.js";

export const createNewPost = async (req, res) => {
  try {
    const { user_id, title, content, tags } = req.body;
    if (!title.trim()) {
      return res.status(400).json({ message: "El post necesita un titulo" });
    }
    if (!content.trim()) {
      return res.status(400).json({ message: "¡No hay post sin contenido!" });
    }
    const created_at = getDate();
    const { error } = await supabase.from("posts").insert([
      {
        user_id,
        created_at,
        title,
        content,
        tags,
      },
    ]);
    if (error) {
      return res.status(400).json({ message: "Error al crear el blog" });
    } else {
      return res.status(200).json({ message: "Has creado un nuevo blog!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};

export const loadSaved = async (req, res) => {
  try {
    const { id } = req.query;
    const { data, error } = await getSavedById(id);
    if (error) {
      return res
        .status(400)
        .json({ message: "Error al obtener las publicaciones" });
    } else {
      const postsIds = data.map((savedPost) => savedPost.id_post);
      let { data: posts, error: postsError } = await getPostsByIds(postsIds);
      if (postsError) {
        return res
          .status(400)
          .json({ message: "Error al obtener las publicaciones" });
      } else {
        posts = posts.map((post) => {
          const {
            users: { username },
            saved,
            ...rest
          } = post;
          const isSaved = saved.some((save) => save.id_user == id);
          return { ...rest, isSaved, username };
        });

        return res.status(200).json(posts);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
