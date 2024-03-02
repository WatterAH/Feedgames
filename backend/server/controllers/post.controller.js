import { supabase } from "../database/connection.js";
import { getPostsByIds, getSavedById } from "../database/postGetter.js";
import { uploadImage } from "../database/insert.js";
import { getDate } from "../libs/dates.js";

export const createNewPost = async (req, res) => {
  try {
    let { user_id, content, tags } = req.body;
    tags = JSON.parse(tags);
    const image = req.file ? req.file : {};
    let publicUrl = null;
    if (!content.trim() && !image.buffer) {
      return res.status(400).json({ message: "No se permiten posts vacios" });
    }
    if (image.buffer) {
      const { filename, error } = await uploadImage(image, "images");
      publicUrl = filename;
      if (error) {
        return res.status(400).json({ message: "No se pudo subir la imagen" });
      }
    }
    const created_at = getDate();
    const insertData = { user_id, created_at, content, tags, publicUrl };
    const { error } = await supabase.from("posts").insert([insertData]);
    if (error) {
      return res.status(400).json({ message: "Error al crear el blog" });
    } else {
      return res.status(200).json({ message: "Has creado un nuevo blog!" });
    }
  } catch (error) {
    console.log(error);
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
          const { saved, ...rest } = post;
          const isSaved = saved.some((save) => save.id_user == id);
          return { ...rest, isSaved };
        });

        return res.status(200).json(posts);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "El servidor tuvo un problema" });
  }
};
