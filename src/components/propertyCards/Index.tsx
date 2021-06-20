import GridContainer from '@/src/ui/grid/GridContainer'
import { Theme, makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { PropertyData } from '../../../types/interfaces/property'
import Card from './Card'

interface Props {
    properties: any
}
const useStyles = makeStyles((theme: Theme) => ({
    container: {
      backgroundColor: `${theme.palette.common.darkSlateBlue}`,
    },
  }))
  
export default function Index({properties}: Props) {
    const classes = useStyles()
    console.log('properties in Index - propertyCard: ', properties)
    return (
        <div className={classes.container}>
            <GridContainer wrap='wrap'>
            {properties.map((property: PropertyData) => (
                <Card key={property.fields.streetAddress} property={property}  />
            ))}
            </GridContainer>
        </div>
    )
}
