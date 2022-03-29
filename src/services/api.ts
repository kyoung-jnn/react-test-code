import axios from "axios";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTodos() {
  const { data } = await axios.get(TODOS_URL);
  return data;
}
