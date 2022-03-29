import { todoReducer } from ".";
import { setTodos, deleteTodo } from "../action";

import { todos } from "src/fixtures/todos";

describe("todoReducer", () => {
  it("SET", () => {
    // Action Type이 'SET' 일 때, 행동 테스트
    const state = todoReducer(
      {
        todos: [],
      },
      setTodos(todos)
    );

    expect(state.todos).not.toHaveLength(0);
  });

  it("DELETE", () => {
    // Action  Type이 'DELETE' 일 때, 행동 테스트
    const state = todoReducer(
      {
        todos: [
          {
            id: 1,
            title: "RTL 배우기",
          },
        ],
      } as any,
      deleteTodo(1)
    );

    expect(state.todos).toHaveLength(0);
  });
});
