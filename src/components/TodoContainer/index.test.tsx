/* eslint-disable jest/no-mocks-import */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDispatch, useSelector } from "react-redux";
import TodoContainer from ".";
import { todos } from "src/fixtures/todos";

// 필요한 패키지 속 함수를 mocking!
jest.mock("react-redux");

describe("<TodoContainer>", () => {
  it("renders TodoContainer", () => {
    const dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector: any) =>
      selector({
        todos: todos,
      })
    );

    const { container } = render(<TodoContainer />);

    expect(container).toHaveTextContent("TDD 배우기");

    // Dispatch 동작
    const buttons = screen.getAllByText("삭제");
    userEvent.click(buttons[0]);

    expect(dispatch).toBeCalledWith({
      type: "DELETE",
      payload: {
        id: 1,
      },
    });
  });
});
