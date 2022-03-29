import React from "react";
import TodoItem from "../TodoItem";
import { TodoType } from "src/types";

export interface TodoListProp {
  todos: TodoType[];
  onRemove?: any;
}

const TodoList: React.FC<TodoListProp> = ({ todos, onRemove }) => {
  return (
    <ul data-testid="TodoList">
      {!todos.length ? (
        <div>할 일이 없어요</div>
      ) : (
        todos.map((task) => (
          <TodoItem todo={task} key={task.id} onRemove={onRemove} />
        ))
      )}
    </ul>
  );
};

export default TodoList;
