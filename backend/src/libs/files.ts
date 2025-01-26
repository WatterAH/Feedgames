import { v4 as uuidv4 } from "uuid";
import { supabase } from "../middlewares/connection";
import userService from "../service/userService";

type FolderName = "pfp" | "images";
type Image = {
  mimetype: string;
  buffer: Buffer;
};

class Files {
  async createFile(image: Image, folder: FolderName) {
    const { mimetype, buffer } = image;
    const filename = uuidv4();

    const file = new Blob([buffer], { type: mimetype });

    const { error } = await supabase.storage
      .from("Images")
      .upload(`${folder}/${filename}`, file);

    return { filename, error };
  }

  async deleteFile(filename: string, folder: FolderName) {
    const { error } = await supabase.storage
      .from("Images")
      .remove([`${folder}/${filename}`]);

    return { error };
  }

  async uploadPostImage(
    image: Express.Multer.File | undefined
  ): Promise<string | null> {
    if (!image) return null;

    const { filename, error } = await this.createFile(image, "images");
    if (error) {
      throw new Error("Error al subir la imagen");
    }
    return filename;
  }

  async updateProfilePicture(
    image: Express.Multer.File | undefined,
    userId: string
  ): Promise<string | null> {
    if (!image) return null;

    const user = await userService.getProfileById(userId);
    if (!user) throw new Error("Error al actualizar la imagen");

    if (user.pfp) this.deleteFile(user.pfp, "pfp");

    const { filename, error: fileError } = await this.createFile(image, "pfp");

    if (fileError) throw new Error("Error al actualizar la imagen");

    return filename;
  }
}

export default new Files();
