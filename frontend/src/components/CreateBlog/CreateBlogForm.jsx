import React from "react";
import { Label } from "../Label";
import { TextArea } from "../TextArea";
import { CreateTags } from "./CreateTags";
import { Button } from "../Button";
import { Loading } from "../Loading";
import { ImageInput } from "./ImageInput";

export const CreateBlogForm = (props) => {
  const { content, tags } = props.formData;
  const { setContent, setImage, setTags } = props.alterFormData;
  const { loading } = props.loading;

  return (
    <form
      className="flex flex-col gap-y-3 px-4 py-2"
      onSubmit={props.handlePost}
    >
      <section className="flex flex-col gap-y-2 relative">
        <TextArea content={content} setContent={setContent} />
      </section>
      <section className="flex flex-col gap-y-2">
        <ImageInput setImage={setImage} />
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
