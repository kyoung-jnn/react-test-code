/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList, { TodoListProp } from ".";

import { todos } from "src/fixtures/todos";

/* 
  결국 테스트마다에서 컴포넌트를 계속 렌더링 해야하기 때문에
  중복이 생길 수 밖에 없다!

  그러므로 아래 함수처럼 렌더링 함수를 만들어서 관리하자 👍
*/
const renderTodoList = (props?: Partial<TodoListProp>) => {
  // Props로 넘겨줄 mock 함수 구현
  const handleRemove = jest.fn();

  render(
    <TodoList
      todos={props?.todos || todos}
      onRemove={handleRemove}
      {...props}
    />
  );

  return { handleRemove };
};

describe("<TodoList/>", () => {
  describe("with todos", () => {
    it("Renders TodoList", () => {
      renderTodoList();

      expect(screen.getByText("RTL 배우기")).toBeInTheDocument();
      expect(screen.getByText("TDD 배우기")).toBeInTheDocument();
    });

    it("Renders '삭제' buttons to delete a todo", () => {
      /* 중복 제거 코드 없을 때
      const onRemove = jest.fn();

      const view = render(
        <TodoList todos={todos} onRemove={onRemove} />
      );

      const buttons = view.getAllByText("완료"); // 완료 text로 가져오기

      // 이벤트 발생
      userEvent.click(buttons[0]);

      // 이벤트 Call 확인!
      expect(onRemove).toBeCalled(); 
      */

      // 중복 제거 코드 사용시
      const { handleRemove } = renderTodoList(); // 중복 제거용 함수

      const buttons = screen.getAllByText("삭제");
      userEvent.click(buttons[0]);

      expect(handleRemove).toBeCalledWith(1);
    });
  });

  describe("without todos", () => {
    it("Renders TodoList", () => {
      renderTodoList({ todos: [] });

      expect(screen.getByText("할 일이 없어요")).toBeInTheDocument();
    });
  });
});
