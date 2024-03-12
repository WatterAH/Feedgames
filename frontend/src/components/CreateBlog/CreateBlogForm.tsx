import React, { useState } from "react";
import { Label } from "../Label";
import { TextArea } from "../TextArea";
import { CreateTags } from "./CreateTags";
import { Button } from "../Button";
import { Loading } from "../Loading";
import { ImageInput } from "./ImageInput";
import { ValoranTracker } from "./ValorantTracker";
import { Preview } from "./DisplayContent";
import { Match } from "../../interfaces/Valorant";

interface Props {
  loading: boolean;
  formData: {
    content: string;
    tags: string[];
  };
  alterFormData: any;
  handlePost: React.FormEventHandler<HTMLFormElement>;
}

export const CreateBlogForm: React.FC<Props> = ({
  formData,
  alterFormData,
  handlePost,
  loading,
}) => {
  const { content, tags } = formData;
  const { setContent, setImage, setTags } = alterFormData;
  const [preview, setPreview] = useState<string | ArrayBuffer | Match | null>(
    null
  );

  return (
    <form className="flex flex-col gap-y-3 px-4 py-2" onSubmit={handlePost}>
      <section className="flex flex-col gap-y-2 relative">
        <TextArea content={content} setContent={setContent} />
      </section>
      <Preview preview={preview} />
      <section className="flex justify-center items-center gap-x-2">
        {/* <ValoranTracker setPreview={setPreview} /> */}
        <ImageInput setImage={setImage} setPreview={setPreview} />
      </section>
      <section className="flex flex-col gap-y-2">
        <Label>Etiquetas (Opcional) </Label>
        <CreateTags tags={tags} setTags={setTags} />
      </section>
      <span className="flex justify-center relative">
        <Button type="submit" disabled={loading}>
          {loading ? "" : "Continuar"}
        </Button>
        {loading ? <Loading /> : ""}
      </span>
    </form>
  );
};
