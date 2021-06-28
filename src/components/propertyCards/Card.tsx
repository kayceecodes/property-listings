import React from 'react'
import { lighten, makeStyles, Theme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card/Card'
import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea'
import CardActions from '@material-ui/core/CardActions/CardActions'
import CardContent from '@material-ui/core/CardContent/CardContent'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import Typography from '@material-ui/core/Typography'
import { PropertyData } from 'types/interfaces/property'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button/Button'
import GridContainer from '../../ui/grid/GridContainer'
import { changeColor } from '../../../utils/TextColor'

interface Props {
  property: PropertyData
}

const cases = ['Apartment', 'House', 'Condo']
const colors = ['#19c89f', '#1ac1dd', '#f70070']

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: lighten('#0d1117', 0.055),
    color: `${theme.palette.common.offWhite}`,
    border: '2px solid #ffffff09',
  },
}))

export default function PropertyCard({ property }: Props) {
  const classes = useStyles()

  console.log('Images in Card: ', property.fields.images)
  return (
    <Card className={classes.card} role='list-item'>
      <CardActionArea>
        <CardMedia
          image={
            property.fields.images
              ? property.fields.images[0].fields.file.url
              : 'https://www.ivsauto.ca/frontend/assets/images/placeholder/inventory-full-placeholder.png'
          }
          //  '../../../public/assets/images/image-not-available.png'}
          style={{ height: '220px' }}
          title="Property Image(s)"
        />
        <CardContent>
          <Typography variant="body2" component="div">
            <GridContainer
              width="100%"
              justify="space-between"
              alignItems="center"
            >
              {property.fields.price}
              {
                <small style={{ color: changeColor(property.fields.type, colors, cases) }}>
                  {property.fields.type}
                </small>
              }
              <small>
                {property.fields.sqft}
                <strong> sqft</strong>
              </small>
            </GridContainer>
          </Typography>
          <br />
          <Typography variant="body2">
            {property.fields.streetAddress +
              ' ' +
              property.fields.city +
              ' ' +
              property.fields.state}
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
            exercitationem magni quaerat culpa quisquam nulla!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary">
          <Icon>favorite</Icon>
        </Button>
        <Button size="small" color="secondary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
