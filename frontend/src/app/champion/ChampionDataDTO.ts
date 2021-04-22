export class ChampionDataDTO {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: Object;
  image: Object;
  tags: Object;
  partype: string;
  stats: Object;
}

export class ChampionsData {
  type: string;
  format: string;
  version: string;
  data: { [championName: string]: ChampionDataDTO };
}
