import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button, FormControlLabel, Switch } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";

export const Lists = ({ setListItems, listItems }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [addingChor, setAddingChor] = React.useState(false);
  const [newChorName, setNewChorName] = React.useState("");
  const [newChorDate, setNewChorDate] = React.useState(new Date());
  const [newChorNameError, setNewChorNameError] = React.useState(false);
  const [newAlertBeforeHours, setNewAlertBeforeHours] = React.useState(24);

  const handleChange = (expandedValue) => {
    setExpanded(expandedValue);
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/lists")
      .then((res) => res.json())
      .then((data) => setListItems(data.lists));
  }, [setListItems]);

  const deleteList = (id) => {
    fetch("http://localhost:8080/list", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.status === 204) {
        setListItems(listItems.filter((listItem) => listItem.id !== id));
      }
    });
  };

  const deleteChor = (chorId, listId) => {
    fetch("http://localhost:8080/chor", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: chorId }),
    }).then((res) => {
      if (res.status === 204) {
        const updatedListItems = listItems.map((list) => {
          if (list.id === listId) {
            list.chor = list.chor.filter((el) => el.id !== chorId);
          }
          return list;
        });
        setListItems(updatedListItems);
      }
    });
  };

  const updateChor = async (id, name, until, done, alertBeforeHours) => {
    const res = await fetch("http://localhost:8080/chor", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, until, done, alertBeforeHours }),
    });

    if (res.status === 200) {
      return true;
    }
    return false;
  };

  const insertChor = async (id, name, until, alertBeforeHours) => {
    const res = await fetch("http://localhost:8080/chor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listId: id, name, until, alertBeforeHours }),
    });

    if (res.status === 201) {
      setNewChorName("");
      setNewChorDate(new Date());
      setAddingChor(false);
      const resJson = await res.json();
      return resJson.chor;
    }

    return null;
  };

  const updateListItems = async (chorId, value) => {
    const updated = await updateChor(chorId, null, null, value, null);

    if (updated) {
      const updatedListItems = listItems.map((list) => {
        const updatedChors = list.chor.map((listChor) => {
          if (listChor.id === chorId) {
            listChor.done = value;
          }
          return listChor;
        });

        list.chor = updatedChors;
        return list;
      });
      setListItems(updatedListItems);
    }
  };

  const addChorHtml = (id) => {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            error={newChorNameError}
            id="outlined-required"
            label={newChorNameError ? "Empty not valid" : "Chor name"}
            onChange={(e) => setNewChorName(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Todo until"
              value={newChorDate}
              onChange={(newValue) => {
                setNewChorDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            label="Alert before X hours"
            value={newAlertBeforeHours}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => setNewAlertBeforeHours(e.target.value)}
          />
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={async () => {
              if (newChorName === "") {
                setNewChorNameError(true);
                return;
              }
              const insertedChor = await insertChor(
                id,
                newChorName,
                newChorDate,
                newAlertBeforeHours
              );

              if (insertedChor) {
                const updatedListItems = listItems.map((list) => {
                  if (list.id === id) {
                    list.chor = list.chor.concat([insertedChor]);
                  }

                  return list;
                });
                setListItems(updatedListItems);
              }
              setNewChorNameError(false);
              setNewAlertBeforeHours(24);
            }}
          >
            Save
          </Button>
        </div>
      </Box>
    );
  };

  const renderLists = () => {
    const lists = listItems.map((listItem, index) => {
      const chors = listItem.chor.map((chor, index) => {
        return (
          <AccordionDetails key={index} sx={{ display: "flex" }}>
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {chor.name}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={chor.done}
                  onClick={() => {
                    updateListItems(chor.id, !chor.done);
                  }}
                />
              }
              label="Done"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputProps={{
                  style:
                    chor.done === true
                      ? {}
                      : new Date(chor.until) < new Date()
                      ? {
                          backgroundColor: "#e13f3f",
                        }
                      : (new Date(chor.until) - new Date()) / 3600000 >
                        chor.alert_before_hours
                      ? {}
                      : {
                          backgroundColor: "#e13f3f",
                        },
                }}
                label="Todo until"
                value={new Date(chor.until)}
                onChange={async (newValue) => {
                  const response = await updateChor(
                    chor.id,
                    null,
                    newValue,
                    null,
                    null
                  );

                  if (response) {
                    const updatedListItems = listItems.map((list) => {
                      const updatedChors = list.chor.map((listChor) => {
                        if (listChor.id === chor.id) {
                          listChor.until = newValue;
                        }
                        return listChor;
                      });

                      list.chor = updatedChors;
                      return list;
                    });
                    setListItems(updatedListItems);
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              label="Alert before X hours"
              value={chor.alert_before_hours}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={async (e) => {
                if (!parseInt(e.target.value)) {
                  return;
                }

                const updatedListItems = listItems.map((list) => {
                  const updatedChors = list.chor.map((listChor) => {
                    if (listChor.id === chor.id) {
                      listChor.alert_before_hours = parseInt(e.target.value);
                    }
                    return listChor;
                  });

                  list.chor = updatedChors;
                  return list;
                });
                setListItems(updatedListItems);
                const response = await updateChor(
                  chor.id,
                  null,
                  null,
                  null,
                  e.target.value
                );
                if (response) {
                }
              }}
            />
            <DeleteIcon
              sx={{ margin: "auto" }}
              color="error"
              onClick={() => deleteChor(chor.id, listItem.id)}
            />
          </AccordionDetails>
        );
      });
      return (
        <Accordion expanded={expanded === index} key={index}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                // If expanded is false, then set expanded to current index to open list
                // If expanded is not false then check if index is equal to expanded then close current expanded list
                // If expanded is not false and index is not equal to expanded then close current expanded list and open new one
                onClick={() =>
                  handleChange(
                    expanded === false
                      ? index
                      : expanded === index
                      ? false
                      : index
                  )
                }
              />
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <DeleteIcon color="error" onClick={() => deleteList(listItem.id)} />
            <Typography variant="h6" sx={{ width: "100%", flexShrink: 0 }}>
              {listItem.name}
            </Typography>
          </AccordionSummary>
          {addingChor ? null : (
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => {
                setAddingChor(true);
              }}
            >
              Add chor
            </Button>
          )}
          {addingChor ? addChorHtml(listItem.id) : chors}
        </Accordion>
      );
    });

    return <div>{lists}</div>;
  };
  return <div>{renderLists()}</div>;
};
