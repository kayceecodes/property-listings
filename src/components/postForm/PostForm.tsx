import React, { useState } from 'react'
import Container from '@material-ui/core/Container/Container'
import Grid, { GridSize } from '@material-ui/core/Grid/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import * as Yup from 'yup'
import { Form, Formik, useField, useFormikContext } from 'formik'
import Typography from '@material-ui/core/Typography/Typography'
import TextField from './FormsUI/Textfield'
import { PropertyPost } from 'types/interfaces/property'
import Button from '@material-ui/core/Button/Button'
import Select from './FormsUI/Select'
import {
  inputProps,
  PropertyTypes,
  StateLocations,
  States,
} from '../../../utils/Constants'
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
  const [errorCount, setErrorCount] = useState<number>(18)
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
        return environment.createEntry('propertyListings', {
          fields: {
            id: {
              'en-US': faker.datatype.string(6) + '-' + data.streetAddress,
            },
            firstName: {
              'en-US': data.firstName,
            },
            lastName: {
              'en-US': data.lastName,
            },
            email: {
              'en-US': data.email,
            },
            phone: {
              'en-US': data.phone,
            },
            price: {
              'en-US': data.price,
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
            bedrooms: {
              'en-US': data.bedrooms,
            },
            bathrooms: {
              'en-US': data.bathrooms,
            },
            sqft: {
              'en-US': data.sqft,
            },
            carSpaces: {
              'en-US': data.carSpaces,
            },
            type: {
              'en-US': data.type,
            },
            datePosted: {
              'en-US': data.datePosted,
            },
            petFriendly: {
              'en-US': data.petFriendly,
            },
          },
        })
      })
      .then((entry) => {
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
              {(formProps, isValid) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>Property Details</Typography>
                    </Grid>
                    {inputProps.map((prop) => (
                      <Grid
                        key={prop.name}
                        item
                        xs={prop.xs as GridSize}
                        sm={prop.sm as GridSize}
                      >
                        {prop.type === 'textfield' ? (
                          <TextField
                            name={prop.name}
                            label={prop.label}
                          />
                        ) : prop.type === 'select' ? (
                          <Select
                            name={prop.name}
                            label={prop.label}
                            options={prop.options}
                          />
                        ) : (
                          <DateTimePicker
                            name="datePosted"
                            label="Date Posted"
                          />
                        )}
                      </Grid>
                    ))}

                    <Grid item xs={12}>
                      <div className={classes.submitBtnWrapper}>
                        <Button
                          variant="outlined"
                          fullWidth={true}
                          className={classes.submitBtn}
                          onClick={(event: any) => {
                            // if (isValid === false) {
                            //   handlePopper(event)
                            //   formProps.submitForm()
                            // } else {
                              formProps.submitForm()
                              postProperty(formProps.values)
                            // }
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
