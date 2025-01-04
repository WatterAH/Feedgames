type MapDictionary = {
  [key: string]: { mapName: string; mapIcon: string };
};

const mapDictionary: MapDictionary = {
  "/Game/Maps/Ascent/Ascent": {
    mapName: "Ascent",
    mapIcon:
      "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/listviewicon.png",
  },
  "/Game/Maps/Bonsai/Bonsai": {
    mapName: "Split",
    mapIcon:
      "https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/listviewicon.png",
  },
  "/Game/Maps/Canyon/Canyon": {
    mapName: "Fracture",
    mapIcon:
      "https://media.valorant-api.com/maps/b529448b-4d60-346e-e89e-00a4c527a405/listviewicon.png",
  },
  "/Game/Maps/Duality/Duality": {
    mapName: "Bind",
    mapIcon:
      "https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/listviewicon.png",
  },
  "/Game/Maps/Foxtrot/Foxtrot": {
    mapName: "Breeze",
    mapIcon:
      "https://media.valorant-api.com/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53/listviewicon.png",
  },
  "/Game/Maps/Infinity/Infinity": {
    mapName: "Abyss",
    mapIcon:
      "https://media.valorant-api.com/maps/224b0a95-48b9-f703-1bd8-67aca101a61f/listviewicon.png",
  },
  "/Game/Maps/Jam/Jam": {
    mapName: "Lotus",
    mapIcon:
      "https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6b-e89a78e680a9/listviewicon.png",
  },
  "/Game/Maps/Juliett/Juliett": {
    mapName: "Sunset",
    mapIcon:
      "https://media.valorant-api.com/maps/92584fbe-486a-b1b2-9faa-39b0f486b498/listviewicon.png",
  },
  "/Game/Maps/Pitt/Pitt": {
    mapName: "Pearl",
    mapIcon:
      "https://media.valorant-api.com/maps/fd267378-4d1d-484f-ff52-77821ed10dc2/listviewicon.png",
  },
  "/Game/Maps/Port/Port": {
    mapName: "Icebox",
    mapIcon:
      "https://media.valorant-api.com/maps/e2ad5c54-4114-a870-9641-8ea21279579a/listviewicon.png",
  },
  "/Game/Maps/Triad/Triad": {
    mapName: "Haven",
    mapIcon:
      "https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/listviewicon.png",
  },
};

type MapUrl = keyof typeof mapDictionary;

export function getMap(url: MapUrl) {
  return mapDictionary[url];
}
