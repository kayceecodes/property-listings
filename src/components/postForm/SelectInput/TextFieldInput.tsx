import FormLabel from '@material-ui/core/FormLabel/FormLabel'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TextField from '@material-ui/core/TextField/TextField'
import React from 'react'
import { FormData } from 'utils/FormData'
import { SectionMargin } from '../PostPropertyForm'

interface Props {
    formData: FormData
}

const useStyles = makeStyles((theme) => ({
    // alertText: {
    //     color: lighten(theme.palette.common.slateRed, 0.1),
    //   },
    //   label: {
    //     color: lighten(theme.palette.common.navyBlue, 0.5),
    //     fontSize: '0.75rem',
    //   },
    //   formControl: {
    //     backgroundColor: lighten(color.cream, 0.3),
    //     // backgroundColor: 'white',
    //     padding: '35px 50px',
    //     border: `3px solid ${theme.palette.common.navyBlue}`,
    //     borderRadius: '10px',
    //     [theme.breakpoints.up('sm')]: {
    //       width: '580px',
    //       padding: '35px 45px',
    //     },
    //   },
    //   submitBtn: {
    //     width: '120px',
    //     margin: '15px auto 0',
    //   },
    //   text: {
    //     fontSize: '0.75rem',
    //     [theme.breakpoints.up('sm')]: {
    //       fontSize: '0.95rem',
    //     },
}))


export default function TextFieldInput(props: Props) {
    const classes = useStyles()
    return (
        <div>
            {/* {props.formData.type === 'text' && (
              <React.Fragment key={props.formData.label}>
                <SectionMargin m="20px" />

                <FormLabel classes={{root: classes.label}} htmlFor={props.formData.name}>
                  {props.formData.label}
                </FormLabel>
                <TextField
                  color="primary"
                  type={props.formData.type}
                  id={props.formData.name}
                  name={props.formData.name}
                  onChange={props.formik.handleChange}
                  value={props.formik.values[props.formData.name]}
                  // className={classes.text}
                />
                {props.formik.errors[props.formData.name] ? (
                  <small className={classes.alertText}>
                    {props.formik.errors[props.formData.name]}
                  </small>
                ) : null}
                <SectionMargin m="5px" />
              </React.Fragment>
            )} */}
        </div>
    )
}
