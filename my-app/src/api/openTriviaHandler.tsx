import { Question } from "./../types";

const BASE_URL = "https://opentdb.com/api.php"; // TODO - Should retrieve from env instead

/**
 * Fetches a list of trivia questions from Open Trivia Database API
 * @param n The amount of questions to query from the API
 * @returns
 */
export async function getQuestions(n: number = 1): Promise<Question[]> {
  return fetch(`${BASE_URL}?amount=${n}&encode=base64`)
    .then((response) => response.json())
    .then((json) => {
      console.log(JSON.stringify(json));
      return json.results.map((q: any) => {
        const { type, difficulty, category, question } = q;
        return {
          difficulty: atob(difficulty),
          category: atob(category),
          question:
            type === "Ym9vbGVhbg==" // if type is a true/false question
              ? `True or false? ${atob(question)}`
              : atob(question),
        };
      });
    })
    .catch((error) => console.error(error));
}
