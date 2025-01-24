import { User } from "./User";
import { MatchShowCase } from "./Valorant";

export interface PixelArtProps {
  gridSize: number;
  cells: string;
}

export interface PostInterface {
  id: string;
  text: string;
  order: string;
  user: User;
  user_id: string;
  liked: number;
  isLiked: boolean;
  saved: number;
  isSaved: boolean;
  responsed: number;
  parentId: string | null;
  edited: boolean;
  content:
    | { type: "image"; data: { url: string } }
    | { type: "valorant"; data: MatchShowCase }
    | { type: "pixelart"; data: { gridSize: number; cells: string } }
    | { type: "textonly"; data: null };
}

export type ContentInterface =
  | { type: "image"; data: File }
  | { type: "valorant"; data: MatchShowCase }
  | { type: "pixelart"; data: PixelArtProps }
  | { type: "textonly"; data: null };

export type ContentObject = ContentInterface | null;
