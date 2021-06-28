import GridContainer from '@/src/ui/grid/GridContainer'
import { Theme, makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import React from 'react'
import { PropertyData } from '../../../types/interfaces/property'
import Card from './Card'
import theme from '@/src/theme/Theme'
interface Props {
  properties: any
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    backgroundColor: `${theme.palette.common.darkSlateBlue}`,
  },
}))

export default function Index({ properties }: Props) {
  const classes = useStyles()
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    lg: useMediaQuery(theme.breakpoints.up('lg')),
    xl: useMediaQuery(theme.breakpoints.up('xl')),
  } /* 0px     600px    960px    1280px   1920px */

  console.log('properties in Index - propertyCard: ', properties)
  return (
    <div className={classes.container}>
      <GridContainer
        wrap="wrap"
        xs={11}
        sm={6}
        lg={5}
        width={matches.lg ? '1279px' : '100%'}
        spacing={matches.md ? 9 : 6}
        margin={'0 auto'}
        justify='center'
      >
        {properties.map((property: PropertyData) => (
          <Card key={property.fields.streetAddress}
          data-testid='card'
          property={property} />
        ))}
      </GridContainer>
    </div>
  )
}
