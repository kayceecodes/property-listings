import TextField from '@material-ui/core/TextField/TextField'
import React from 'react'
import { useField } from 'formik'

interface Props {

}

export default function TextFieldWrapper({
    name,
    ...otherProps
}) {
    const [field, meta] = useField(name)
    
    const configTextField = {
        ...otherProps,
    }

    if(meta && meta.touched && meta.error) {
        configTextField.error = true
        configTextField.helperText = meta.error
    }

    return (
        <TextField {...configTextField} variant="outlined" fullWidth={true} />
    )
}
