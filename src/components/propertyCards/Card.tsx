import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { PropertyData } from 'types/interfaces/property'
import Icon from '@material-ui/core/Icon';

interface Props {
  property: PropertyData
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: `${theme.palette.common.darkSlateBlue}`,
    color: `${theme.palette.common.offWhite}`,
  },
}))

export default function PropertyCard({ property }: Props) {
  const classes = useStyles()

  console.log(property)
  return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            image="/public/assets/images/apartment-interior.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
          <Typography variant="body2">
                 {property.fields.price}
            </Typography>
            <br />
            <Typography variant="body2">
                 {property.fields.streetAddress}
            </Typography>
            <Typography variant="body2">
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
