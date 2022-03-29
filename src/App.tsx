import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTodos } from "./redux/action";
import TodoContainer from "./components/TodoContainer";

function App() {
  const dispatch = useDispatch();

  // store tasks에 데이터 넣기 => dispatch 이용
  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  return (
    <div className="App">
      <TodoContainer />
    </div>
  );
}

export default App;
