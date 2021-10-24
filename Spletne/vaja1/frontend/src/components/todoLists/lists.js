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
import CloseIcon from "@mui/icons-material/Close";
import { Chip, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const Lists = ({ setListItems, listItems }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [addingChor, setAddingChor] = React.useState(false);
  const [newChorName, setNewChorName] = React.useState("");
  const [newChorDate, setNewChorDate] = React.useState(new Date());
  const [newChorNameError, setNewChorNameError] = React.useState(false);
  const [newAlertBeforeHours, setNewAlertBeforeHours] = React.useState(24);
  const [addingListTag, setAddingListTag] = React.useState(false);
  const [newListTagNameError, setNewListTagNameError] = React.useState(false);
  const [newListTagName, setNewListTagName] = React.useState("");
  const [addingChorTag, setAddingChorTag] = React.useState(false);
  const [newChorTagNameError, setNewChorTagNameError] = React.useState(false);
  const [newChorTagName, setNewChorTagName] = React.useState("");
  const [newEditingListName, setNewEditingListName] = React.useState("");
  const [newListNameError, setNewListNameError] = React.useState(false);
  const [editingNewListName, setEditingNewListName] = React.useState(false);

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

  const deleteTag = (id, updateType) => {
    fetch(
      `http://localhost:8080/${updateType === "list" ? "list" : "chor"}-tag`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    ).then((res) => {
      if (res.status === 204) {
        setListItems(
          listItems.map((listItem) => {
            if (updateType === "list") {
              listItem.tags = listItem.tags.filter((el) => el.id !== id);
            } else if (updateType === "chor") {
              listItem.chor = listItem.chor.map((chor) => {
                chor.tags = chor.tags.filter((tag) => tag.id !== id);
                return chor;
              });
            }
            return listItem;
          })
        );
        return true;
      }
      return false;
    });
  };

  const insertListTag = (listId, name) => {
    fetch("http://localhost:8080/list-tag", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: listId, name }),
    }).then(async (res) => {
      if (res.status === 201) {
        const jsonRes = await res.json();
        setListItems(
          listItems.map((listItem) => {
            if (listItem.id === listId) {
              listItem.tags = listItem.tags.concat([jsonRes.listTag]);
            }
            return listItem;
          })
        );
        return true;
      }
      return false;
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

  const updateList = async (id, name) => {
    const res = await fetch("http://localhost:8080/list", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name }),
    });

    if (res.status === 200) {
      const updatedListItems = listItems.map((list) => {
        if (list.id === id) {
          list.name = name;
        }
        return list;
      });
      setListItems(updatedListItems);
    }
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

  const addListTag = (id) => {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0px 20px",
            }}
          >
            <CloseIcon
              sx={{ margin: "auto" }}
              color="error"
              onClick={() => {
                setAddingListTag(false);
                setNewListTagNameError(false);
              }}
            />
          </div>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={async () => {
              if (newListTagName === "") {
                setNewListTagNameError(true);
                return;
              }
              insertListTag(id, newListTagName);
              setAddingListTag(false);
              setNewListTagNameError(false);
            }}
          >
            Save tag
          </Button>
        </div>
        <div>
          <TextField
            required
            error={newListTagNameError}
            id="outlined-required"
            label={newListTagNameError ? "Empty not valid" : "Tag name"}
            onChange={(e) => setNewListTagName(e.target.value)}
          />
        </div>
      </Box>
    );
  };

  const insertChorTag = (chortId, name) => {
    fetch("http://localhost:8080/chor-tag", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: chortId, name }),
    }).then(async (res) => {
      if (res.status === 201) {
        const jsonRes = await res.json();
        setListItems(
          listItems.map((listItem) => {
            listItem.chor = listItem.chor.map((chor) => {
              if (chor.id === chortId) {
                chor.tags = chor.tags.concat([jsonRes.chorTag]);
              }
              return chor;
            });
            return listItem;
          })
        );
        return true;
      }
      return false;
    });
  };

  const addChorTag = (id) => {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0px 20px",
            }}
          >
            <CloseIcon
              sx={{ margin: "auto" }}
              color="error"
              onClick={() => {
                setAddingChorTag(false);
                setNewChorTagNameError(false);
              }}
            />
          </div>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={async () => {
              if (newChorTagName === "") {
                setNewChorTagNameError(true);
                return;
              }
              insertChorTag(id, newChorTagName);
              setAddingChorTag(false);
              setNewChorTagNameError(false);
            }}
          >
            Save tag
          </Button>
        </div>
        <div>
          <TextField
            required
            error={newChorTagNameError}
            id="outlined-required"
            label={newChorTagNameError ? "Empty not valid" : "Tag name"}
            onChange={(e) => setNewChorTagName(e.target.value)}
          />
        </div>
      </Box>
    );
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0px 20px",
            }}
          >
            <CloseIcon
              sx={{ margin: "auto" }}
              color="error"
              onClick={() => setAddingChor(false)}
            />
          </div>
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
        </div>
      </Box>
    );
  };

  const renderLists = () => {
    const lists = listItems.map((listItem, index) => {
      const chors = listItem.chor.map((chor, index) => {
        return (
          <AccordionDetails key={index} sx={{ display: "flex" }}>
            <div>
              {addingChorTag === chor.id ? (
                addChorTag(chor.id)
              ) : (
                <Button
                  style={{ margin: "20px" }}
                  variant="contained"
                  endIcon={<AddIcon />}
                  onClick={() => {
                    setAddingChorTag(chor.id);
                  }}
                >
                  Add tag
                </Button>
              )}
              {chor.tags.map((el, index) => {
                return (
                  <Stack key={index} direction="row" spacing={1}>
                    <Chip
                      label={el.name}
                      onDelete={() => {}}
                      deleteIcon={
                        <div>
                          <EditIcon />
                          <DeleteIcon
                            onClick={() => deleteTag(el.id, "chor")}
                          />
                        </div>
                      }
                      variant="outlined"
                    />
                  </Stack>
                );
              })}
            </div>
            <Typography
              sx={{ width: "33%", flexShrink: 0, margin: "auto" }}
              variant="h5"
            >
              {chor.name}
              <EditIcon />
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
                const updatedListItems = listItems.map((list) => {
                  const updatedChors = list.chor.map((listChor) => {
                    if (listChor.id === chor.id) {
                      listChor.alert_before_hours =
                        parseInt(e.target.value) || "";
                    }
                    return listChor;
                  });

                  list.chor = updatedChors;
                  return list;
                });
                setListItems(updatedListItems);

                if (!parseInt(e.target.value)) {
                  return;
                }

                const response = await updateChor(
                  chor.id,
                  null,
                  null,
                  null,
                  parseInt(e.target.value)
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
            <Typography variant="h4" sx={{ width: "80%", flexShrink: 0 }}>
              {editingNewListName === listItem.id ? (
                <TextField
                  required
                  error={newListNameError}
                  id="outlined-required"
                  label={newListNameError ? "Empty not valid" : "New list name"}
                  onChange={(e) => setNewEditingListName(e.target.value)}
                />
              ) : (
                listItem.name
              )}
              {editingNewListName === listItem.id ? (
                <div>
                  <CloseIcon
                    sx={{ margin: "auto" }}
                    color="error"
                    onClick={() => setEditingNewListName(false)}
                  />
                  <Button
                    style={{ margin: "20px" }}
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={async () => {
                      if (newEditingListName === "") {
                        setNewListNameError(true);
                        return;
                      }
                      await updateList(listItem.id, newEditingListName);
                      setEditingNewListName(false);
                      setNewListNameError(false);
                    }}
                  >
                    Save name
                  </Button>
                </div>
              ) : (
                <EditIcon onClick={() => setEditingNewListName(listItem.id)} />
              )}
              {addingListTag === listItem.id ? (
                addListTag(listItem.id)
              ) : editingNewListName === listItem.id ? null : (
                <Button
                  style={{ margin: "20px" }}
                  variant="contained"
                  endIcon={<AddIcon />}
                  onClick={() => {
                    setAddingListTag(listItem.id);
                  }}
                >
                  Add tag
                </Button>
              )}
            </Typography>
            <div>
              {listItem.tags.map((el, index) => {
                return (
                  <Stack key={index} direction="row" spacing={1}>
                    <Chip
                      label={el.name}
                      onDelete={() => {}}
                      deleteIcon={
                        <div>
                          <EditIcon />
                          <DeleteIcon
                            onClick={() => deleteTag(el.id, "list")}
                          />
                        </div>
                      }
                      variant="outlined"
                    />
                  </Stack>
                );
              })}
            </div>
          </AccordionSummary>
          {addingChor ? null : (
            <Button
              style={{ margin: "20px" }}
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
