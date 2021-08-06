import React from 'react'
import { useField, useFormikContext } from 'formik'
import TextField from '@material-ui/core/TextField/TextField'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { States } from 'utils/Constants'

const useStyles = makeStyles((theme) => ({
    text: {
        color: "#222"
    }
  }))

export default function SelectWrapper({
    name,
    options,
    ...otherProps
}) {
    const classes = useStyles()
    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(name)

    const handleChange = (event: any) => {
        const {value} = event.target
        setFieldValue(name, value)
    }
    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        onChange: handleChange,
        error: false,
        helperText: ''
    }

    if(meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error
    }

    return (
        <TextField classes={{root: classes.text}} variant="outlined" fullWidth={true} {...configSelect}>
            {options.map((value, index: number) => {
                return (<MenuItem classes={{root: classes.text}} key={index} value={value}>
                    {value}
                </MenuItem>)
            })}
        </TextField>
    )
}