import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchTodos } from "src/services/api";
import { loadTodos } from ".";

jest.mock("../../services/api");

const middlewares = [thunk]; // redux-thunk 미들웨어 추가
const mockStore = configureStore(middlewares);

describe("loadTodos", () => {
  const todos = [
    { id: 1, title: "mock1" },
    { id: 2, title: "mock2" },
  ];

  beforeEach(() => {
    // API 의 return 값을 원하는대로 만들기!
    fetchTodos.mockResolvedValue(todos);
  });

  it("set todos", async () => {
    const store = mockStore({
      todos: [],
    });

    // redux-thunk action 작동
    await store.dispatch(loadTodos());

    const actions = store.getActions();

    // 'loadTodos' action 행동을 테스트
    expect(actions).toEqual([
      {
        type: "SET",
        payload: { todos: [] },
      },
      {
        type: "SET",
        payload: { todos },
      },
    ]);
  });
});
