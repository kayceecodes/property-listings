import { Theme, makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Properties, Property } from '../../../types/interfaces/property'
import PropertyCard from './Card'

interface Props {
    properties: any
}
const useStyles = makeStyles((theme: Theme) => ({
    container: {
      backgroundColor: '#ccc',
    },
  }))
  
export default function Index({properties}: Props) {
    const classes = useStyles()
    
    return (
        <div className={classes.container}>
            {properties.map((property) => {
                <PropertyCard property={property}  />
            })}
        </div>
    )
}
