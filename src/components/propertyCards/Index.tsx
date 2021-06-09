import { Theme, makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { data } from 'src/data/property-data'
import { Properties, Property } from '../../../types/interfaces/property'
import PropertyCard from './Card'

interface Props {
    properties: any
}

const useStyles = makeStyles((theme: Theme) => ({}))

export default function Index({properties}: Props) {
    const classes = useStyles()
    
    return (
        <div>
            {properties.map((property) => {
                <PropertyCard property={property}  />
            })}
        </div>
    )
}
