import TextField from "@material-ui/core/TextField/TextField";
import React from "react";
import { useField } from "formik";

interface Props {}

export default function TextFieldWrapper({ name, ...otherProps }) {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    error: false,
    helperText: "",
  };
  const inputStyle = {
    WebkitBoxShadow: "0 0 0 1000px #5b5f64 inset",
    border: "0px solid transparent",
    borderRadius: "0px",
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  // console.log("TextFieldWrapper -> field values from useField() hook: ", field);
  return (
    <TextField
      {...configTextField}
      variant="outlined"
      fullWidth={true}
      inputProps={{ style: inputStyle }}
    />
  );
}
