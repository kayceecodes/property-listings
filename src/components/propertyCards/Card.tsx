import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Property } from "../../../types/interfaces/property";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button/Button";
import GridContainer from "../../ui/grid/GridContainer";
import { changeColor } from "../../../utils/TextColor";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PropertyState } from "../../store/reducers/property_reducer";
import { Dispatch } from "redux";
import { selectProperty } from "../../store/actions/actionCreators";
import { lighten } from "@material-ui/core/styles/colorManipulator";

interface Props {
  property: Property;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const cases = ["Apartment", "House", "Condominium"];
const colors = ["#19c89f", "#1ac1dd", "#f70070"];

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: lighten("#0d1117", 0.055),
    color: `${theme.palette.common.offWhite}`,
    border: "2px solid #ffffff09",
  },
  favorite: {
    color: "#f05454",
  },
}));

export default function PropertyCard({ property, setOpen }: Props) {
  const classes = useStyles();

  const selectedProperty: Property = useSelector(
    (state: PropertyState) => state.selectedProperty,
    shallowEqual
  );
  const dispatch: Dispatch<any> = useDispatch();

  // console.log('Images in Card: ', property.images)
  return (
    <Card
      classes={{ root: classes.card }}
      className={classes.card}
      role="listitem"
    >
      <CardActionArea
        onClick={() => {
          setOpen(true);
          dispatch(selectProperty(property));
        }}
      >
        <CardMedia
          image={
            property.images
              ? property.images[0].fields.file.url
              : property.image?.fields.file.url
          }
          //  '../../../public/assets/images/image-not-available.png'}
          style={{ height: "220px" }}
          title="Property Image(s)"
        />
        <CardContent>
          <Typography variant="body1" component="div">
            <GridContainer
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              {property.price}
              {
                <small
                  style={{
                    color: changeColor(property.type, colors, cases),
                  }}
                >
                  {property.type}
                </small>
              }
              <small>
                {property.sqft}
                <strong> sqft</strong>
              </small>
            </GridContainer>
          </Typography>
          <br />
          <Typography variant="subtitle2">
            {property.address}
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
            exercitationem magni quaerat culpa quisquam nulla!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" className={classes.favorite}>
          <Icon>favorite</Icon>
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={(event: any) => {
            setOpen(true);
            dispatch(selectProperty(property));
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
