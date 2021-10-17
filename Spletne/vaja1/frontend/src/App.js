import "./App.css";
import { Text } from "./components/text/text";
import { Lists } from "./components/todoLists/lists";

function App() {
  return (
    <div className="App">
      <Text label="Todo"></Text>
      <Lists></Lists>
    </div>
  );
}

export default App;
