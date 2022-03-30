import { fetchTodos } from "src/services/api";
import { TodoType } from "src/types";

export const loadTodos = (): any => {
  // redux-thunk 형식
  return async (dispatch: any) => {
    dispatch(setTodos([]));
    const todos = await fetchTodos();
    dispatch(setTodos(todos.slice(0, 10)));
  };
};

export const setTodos = (todos: Array<TodoType>) => {
  return {
    type: "SET",
    payload: { todos },
  };
};

export const deleteTodo = (id: number) => {
  return {
    type: "DELETE",
    payload: { id },
  };
};
