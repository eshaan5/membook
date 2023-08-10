import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Input = ({ half, name, label, autoFocus, type, handleChange, handleShow, password }) => {
  return (
    <Grid item xs={6} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          (name === "password") ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShow}>{password ? <Visibility /> : <VisibilityOff />}</IconButton>
              </InputAdornment>
            ),
          } : null
        }
      />
    </Grid>
  );
};

export default Input;
