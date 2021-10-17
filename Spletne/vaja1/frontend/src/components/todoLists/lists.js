import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Lists = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [chorItems, setChorItems] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/lists")
      .then((res) => res.json())
      .then((data) => setChorItems(data.lists));
  }, []);

  const renderLists = () => {
    const lists = chorItems.map((listItem, index) => {
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
