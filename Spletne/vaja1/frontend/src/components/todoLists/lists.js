import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormControlLabel, Switch } from "@mui/material";

export const Lists = ({ setListItems, listItems }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (expandedValue) => {
    setExpanded(expandedValue);
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/lists")
      .then((res) => res.json())
      .then((data) => setListItems(data.lists));
  }, []);

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

  const updateChor = async (id, name, until, done) => {
    const res = await fetch("http://localhost:8080/chor", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, until, done }),
    });

    if (res.status === 200) {
      return true;
    }
    return false;
  };

  const updateListItems = async (chorId, value) => {
    const updated = await updateChor(chorId, null, null, value);

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
          </AccordionDetails>
        );
      });
      return (
        <Accordion expanded={expanded === index} key={index}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                onClick={() => handleChange(expanded === false ? index : false)}
              />
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <DeleteIcon color="error" onClick={() => deleteList(listItem.id)} />
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              {listItem.name}
            </Typography>
          </AccordionSummary>
          {chors}
        </Accordion>
      );
    });

    return <div>{lists}</div>;
  };
  return <div>{renderLists()}</div>;
};
