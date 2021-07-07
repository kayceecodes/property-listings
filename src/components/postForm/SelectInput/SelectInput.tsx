import React, { ReactElement } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { StateLocations } from "utils/States";
import { PostProperty } from "../PostPropertyForm";

interface Props {
  values: PostProperty
  handleChange: (field: string) => void;
  inputType: string;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 85,
    [theme.breakpoints.up("sm")]: {
      width: 110,
    },
  },
  outlined: {
    color: theme.palette.common.dimGray,
  },
  text: {
    color: theme.palette.common.dimGray,
    // fontSize: '0.6rem',
    [theme.breakpoints.up('sm')]: {
      // fontSize: '0.7rem'
    },
  },
}));

export default function SelectInput(props: Props) {
  const classes = useStyles();
  let inputElement: ReactElement = <Select />;

  /* Pick what will inputElement be for, Quantities or Sizes */
  switch (props.inputType) {    
    case "state":
      inputElement = (
        <Select
          value={props.values.state}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange("state")
          }
          label="State"
          className={classes.outlined}
        >
          
        </Select>
      );
      break;
    default:
      <Select />;
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel classes={{root: classes.text}}>
        {props.inputType}
      </InputLabel>
       <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.values.state}
          onChange={(event: React.ChangeEvent<{ value: PostProperty }>) =>
          props.handleChange("state")}
        >
      {StateLocations.map(
             (location: { label: string; value: string }) => (
               <MenuItem
                 key={location.value}
                 value={location.value}     
                 style={{color: '#000'}}        
               >
                 {location.label}
               </MenuItem>
             )
           )}          
</Select>
    </FormControl>
  );
}
