import FormControl from '@material-ui/core/FormControl/FormControl'
import FormLabel from '@material-ui/core/FormLabel/FormLabel'
import { useFormik, FieldProps, FieldMetaProps, FormikErrors } from 'formik'
import React from 'react'
import { Property } from '@/src/../types/interfaces/property'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Select from '@material-ui/core/Select/Select'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import SelectInput from './SelectInput/SelectInput'
import { makeStyles } from '@material-ui/core'
import { lighten } from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import { FormData, formData } from '../../../utils/FormData'
import InputBase from '@material-ui/core/InputBase/InputBase'
import TextField from '@material-ui/core/TextField/TextField'
import { colors } from '@/src/theme/Color'
import { uppercaseFirst } from 'utils/Parse'
import { validate } from 'utils/Validate'

export interface PostProperty extends Partial<Property> {}

export type FormValues = any
const initialValues: PostProperty = {
  streetAddress: '',
  city: '',
  zipcode: '',
  state: 'Alabama',
  latitude: 0,
  longitude: 0,
  images: [{ fields: { file: { url: '/some-tested-img' } } }],
  propertyOwnerName: '',
  price: '$0.00',
  bedrooms: 1,
  bathrooms: 1,
  sqft: 1,
  carSpaces: 1,
  type: '',
  daysSpotted: 1,
  yearBuilt: 0,
  petFriendly: 'No Pets',
}
const onSubmit = (values: FormValues) => {
  console.log('Form Data ', values)
}

const useStyles = makeStyles((theme) => ({
  alertText: {
    color: lighten(theme.palette.common.slateRed, 0.1),
  },
  label: {
    color: lighten(theme.palette.common.navyBlue, 0.5),
    fontSize: '0.75rem',
  },
  formControl: {
    backgroundColor: lighten(colors.cream, 0.3),
    // backgroundColor: 'white',
    padding: '35px 50px',
    border: `3px solid ${theme.palette.common.navyBlue}`,
    borderRadius: '10px',
    [theme.breakpoints.up('sm')]: {
      width: '580px',
      padding: '35px 45px',
    },
  },
  submitBtn: {
    width: '120px',
    margin: '15px auto 0',
  },
  text: {
    fontSize: '0.75rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.95rem',
    },
  },
}))

export const SectionMargin = (props: { m: string }) => (
  <div style={{ marginTop: props.m }} />
)

export default function PostPropertyForm() {
  const classes = useStyles()
  /* useformik has an initialValues and handleChange that changes initialValues properties */
  const formik = useFormik({
    initialValues,
    onSubmit,
    /* Has access to all initial values, values.name, values.email, etc */
    validate,
  })
  return (
    <div>
      <FormControl className={classes.formControl}>
        {formData.map(
          (formData: FormData, index) =>
            (formData.type === 'text' && (
              <React.Fragment key={formData.label}>
                <SectionMargin m="20px" />

                <FormLabel classes={{root: classes.label}} htmlFor={formData.name}>
                  {formData.label}
                </FormLabel>
                <TextField
                  color="primary"
                  type={formData.type}
                  id={formData.name}
                  name={formData.name}
                  onChange={formik.handleChange}
                  value={formik.values[formData.name]}
                  // className={classes.text}
                />
                {formik.errors[formData.name] ? (
                  <small className={classes.alertText}>
                    {formik.errors[formData.name]}
                  </small>
                ) : null}
                <SectionMargin m="5px" />
              </React.Fragment>
            )) 
            ||
            (formData.type === 'select' && (
              <React.Fragment key={formData.label}>
                <SelectInput
                  value={formik.initialValues[formData.name]}
                  handleChange={formik.handleChange}
                  inputName={formData.label}
                  name={formData.name}
                />
                <SectionMargin m="5px" />
              </React.Fragment>
            )) ||
            (formData.type === 'attatchment' && (
              <InputLabel key={formData.label}>Image Attatchment</InputLabel>

              ))
        )}

        <Button className={classes.submitBtn} variant="outlined" type="submit">
          Submit
        </Button>

        <SectionMargin m="20px" />

        <pre>{JSON.stringify(formik.values)}</pre>
      </FormControl>
    </div>
  )
}
