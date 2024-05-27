import { BASE_URL } from "./constant";
import { SearchResponse } from "./models";

export const getAnimeInfo = async (title: string) => {
  const res = await fetch(`${BASE_URL}?q=${title}`);
  const data = (await res.json()) as SearchResponse;

  if (data.data[0] == undefined) {
    console.log("No anime could be found with title");
  } else {
    return data.data[0];
  }
};
