import FormControl from '@material-ui/core/FormControl/FormControl'
import FormLabel from '@material-ui/core/FormLabel/FormLabel'
import TextField from '@material-ui/core/TextField/TextField'
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
import { FormInput, formInputs } from 'utils/FormInputs'

export interface PostProperty extends Partial<Property> {
  email: string
  phoneNumber: string
}

type FormValues = any
const initialValues: PostProperty = {
  email: '',
  phoneNumber: '',
  streetAddress: '',
  city: '',
  zipcode: '',
  state: '',
  latitude: 0,
  longitude: -0,
  images: [{ fields: { file: { url: '/some-tested-img' } } }],
  propertyOwnerName: '',
  price: '$0.00',
  bedrooms: 0,
  bathrooms: 0,
  sqft: 0,
  carSpaces: 0,
  type: '',
  daysSpotted: 0,
  yearBuilt: 0,
  petFriendly: 'No Pets',
}

const onSubmit = (values: FormValues) => {
  console.log('Form Data ', values)
}

const validate = (values: FormValues) => {
  let errors: FormikErrors<PostProperty> = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email format'
  }
  if (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/) {
    errors.phoneNumber = 'Invalid phone Number'
  }
  if (!values.propertyOwnername) {
    errors.propertyOwnerName = 'Required'
  }
  if (!values.price) {
    errors.price = 'Required'
  }
  if (!values.streetAddress) {
    errors.streetAddress = 'Required'
  }
  if (!values.city) {
    errors.city = 'Required'
  }
  if (!values.zipcode) {
    errors.zipcode = 'Required'
  }
  if (!values.state) {
    errors.state = 'Required'
  }
  if (!values.latitude) {
    errors.longitude = 'Required'
  }
  if (!values.longitude) {
    errors.longitude = 'Required'
  }
  if (!values.images) {
    errors.images = 'Required'
  }
  if (!values.bedrooms) {
    errors.bedrooms = 'Required'
  }
  if (!values.sqft) {
    errors.sqft = 'Required'
  }
  if (!values.type) {
    errors.type = 'Required'
  }

  return errors
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    maxWidth: '650px',
    width: '90%',
    backgroundColor: lighten(theme.palette.common.dimGray, 0.8),
    // backgroundColor: 'white',
    padding: '30px 45px',
    color: theme.palette.common.dimGray,
    [theme.breakpoints.up('sm')]: {},
  },
  outlined: {
    color: theme.palette.common.dimGray,
  },
  submitBtn: {
    width: '120px',
    margin: '15px auto 0',
  },
  text: {
    color: theme.palette.common.dimGray,
    fontSize: '0.75rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.6rem'
    },
  },
}))

const SectionMargin = (props: { px: string }) => (
  <div style={{ marginTop: props.px }} />
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
        {formInputs.map((val: FormInput) =>
            val.type === 'text' && (
              <>
                <FormLabel
                  classes={{ root: classes.text }}
                  htmlFor={val.name}
                >
                  {val.label}
                </FormLabel>
                <TextField
                  type={val.type}
                  id={val.name}
                  name={val.name}
                  onChange={formik.handleChange}
                  value={formik.values[val.name]}
                />
                {formik.errors[val.name] ? (
                  <div>{formik.errors[val.name]}</div>
                ) : null}

                <SectionMargin px="20px" />
              </>
             ) 
             || val.type === 'select' && (
              <>
                <SelectInput
                  values={formik.initialValues[val.name]}
                  handleChange={formik.handleChange}
                  inputType={val.label}
                />
                <SectionMargin px="8px" />
              </>
            ) 
            ||
             val.type === "attatchment" && (
              <InputLabel>Image Attatchment</InputLabel>
            )
          
        )}

        {/* <FormLabel classes={{ root: classes.text }} htmlFor="propertyOwnerName">
          Property Owner Name
        </FormLabel>
        <TextField
          type="text"
          id="propertyOwnerName"
          name="propertyOwnerName"
          onChange={formik.handleChange}
          value={formik.values.propertyOwnerName}
        />
        {formik.errors.propertyOwnerName ? (
          <div>{formik.errors.propertyOwnerName}</div>
        ) : null}

        <SectionMargin px="20px" />

        <SelectInput
          values={formik.initialValues.state}
          handleChange={formik.handleChange}
          inputType="state"
        />
        <SectionMargin px="20px" />
        <FormLabel htmlFor="zipcode"></FormLabel>
        <TextField
          type="text"
          id=""
          name=""
          onChange={formik.handleChange}
          value={formik.values.zipcode}
        />
        {formik.errors.zipcode ? <div>{formik.errors.zipcode}</div> : null} */}

        <Button className={classes.submitBtn} type="submit">
          Submit
        </Button>

        <SectionMargin px="20px" />

        <pre>{JSON.stringify(formik.values)}</pre>
      </FormControl>
    </div>
  )
}

{
  /* <FormLabel htmlFor="email">Email</FormLabel>
<input
  type="email"
  id="email"
  name="email"
  onChange={formik.handleChange}
  value={formik.values.email}
/>
{formik.errors.email ? <div>{formik.errors.email}</div> : null}

<FormLabel htmlFor="streetAddress">Street Address</FormLabel>
<TextField
  id="streetAddress"
  name="streetAddress"
  onChange={formik.handleChange}
  value={formik.values.streetAddress}
/>
{formik.errors.streetAddress ? <div>{formik.errors.streetAddress}</div> : null}

<FormLabel htmlFor="city">City</FormLabel>
<input
  type="text"
  id="city"
  name="city"
  onChange={formik.handleChange}
  value={formik.values.city}
/>
{formik.errors.city ? <div>{formik.errors.city}</div> : null}

<InputLabel htmlFor="state">State</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={formik.initialValues.state}
  onChange={formik.handleChange}
>
  <MenuItem value={10}>Ten</MenuItem>
  <MenuItem value={20}>Twenty</MenuItem>
  <MenuItem value={30}>Thirty</MenuItem>
</Select> */
}
