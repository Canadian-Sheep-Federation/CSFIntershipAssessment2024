import { Answer, Record } from "./../types";

const BASE_URL = "http://localhost:3001/api/v1"; // TODO - Should retrieve from env instead

/**
 * Fetches a previously submitted record by ID
 * @param id The ID of the record to be fetched
 * @returns Promise<Record> or null on error
 */
export async function getRecordById(id: number): Promise<Record | null> {
  return fetch(`${BASE_URL}/records/${id}`)
    .then((response) => response.json())
    .then((r) => ({
      id: r.id,
      name: r.name,
      difficulty: r.difficulty,
      category: r.category,
      question: r.question,
      answer: r.answer,
    }))
    .catch((error) => {
      console.error(error);
      return null;
    });
}

/**
 * Fetches a list of all previously submitted records.
 * Returns the empty array on error.
 * @returns Promise<Record[]>
 */
export async function getAllRecords(): Promise<Record[]> {
  return fetch(`${BASE_URL}/records`)
    .then((response) => response.json())
    .then((res) =>
      res.map((r: any) => ({
        id: r.id,
        name: r.name,
        difficulty: r.difficulty,
        category: r.category,
        question: r.question,
        answer: r.answer,
      }))
    )
    .catch((error) => {
      console.error(error);
      return [];
    });
}

/**
 * Submits a record to the Records API to be stored
 * @param record The record to be submitted
 */
export async function postAnswer(ans: Answer) {
  return fetch(`${BASE_URL}/records`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ans),
  })
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(
        "Error happened while trying to send POST req to records"
      );
    })
    .then((res) => {
      console.log(`Record has been submitted! ID: ${res.id}`);
    });
}
