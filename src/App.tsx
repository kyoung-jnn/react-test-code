import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import { setTodos } from "src/redux/action";

function App() {
  // const dispatch = useDispatch();
  const { todos } = useSelector((state: any) => ({ todos: state.todos }));

  /*  useEffect(() => {
    dispatch(setTodos(todos));
  }, []);
 */
  return (
    <div className="App">
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
