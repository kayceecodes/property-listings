import React, { useRef, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import Image from 'next/image'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import useTheme from '@material-ui/core/styles/useTheme'
import { Property } from '../../../types/interfaces/property'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { trimNumber } from '../../../utils/Parse'
import { Dispatch } from 'redux'
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux'
import { selectProperty } from '../../store/actions/actionCreators'
import { PropertyState } from '../../store/reducers/property_reducer'

interface Props {
  properties: any
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Popups = ({ selectedProperty, setPopupStatus, Status }) => (
  <Popup
    latitude={selectedProperty.latitude}
    longitude={selectedProperty.longitude}
    onClose={() => {
      setPopupStatus(Status.hide)
    }}
  >
    <Typography variant="caption">
      <small>
        {selectedProperty.price} <br />
        {'bd: ' + selectedProperty.bedrooms + ' '}
        {' sqft: ' + selectedProperty.sqft}
      </small>
    </Typography>
  </Popup>
)

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'relative',
    width: '100%',
  },
  markerBtn: {
    backgroundColor: 'transparent',
    border: '0 solid transparent',
    '&:hover': { cursor: 'pointer' },
  },
  priceTags: {
    backgroundColor: '#fdf0db',
  },
}))

function MyMap({ properties, setOpen }: Props) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
  } /*xs:0, sm:600 md:960, lg:1280px, xl:1920px*/
  const [viewport, setViewport] = useState({
    width: '100%',
    height: matches.sm ? 450 : 600,
    latitude: 39.9521508977735,
    longitude: -75.14393627643587,
    zoom: 12,
  })
  const [popup, setPopupStatus] = useState('hide')

  const selectedProperty: any = useSelector(
    (state: any) => state.property.selectedProperty,
    shallowEqual
  )
  const dispatch: Dispatch<any> = useDispatch()
  enum Status {
    hide = 'hide',
    show = 'show',
  }
  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
    >
      {properties.map((property: Property, index) => (
        <div key={property.id}>
          <Marker
            latitude={property.latitude}
            longitude={property.longitude}
          >
            <button
              className={classes.markerBtn}
              onMouseOver={() => {
                setPopupStatus(Status.show)
                dispatch(selectProperty(property))
              }}
              onClick={(e: any) => {
                e.preventDefault()
                setOpen(true)
                dispatch(selectProperty(property))
              }}
            >
              <Image
                src="/assets/images/markers/pin.svg"
                width={35}
                height={35}
              />
              <br />
              <Paper classes={{ root: classes.priceTags }}>
                <small>{trimNumber(property.price)}</small>
              </Paper>
            </button>
          </Marker>
        </div>
      ))}
      {popup === Status.show && (
        <Popups
          setPopupStatus={setPopupStatus}
          Status={Status}
          selectedProperty={selectedProperty}
        />
      )}
    </ReactMapGL>
  )
}

export default MyMap
