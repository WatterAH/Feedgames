import React from "react";
import { Label } from "../Label";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import { CreateTags } from "./CreateTags";
import { Button } from "../Button";
import { Loading } from "../Loading";

export const CreateBlogForm = (props) => {
  const { title, content, image, tags } = props.formData;
  const { setTitle, setContent, setImage, setTags } = props.alterFormData;
  const { loading } = props.loading;

  return (
    <form className="flex flex-col gap-y-5" onSubmit={props.handlePost}>
      <section className="flex flex-col gap-y-2">
        <Label>Titulo</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingresa el titulo de tu post"
        />
      </section>
      <section className="flex flex-col gap-y-2 relative">
        <Label>Contenido</Label>
        <TextArea content={content} setContent={setContent} />
      </section>
      {/* <section className="flex flex-col gap-y-2">
        <Label>Imagen (opcional)</Label>
        <Input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="file"
          placeholder="Ingresa el titulo de tu Post"
        />
      </section> */}
      <section className="flex flex-col gap-y-2">
        <Label>Etiquetas</Label>
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
