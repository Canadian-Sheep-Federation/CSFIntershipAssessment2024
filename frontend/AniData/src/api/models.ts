export interface SearchResponse {
  data: Data[];
}

export interface Data {
  mal_id: number;
  title: string;
  rating: string;
  synopsis?: string;
  genres: Genre[];
  images: Images;
  score?: number;
  url: string;
}

export interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Images {
  webp: Webp;
}

export interface Webp {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export type Anime = {
  title: string;
  description: string;
  genre: string;
  rating: number;
  url: string;
  image: string;
};
