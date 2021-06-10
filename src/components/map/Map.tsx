import { useRef, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import Image from 'next/image'
import { Paper, Typography } from '@material-ui/core'
import { PropertyData } from 'types/interfaces/property'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { trimNumber } from 'utils/Parse'

interface Props {
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
  },
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0 0 15px #000000aa',
  },
}))

export default function Map({
  properties,
  selectedProperty,
  setSelectedProperty,
}: Props) {
  const classes = useStyles()
  const mapRef = useRef<any>(null)
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 450,
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
    >
      <div>
        {properties.map((prop: PropertyData) => {
          console.log(" price :",prop.price)
          console.log(" lat: ", parseInt(prop.latitude))
          console.log("lng: ", prop.longitude)
          console.log("type: ", prop.type)
          console.log("yearbuilt: ", prop.yearbuilt)
          console.log("bedrooms: ", prop.bedrooms)
          console.log(" / ")
        })}
      </div>
      {/* {properties.map((property: PropertyData) => (
        <div
          key={property._id}
         
          // onMouseOut={() => setStatus(PopoverStatus.hide)}
        >
          <Marker latitude={parseInt(property.latitude)} longitude={parseInt(property.longitude)}>
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
              <Paper><small>${trimNumber(parseInt(property.price))}</small></Paper>
            </button>
          </Marker>
        </div>
      ))}
      {status === 'show' && (
        <Popup
          latitude={parseInt(selectedProperty.latitude)}
          longitude={parseInt(selectedProperty.longitude)}
          onClose={() => {
            setStatus(PopoverStatus.hide)
          }}
        >
          <Typography variant="caption">
          <small>
            {'$' + selectedProperty.price} <br />
            {'bd: ' + selectedProperty.bedrooms + ' '}
            {' sqft: ' + selectedProperty.sqft}
            </small>
          </Typography>
        </Popup>
      )} */}
    </ReactMapGL>
  )
}
