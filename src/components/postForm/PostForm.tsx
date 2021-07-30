import React from 'react'
import Container from '@material-ui/core/Container/Container'
import Grid from '@material-ui/core/Grid/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import Typography from '@material-ui/core/Typography/Typography'
import TextField from './FormsUI/Textfield'
import { PropertyPost } from 'types/interfaces/property'
import Button from '@material-ui/core/Button/Button'
import Select from './FormsUI/Select'
import { PropertyTypes, StateLocations } from '../../../utils/Constants'

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}))

const INITIAL_FORM_STATE: PropertyPost = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  price: '$0.00',
  streetAddress: '',
  city: '',
  state: 'Alabama',
  zipcode: '',
  latitude: 0,
  longitude: 0,
  images: [{ fields: { file: { url: '/some-tested-img' } } }],
  bedrooms: 1,
  bathrooms: 1,
  sqft: 1,
  carSpaces: 1,
  type: 'Apartment',
  datePosted: '',
  yearBuilt: 0,
  petFriendly: 'No Pets',
}
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.number()
    .integer()
    .typeError('Please enter a valid phone number')
    .required('Required'),
  price: Yup.string().required('Required'),
  streetAddress: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  zipcode: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  /**/ latitude: Yup.number().required('Required'),
  /**/ longitude: Yup.number().required('Required'),
  images: Yup.string().required('Required'),
  /**/ bedrooms: Yup.number().required('Required'),
  /**/ sqft: Yup.number().required('Required'),
  /**/ carSpaces: Yup.number().required('Required'),
  type: Yup.string().required('Required'),
  datePosted: Yup.string().required('Required'),
  /**/ yearBuilt: Yup.number().required('Required'),
  petFriendly: Yup.string().required('Required'),
})

export default function PostForm() {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                console.log(values)
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Your Details</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField name="firstName" label="First Name" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField name="lastName" label="Last Name" />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField name="phone" label="Phone #" />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name="streetAddress" label="Address" />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name="city" label="City" />
                  </Grid>

                  <Grid item xs={6}>
                    <Select
                      name="state"
                      label="State"
                      options={StateLocations}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField name="zipcode" label="Zipcode" />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name="latitude" label="Latitude" />
                  </Grid>

                  <Grid item xs={12}>
                    <input
                      accept="image/*"
                      //   className={classes.input}
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      hidden
                    />
                    <label htmlFor="raised-button-file">
                      <Button
                        variant="outlined"
                        component="span"
                        // className={classes.button}
                      >
                        Upload
                      </Button>
                    </label>
                  </Grid>

                  <Grid item xs={6}>
                    <Select name="bedrooms" label="Bedrooms" options={[0,1,2,3,4,5,6]} />
                  </Grid>

                  <Grid item xs={6}>
                    <Select name="bathrooms" label="Bathrooms" options={[0,1,2,3,4,5,6]} />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField name="sqft" label="Square Feet" />
                  </Grid>

                  <Grid item xs={6}>
                    <Select name="carSpaces" label="Car Spaces" options={[0,1,2,3,4,5,6]} />
                  </Grid>

                  <Grid item xs={12}>
                    <Select name="type" label="Property Type"
                      options={PropertyTypes}
                    />
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  )
}
