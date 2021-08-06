import React, { useState } from 'react'
import Container from '@material-ui/core/Container/Container'
import Grid from '@material-ui/core/Grid/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import * as Yup from 'yup'
import { Form, Formik, useField, useFormikContext } from 'formik'
import Typography from '@material-ui/core/Typography/Typography'
import TextField from './FormsUI/Textfield'
import { PropertyPost } from 'types/interfaces/property'
import Button from '@material-ui/core/Button/Button'
import Select from './FormsUI/Select'
import { PropertyTypes, StateLocations, States } from '../../../utils/Constants'
import DateTimePicker from './FormsUI/DateTimePicker'
import { values } from 'lodash'
import { initialState } from '@/src/store/reducers'
import { color } from '@/src/theme/Color'
import {
  darken,
  fade,
  lighten,
} from '@material-ui/core/styles/colorManipulator'
import { PostProperty } from './PostPropertyForm'
import Popper from '@material-ui/core/Popper/Popper'

const useStyles = makeStyles((theme) => ({
  button: {
    color: fade(color.offWhite, 0.65),
    marginRight: '20px',
    padding: '10px 30px',
  },
  input: {
    backgroundColor: 'transparent',
    border: '1px solid white',
  },
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  paper: {
    border: `1px solid ${fade(lighten(color.darkSlateBlue, 0.08), 0.2)}`,
    padding: theme.spacing(1),
    backgroundColor: '#2a2a2a',
    borderRadius: '3px',
    color: fade(color.offWhite, 0.93),
  },
  submitBtn: {
    color: '#111 !important',
    padding: '15px 30px',
  },
  submitBtnWrapper: {
    width: '45%',
    margin: '30px auto 0',
  },
  text: {
    color: '#111',
    fontWeight: 300,
  },
}))

const INITIAL_FORM_STATE: Omit<PropertyPost, 'id'> = {
  firstName: 'Dan',
  lastName: 'Lot',
  email: 'dlot@gmail.com',
  phone: '215 483 84303',
  price: '$35000.00',
  streetAddress: '123 South St.',
  city: 'Philadelphia',
  state: 'Pennsylvania',
  zipcode: '92130',
  latitude: -39.94217,
  longitude: -75.17629,
  images: [{ fields: { file: { url: '/insert-img-here' } } }],
  bedrooms: 1,
  bathrooms: 1,
  sqft: 30050,
  carSpaces: 3,
  type: 'Condominium',
  datePosted: '',
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
  datePosted: Yup.date().required('Required'),
  /**/ yearBuilt: Yup.number().required('Required'),
  petFriendly: Yup.string().required('Required'),
})

export default function PostForm() {
  const classes = useStyles()
  var faker = require('faker')
  var _ = require('lodash')
  const [fileValue, setFileValue] = useState<File>()
  const [incomplete, setIncomplete] = useState<boolean>(true)
  const [errorCount, setErrorCount] = useState<number>(0)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handlePopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const open = Boolean(anchorEl)
  // const id = open ? 'simple-popper' : undefined

  const postProperty = (data: PostProperty) => {
    const contentful = require('contentful-management')

    const client = contentful.createClient({
      accessToken: process.env.NEXT_CONTENTFUL_PERSONAL_ACCESS_TOKEN as string,
    })
    client
      .getSpace(process.env.NEXT_CONTENTFUL_SPACE_ID as string)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => {
        var fileData = {
          fields: {
            title: {
              'en-US': data.streetAddress + '-' + data.state,
            },
            file: {
              'en-US': {
                contentType: 'image/jpeg',
                fileName: data.streetAddress + '-' + data.state + '.jpg',
                upload: fileValue,
              },
            },
          },
        }
        environment.createAsset(fileData).then((asset) => {
          asset.processForAllLocales().then(function (processedAsset) {
            processedAsset.publish().then(function (publishedAsset) {
              console.log(publishedAsset)
            })
          })
        })
        const entry = environment.getEntry('master').toPlainObject()

        entry.append()

        // var fileData = {
        //   fields: {
        //     title: {
        //       'en-US': data.streetAddress + '-' + data.state,
        //     },
        //     file: {
        //       'en-US': {
        //         contentType: 'image/jpeg',
        //         fileName: data.streetAddress + '-' + data.state + '.jpg',
        //         upload: fileValue,
        //       },
        //     },
        //   },
        // }
        // environment.createAsset(fileData).then((asset) => {
        //   asset.processForAllLocales().then(function (processedAsset) {
        //     processedAsset.publish().then(function (publishedAsset) {
        //       console.log(publishedAsset)
        //     })
        //   })
        // })
        return environment.createEntry('propertyListings', {
          fields: {
            id: {
              'en-US': faker.datatype.string(6) + '-' + data.streetAddress,
            },
            streetAddress: {
              'en-US': data.streetAddress,
            },
            city: {
              'en-US': data.city,
            },
            state: {
              'en-US': data.state,
            },
            zipcode: {
              'en-US': data.zipcode,
            },
            latitude: {
              'en-US': data.latitude,
            },
            longitude: {
              'en-US': data.longitude,
            },
            price: {
              'en-US': data.price,
            },
            // images: {
            //   'en-US': fileData,
            // },
          },
        })
      })
      .then((entry) => {
        console.log(entry)
        entry.publish()
      })
      .catch(console.error)
  }
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
              {(formProps) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>Property Details</Typography>
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
                        // options={States}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField name="zipcode" label="Zipcode" />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField name="latitude" label="Latitude" />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField name="longitude" label="Longitude" />
                    </Grid>

                    {/* <Grid item xs={12}>
                      <input
                        name="images"
                        accept="image/*"
                        // className={classes.input}
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={(event) => {
                          setFileValue(event.currentTarget.files[0]);
                        }}
                      />
                      <label htmlFor="raised-button-file">
                        <Button
                          variant="outlined"
                          component="span"
                          className={classes.button}
                        >
                          Upload
                        </Button>
                        <span className={classes.text}>
                          {' ' + fileValue ? fileValue : '/insert-img-here'}
                        </span>
                      </label>
                    </Grid> */}

                    <Grid item xs={6}>
                      <Select
                        name="bedrooms"
                        label="Bedrooms"
                        options={[0, 1, 2, 3, 4, 5, 6]}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Select
                        name="bathrooms"
                        label="Bathrooms"
                        options={[0, 1, 2, 3, 4, 5, 6]}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField name="sqft" label="Square Feet" />
                    </Grid>

                    <Grid item xs={6}>
                      <Select
                        name="carSpaces"
                        label="Car Spaces"
                        options={[0, 1, 2, 3, 4, 5, 6]}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Select
                        name="type"
                        label="Property Type"
                        options={PropertyTypes}
                      />
                    </Grid>

                    <Grid item xs={8}>
                      <DateTimePicker name="datePosted" label="Date Posted" />
                    </Grid>
                    <Grid item xs={12}>
                      <div className={classes.submitBtnWrapper}>
                        <Button
                          variant="outlined"
                          fullWidth={true}
                          className={classes.submitBtn}
                          onClick={(event: any) => {
                            if (incomplete) {
                              handlePopper(event)
                              formProps.submitForm()
                            } else {
                              postProperty(formProps.values)
                            }
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                      <Popper open={open} anchorEl={anchorEl}>
                        <div className={classes.paper}>
                          Please finish the form.
                        </div>
                      </Popper>
                      {/* <pre>{JSON.stringify(formProps.values)}</pre> */}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  )
}
