import * as React from "react";

import "./App.css";
import { Text } from "./components/text/text";
import { Lists } from "./components/todoLists/lists";

function App() {
  const [listItems, setListItems] = React.useState([]);

  return (
    <div className="App">
      <Text
        listItems={listItems}
        setListItems={setListItems}
        label="Todo list name"
      ></Text>
      <Lists listItems={listItems} setListItems={setListItems}></Lists>
    </div>
  );
}

export default App;
