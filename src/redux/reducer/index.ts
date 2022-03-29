const initialState = {
  todos: [],
};

export function todoReducer(state = initialState, action: any) {
  const { todos } = state;
  switch (action.type) {
    case "SET":
      return {
        ...state,
        todos: action.payload.todos,
      };
    case "DELETE":
      return {
        ...state,
        todos: todos.filter((todo: any) => todo.id !== action.payload.id),
      };
    default:
      return state;
  }
}
