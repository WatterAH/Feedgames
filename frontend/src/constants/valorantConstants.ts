import { queueId } from "../interfaces/Valorant";

export const getMapId = (assetPath: string) => {
  switch (assetPath) {
    case "/Game/Maps/Ascent/Ascent":
      return "7eaecc1b-4337-bbf6-6ab9-04b8f06b3319";
    case "/Game/Maps/Bonsai/Bonsai":
      return "d960549e-485c-e861-8d71-aa9d1aed12a2";
    case "/Game/Maps/Canyon/Canyon":
      return "b529448b-4d60-346e-e89e-00a4c527a405";
    case "/Game/Maps/Duality/Duality":
      return "2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba";
    case "/Game/Maps/Foxtrot/Foxtrot":
      return "2fb9a4fd-47b8-4e7d-a969-74b4046ebd53";
    case "/Game/Maps/HURM/HURM_Alley/HURM_Alley":
      return "690b3ed2-4dff-945b-8223-6da834e30d24";
    case "/Game/Maps/HURM/HURM_Bowl/HURM_Bowl":
      return "12452a9d-48c3-0b02-e7eb-0381c3520404";
    case "/Game/Maps/HURM/HURM_Helix/HURM_Helix":
      return "2c09d728-42d5-30d8-43dc-96a05cc7ee9d";
    case "/Game/Maps/HURM/HURM_Yard/HURM_Yard":
      return "de28aa9b-4cbe-1003-320e-6cb3ec309557";
    case "/Game/Maps/Jam/Jam":
      return "2fe4ed3a-450a-948b-6d6b-e89a78e680a9";
    case "/Game/Maps/Juliett/Juliett":
      return "92584fbe-486a-b1b2-9faa-39b0f486b498";
    case "/Game/Maps/Pitt/Pitt":
      return "fd267378-4d1d-484f-ff52-77821ed10dc2";
    case "/Game/Maps/Port/Port":
      return "e2ad5c54-4114-a870-9641-8ea21279579a";
    case "/Game/Maps/Triad/Triad":
      return "2bee0dc9-4ffe-519b-1cbd-7fbe763a6047";
    default:
      return "";
  }
};

export const getMapName = (assetPath: string) => {
  switch (assetPath) {
    case "/Game/Maps/Ascent/Ascent":
      return "Ascent";
    case "/Game/Maps/Bonsai/Bonsai":
      return "Split";
    case "/Game/Maps/Canyon/Canyon":
      return "Fracture";
    case "/Game/Maps/Duality/Duality":
      return "Bind";
    case "/Game/Maps/Foxtrot/Foxtrot":
      return "Breeze";
    case "/Game/Maps/HURM/HURM_Alley/HURM_Alley":
      return "District";
    case "/Game/Maps/HURM/HURM_Bowl/HURM_Bowl":
      return "Kasbah";
    case "/Game/Maps/HURM/HURM_Helix/HURM_Helix":
      return "Drift";
    case "/Game/Maps/HURM/HURM_Yard/HURM_Yard":
      return "Piazza";
    case "/Game/Maps/Jam/Jam":
      return "Lotus";
    case "/Game/Maps/Juliett/Juliett":
      return "Sunset";
    case "/Game/Maps/Pitt/Pitt":
      return "Pearl";
    case "/Game/Maps/Port/Port":
      return "Icebox";
    case "/Game/Maps/Triad/Triad":
      return "Haven";
    default:
      return "";
  }
};

export const getQueueId = (queueId: queueId) => {
  switch (queueId) {
    case "competitive":
      return "Competitivo";
    case "ggteam":
      return "Carrera de armas";
    case "unrated":
      return "Normal";
    case "swiftplay":
      return "SwiftPlay";
    case "spikerush":
      return "SpikeRush";
    case "":
      return "Custom";
    default:
      return queueId;
  }
};
