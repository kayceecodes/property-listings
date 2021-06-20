import { useRef, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import Image from 'next/image'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import useTheme from "@material-ui/core/styles/useTheme";
import { PropertyData } from 'types/interfaces/property'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { trimNumber } from '../../../utils/Parse'

interface Props {
  // properties: PropertyData[]
  properties: any
  selectedProperty: PropertyData
  setSelectedProperty: React.Dispatch<React.SetStateAction<PropertyData>>
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'relative',
  },
  markerBtn: {
    backgroundColor: 'transparent',
    border: '0 solid transparent',
    '&:hover': {cursor: 'pointer'},
  },
  priceTags: {
    backgroundColor: '#fdf0db',
  },
}))

function MyMap({ properties, selectedProperty, setSelectedProperty }: Props) {
  const classes = useStyles()
  const theme = useTheme();
  const matches = {sm: useMediaQuery(theme.breakpoints.up("sm"))}; /* If query matches sm,md,lg or xl then we'll use the 'matches' object to change styles
        xs: 0, sm: 600 md: 960, lg:1280px, xl1920px*/

  const [viewport, setViewport] = useState({
    width: '100%',
    /*width: 1289*/
    height: matches.sm ? 450 : 600,
    latitude: 39.9521508977735,
    longitude: -75.14393627643587,
    zoom: 12,
  })
  const [status, setStatus] = useState('hide')
  enum PopoverStatus {
    show = 'show',
    hide = 'hide',
  }

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
    >
      {properties.map((property: PropertyData, i) => (
        <div key={property.fields.id}>
          <Marker latitude={property.fields.latitude} longitude={property.fields.longitude}>
            <button
              className={classes.markerBtn}
              onMouseOver={() => {
                setStatus(PopoverStatus.show)
                setSelectedProperty(property)
              }}
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Image
                src="/assets/images/markers/pin.svg"
                width={35}
                height={35}
              />
              <br />
              <Paper classes={{ root: classes.priceTags }}>
                <small>{trimNumber(property.fields.price)}</small>
              </Paper>
            </button>
          </Marker>
        </div>
      ))}
      {status === 'show' && (
        <Popup
          latitude={selectedProperty.fields.latitude}
          longitude={selectedProperty.fields.longitude}
          onClose={() => {
            setStatus(PopoverStatus.hide)
          }}
        >
          <Typography variant="caption">
            <small data-testid="small-textbox" role="textbox">
              {selectedProperty.fields.price} <br />
              {'bd: ' + selectedProperty.fields.bedrooms + ' '}
              {' sqft: ' + selectedProperty.fields.sqft}
            </small>
          </Typography>
        </Popup>
      )}
    </ReactMapGL>
  )
}

export default MyMap
