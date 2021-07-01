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

interface Props {
  open: boolean
  handleClose: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  carouselImg: {
  },
  imgWrapper: {
    // overflow: 'hidden',
    // width: '300px',
    // objectFit: 'cover',
    // height: '155px',
  },
  paper: {
    padding: '3px 3px 15px',
    width: '90%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '550px',
    },
  },
  summary: {
    color: `${theme.palette.common.dimGray}`,
  },
}))

const MyCarousel = ({ selectedProperty }) => {
  const classes = useStyles()
  return (
    <Carousel showArrows={true}>
      <div className={classes.imgWrapper}>
        <img
          className={classes.carouselImg}
          src={'https://' + selectedProperty.images[0]?.fields.file.url}
        />
      </div>
      <div className={classes.imgWrapper}>
        <img
          className={classes.carouselImg}
          src={'https://' + selectedProperty.images[1]?.fields.file.url}
        />
      </div>
      <div className={classes.imgWrapper}>
        <img
          className={classes.carouselImg}
          src={'https://' + selectedProperty.images[2]?.fields.file.url}
        />
      </div>
    </Carousel>
  )
}

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
        <GridContainer direction={matches.md ? 'row' : 'column'} spacing={1}>
          {/* <Image width={350} height={300} src={'https://' + selectedProperty.images[0]?.fields.file.url} /> */}
          <MyCarousel selectedProperty={selectedProperty} />
          <GridContainer justify="space-between" spacing={1}>
            <span>bd: {selectedProperty.bedrooms}</span>
            <span>sqft: {selectedProperty.sqft}</span>
          </GridContainer>
          <strong>{selectedProperty.streetAddress}</strong>
          <div>{selectedProperty.type}</div>
          <div>{selectedProperty.price}</div>
        </GridContainer>
      </Paper>
    </Modal>
  )
}
