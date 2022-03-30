import { useEffect } from "react";
import { useDispatch } from "react-redux";
import InfoContainer from "./components/InfoContainer";
import TodoContainer from "./components/TodoContainer";
import { loadTodos } from "./redux/action";

function App() {
  const dispatch = useDispatch();

  // store tasks에 데이터 넣기 => dispatch 이용
  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  return (
    <div className="App">
      <InfoContainer onCancel={() => {}} onSubmit={() => {}} />
      <TodoContainer />
    </div>
  );
}

export default App;
