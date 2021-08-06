import TextField from '@material-ui/core/TextField/TextField'
import React from 'react'
import { useField } from 'formik'

export default function DateTimePicker({
    name,
    ...otherProps
}) {
    const [field, meta] = useField(name)
    const configDateTimePicker = {
        type: 'date',
        InputLabelProps: {
            shrink: true
        },
        ...field,
        ...otherProps,
        error: false,
        helperText: ''
    }

    if(meta && meta.touched && meta.error) {
        configDateTimePicker.error = true;
        configDateTimePicker.helperText = meta.error
    }
    
    return (
        <TextField variant="outlined" fullWidth={true} {...configDateTimePicker}
         />
    )
}
