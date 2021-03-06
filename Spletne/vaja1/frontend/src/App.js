import * as React from "react";

import "./App.css";
import { Text } from "./components/text/text";
import { Lists } from "./components/todoLists/lists";

function App() {
  const [listItems, setListItems] = React.useState([]);

  return (
    <div className="App" style={{ width: "90%", margin: "auto" }}>
      <div style={{ margin: "30px" }}>
        <Text
          listItems={listItems}
          setListItems={setListItems}
          label="Add todo"
        ></Text>
      </div>
      <Lists listItems={listItems} setListItems={setListItems}></Lists>
    </div>
  );
}

export default App;
