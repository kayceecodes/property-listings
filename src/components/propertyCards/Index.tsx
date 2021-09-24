import GridContainer from '../../ui/grid/GridContainer'
import { Theme, makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import React from 'react'
// import { PropertyData } from '../../../types/interfaces/property'
import Card from './Card'
import theme from '../../theme/Theme'
import { Property } from '../../../types/interfaces/property'
interface Props {
  properties: any
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  }
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    backgroundColor: `${theme.palette.common.darkSlateBlue}`,
  },
}))

export default function Index({ properties, setOpen }: Props) {
  const classes = useStyles()
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    lg: useMediaQuery(theme.breakpoints.up('lg')),
    xl: useMediaQuery(theme.breakpoints.up('xl')),
  } /* 0px     600px    960px    1280px   1920px */

  console.log('properties in Index - propertyCard: ', properties)
  return (
    <div className={classes.container} data-testid='property-cards-container'>
      <GridContainer
        wrap="wrap"
        xs={11}
        sm={9}
        md={5}
        width={matches.lg ? '1279px' : '100%'}
        spacing={matches.md ? 9 : 6}
        margin={'0 auto'}
        justifyContent='center'
      >
        {properties.map((property: Property, index: number) => (
          <Card key={property.id}
          data-testid='card'
          setOpen={setOpen}
          property={property} />
        ))}
      </GridContainer>
    </div>
  )
}
