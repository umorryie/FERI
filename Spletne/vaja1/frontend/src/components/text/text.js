import { TextField } from "@mui/material";

export const Text = (props) => {
  return (
    <TextField id="standard-basic" label={props.label} variant="standard" />
  );
};
