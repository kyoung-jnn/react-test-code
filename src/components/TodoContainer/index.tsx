import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "src/components/TodoForm";
import TodoList from "src/components/TodoList";

import { deleteTodo, setTodos } from "src/redux/action";

import { todos as MockTodos } from "src/fixtures/todos";

function TodoContainer() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: any) => ({ todos: state.todos }));

  useEffect(() => {
    dispatch(setTodos(MockTodos));
  }, []);

  const handleRemove = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <>
      <TodoForm />
      <TodoList todos={todos} onRemove={handleRemove} />
    </>
  );
}

export default TodoContainer;
