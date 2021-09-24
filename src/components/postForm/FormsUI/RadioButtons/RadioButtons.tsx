import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useField } from 'formik';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        color: "#222"
    }
  }))

export default function RadioButtons({name, label, options}) {
    const classes = useStyles()
    // const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(name)
    // const handleChange = (event: any) => {
    //     const {value} = event.target
    //     setFieldValue(name, value)
    // }
    const configSelect = {
        ...field,
        select: true,
        // onChange: handleChange,
        error: false,
        helperText: ''
    }

    if(meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error
    }

    const [value, setValue] = React.useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Status</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="Rent" control={<Radio />} label="Rent" />
        <FormControlLabel value="Sale" control={<Radio />} label="Sale" />
      </RadioGroup>
    </FormControl>
  );
}