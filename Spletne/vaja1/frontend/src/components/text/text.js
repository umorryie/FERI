import { Alert, TextField } from "@mui/material";
import * as React from "react";

export const Text = ({ label, setListItems, listItems }) => {
  const [name, setName] = React.useState("");
  const [showAlert, setShowAler] = React.useState(false);
  const [alertStatus, setAlertStatus] = React.useState(null);
  const insertList = (nameValue) => {
    fetch("http://localhost:8080/list", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nameValue }),
    })
      .then((res) => {
        setName("");
        setAlertStatus(res.status);
        setShowAler(true);
        setTimeout(() => {
          setShowAler(false);
        }, 2000);
        return res.json();
      })
      .then((res) => {
        if (res.list) {
          setListItems(
            listItems.concat([{ id: res.list.id, name: nameValue, chor: [] }])
          );
        }
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      insertList(name);
    }
  };

  const onKeyChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <TextField
        id="standard-basic"
        label={label}
        value={name}
        variant="standard"
        onChange={onKeyChange}
        onKeyDown={handleKeyDown}
      />
      {showAlert ? (
        alertStatus === 201 ? (
          <Alert severity="success">List added successfully!</Alert>
        ) : (
          <Alert severity="error">Error adding new list!</Alert>
        )
      ) : null}
    </div>
  );
};
