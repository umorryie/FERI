import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

export const Lists = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [listItems, setListItems] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
        // TODO Remove from array
      }
    });
  };

  const renderLists = () => {
    const lists = listItems.map((listItem, index) => {
      const chors = listItem.chor.map((chor, index) => {
        return (
          <AccordionDetails key={index}>
            <Typography>{chor.name}</Typography>
          </AccordionDetails>
        );
      });
      return (
        <Accordion
          expanded={expanded === index}
          onChange={handleChange(index)}
          key={index}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <DeleteIcon color="error" onClick={() => deleteList(listItem.id)} />
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
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
