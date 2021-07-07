import React, { Dispatch } from 'react'
import Modal from '@material-ui/core/Modal/Modal'
import Paper from '@material-ui/core/Paper/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Property } from '../../../types/interfaces/property'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { selectProperty } from '../../store/actions/actionCreators'
import Layout from '../../hoc/Layout'
import GridContainer from '../../ui/grid/GridContainer'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '../../theme/Theme'
import Image from 'next/image'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box/Box'
import { changeColor } from 'utils/TextColor'

interface Props {
  open: boolean
  handleClose: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  carouselWrapper: {
    textAlign: 'center',
    paddingLeft: '0',
  },
  paper: {
    padding: '3px 3px 15px',
    width: '97%',
    fontFamily: 'Roboto',
    margin: '40px auto 0px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '550px',
      margin: '80px auto 0px',
    },
  },
  summary: {
    color: `${theme.palette.common.dimGray}`,
  },
}))

const MyCarousel = ({ selectedProperty }) => {
  const classes = useStyles()
  return (
    <div className={classes.carouselWrapper}>
      <Carousel showArrows={true}>
        <div>
          <img src={'https://' + selectedProperty.images[0]?.fields.file.url} />
        </div>
        <div>
          <img src={'https://' + selectedProperty.images[1]?.fields.file.url} />
        </div>
        <div>
          <img src={'https://' + selectedProperty.images[2]?.fields.file.url} />
        </div>
      </Carousel>
    </div>
  )
}

const cases = ['Apartment', 'House', 'Condo']
const colors = ['#19c89f', '#1ac1dd', '#f70070']

export default function PropertyModal({ open, handleClose }: Props) {
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
              <Typography variant="body2">
                <strong>{selectedProperty.streetAddress}</strong>
                <div>{selectedProperty.price}</div>
              </Typography>
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
            <span>bd: {selectedProperty.bedrooms}</span>
            <span>sqft: {selectedProperty.sqft}</span>
          </GridContainer>
        </GridContainer>
      </Paper>
    </Modal>
  )
}
