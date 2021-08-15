import React from 'react'
import Modal from '@material-ui/core/Modal/Modal'
import Paper from '@material-ui/core/Paper/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Property } from '../../../types/interfaces/property'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { shallowEqual, useSelector } from 'react-redux'
import GridContainer from '../../ui/grid/GridContainer'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '../../theme/Theme'
import { color } from '@/theme/Color'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box/Box'
import { changeColor } from 'utils/TextColor'
import { darken, lighten } from '@material-ui/core/styles/colorManipulator'

interface Props {
  open: boolean
  handleClose: () => void
  selectedProperty: Property
}

const useStyles = makeStyles((theme: Theme) => ({
  carouselWrapper: {
    textAlign: 'center',
    paddingLeft: '0',
  },
  darkBold: {
    color: color.ghostWhite,
    fontWeight: 500,
  },
  paper: {
    padding: '3px 3px 15px',
    width: '97%',
    fontFamily: 'Roboto',
    margin: '40px auto 0px',
    backgroundColor: darken(theme.palette.common.darkSlateBlue, 0.05),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '550px',
      margin: '80px auto 0px',
    },
  },
  summary: {
    color: lighten(theme.palette.common.dimGray, 0.5),
    fontWeight: 400,
  },
}))

const MyCarousel = ({ selectedProperty }: Pick<Props, 'selectedProperty'>) => {
  const classes = useStyles()
  const {
    streetAddress,
    city,
    state,
    zipcode,
    firstName,
    lastName,
    email,
    phone,
    images,
    bathrooms,
    bedrooms,
    datePosted,
  } = selectedProperty
  return (
    <div className={classes.carouselWrapper}>
      {images === undefined ? (
        <Carousel showArrows={true}>
          <img src="https://www.ivsauto.ca/frontend/assets/images/placeholder/inventory-full-placeholder.png" />
          <Box mt={5}>
            <div>
              <h3>{streetAddress}</h3>
              <div>
                {city + ' ' + state + ' ' + zipcode}
              </div>
            </div>
            <p>
              Property Owner: <span>{firstName + ' ' + lastName}</span>
            </p>
            <p>{email}</p>
            <p>
              {bedrooms} {bathrooms > 1 ? ' bedrooms' : 'bedroom'}
            </p>
            <p>
              {bathrooms} {bathrooms > 1 ? ' bathrooms' : 'bathroom'}
            </p>
            <p>Posted: {datePosted}</p>
            <p>Contact: {phone}</p>
          </Box>
        </Carousel>
      ) : (
        <Carousel showArrows={true}>
          <div>
            <img src={images[0]?.fields.file.url} />
          </div>
          <div>
            <img src={images[1]?.fields.file.url} />
          </div>
          <div>
            <img src={images[2]?.fields.file.url} />
          </div>
        </Carousel>
      )}
    </div>
  )
}

const cases = ['Apartment', 'House', 'Condominium']
const colors = ['#19c89f', '#1ac1dd', '#f70070']

export default function PropertyModal({ open, handleClose }: Omit<Props, 'selectedProperty'>) {
  const classes = useStyles()
  const selectedProperty: Property = useSelector(
    (state: any) => state.property.selectedProperty,
    shallowEqual
  )
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    lg: useMediaQuery(theme.breakpoints.up('lg')),
  } /* 0px     600px    960px    1280px   1920px */

  return (
    <Modal
      open={open}
      onClose={handleClose}
      role="dialog"
      aria-labelledby="selected property modal"
      aria-describedby="selected property modal"
    >
      <Paper className={classes.paper + ' ' + classes.summary}>
        <GridContainer direction={matches.md ? 'column' : 'column'} spacing={1}>
          {/* <Image width={350} height={300} src={'https://' + selectedProperty.images[0]?.fields.file.url} /> */}
          <MyCarousel selectedProperty={selectedProperty} />

          <Box px={3}>
            <GridContainer justify="space-between">
              <div>
                <div className={classes.darkBold}>
                  {selectedProperty.streetAddress}
                </div>
                <div>{selectedProperty.price}</div>
              </div>
              <span
                style={{
                  color: changeColor(selectedProperty.type, colors, cases),
                }}
              >
                {selectedProperty.type}
              </span>
            </GridContainer>
          </Box>
          <GridContainer justify="space-between" padding={'0 25px'}>
            <div>
              <span className={classes.darkBold}>Bd: </span>
              {selectedProperty.bedrooms}
            </div>
            <div>
              <span className={classes.darkBold}>Sqft: </span>
              {selectedProperty.sqft}
            </div>
          </GridContainer>
        </GridContainer>
      </Paper>
    </Modal>
  )
}
