import React, { ReactNode } from "react";
import { TodoType } from "src/types";

interface TodoItemProps {
  children?: ReactNode;
  todo: TodoType;
  onRemove?: any;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onRemove }) => {
  const { id, title } = todo;
  const handleRemove = () => onRemove(id);

  return (
    <li>
      <span>{title}</span>
      <button onClick={handleRemove}>삭제</button>
    </li>
  );
};

export default TodoItem;
