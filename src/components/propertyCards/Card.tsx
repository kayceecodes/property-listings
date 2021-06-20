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
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
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
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
  )
}
