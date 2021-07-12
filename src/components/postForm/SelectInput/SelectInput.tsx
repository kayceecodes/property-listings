import React, { ReactElement } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import Select from '@material-ui/core/Select/Select'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {
  PetFriendly,
  PropertyTypes,
  StateLocations,
} from '../../../../utils/Constants'
import { PostProperty } from '../PostPropertyForm'
import { lighten } from '@material-ui/core/styles/colorManipulator'

interface Props {
  values: PostProperty
  handleChange: (field: string) => void
  inputName: string
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 110,
    [theme.breakpoints.up('sm')]: {
      width: 140,
    },
  },
  label: {
    color: lighten(theme.palette.common.navyBlue, 0.5),
    fontSize: '0.75rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.95rem',
    },
  },
  text: {
    color: theme.palette.common.dimGray,
  },
  underline: {
    width: 130,
  },
}))

export default function SelectInput(props: Props) {
  const classes = useStyles()
  let inputElement: ReactElement = <Select />
  const NumberedMenuItems = []
  const PetFriendlyMenuItems = PetFriendly.map((val) => (
    <MenuItem className={classes.text} key={val} value={val}>
      {val}
    </MenuItem>
  ))
  const StateMenuItems = StateLocations.map(
    (location: { label: string; value: string }) => (
      <MenuItem
        key={location.value}
        value={location.value}
        className={classes.text}
      >
        {location.label}
      </MenuItem>
    )
  )
  const PropertyTypeMenuItems = PropertyTypes.map((val) => (
    <MenuItem className={classes.text} value={val} key={'key' + val}>
      {val}
    </MenuItem>
  ))
  for (let i = 0; i < 6; i++)
    NumberedMenuItems.push(
      <MenuItem className={classes.text} value={i} key={'key' + i}>
        {i}
      </MenuItem>
    )

  /*Pick which inputElement for Bathrooms, State, Bedroom etc..*/
  switch (props.inputName) {
    case 'State':
      inputElement = (
        <Select
          defaultValue="Alabama"
          value={props.values.state}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange('state')
          }
          label={props.inputName}
          classes={{ root: classes.underline }}
        >
          {StateMenuItems}
        </Select>
      )
      break
    case 'Bedrooms':
      inputElement = (
        <Select
          defaultValue={1}
          value={props.values.bedrooms}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange('bedrooms')
          }
          label={props.inputName}
          classes={{ root: classes.underline }}
        >
          {NumberedMenuItems}
        </Select>
      )
    case 'Bathrooms':
      inputElement = (
        <Select
          defaultValue={1}
          value={props.values.bathrooms}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange('bathrooms')
          }
          label={props.inputName}
          classes={{ root: classes.underline }}
        >
          {NumberedMenuItems}
        </Select>
      )
      break
    case 'Car Spaces':
      inputElement = (
        <Select
          defaultValue={0}
          value={props.values.carSpaces}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange('carSpaces')
          }
          label={props.inputName}
          classes={{ root: classes.underline }}
        >
          {NumberedMenuItems}
        </Select>
      )
      break
    case 'Pet Friendly':
      inputElement = (
        <Select
          defaultValue="No Pets"
          value={props.values.petFriendly}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange('petFriendly')
          }
          label={props.inputName}
          classes={{ root: classes.underline }}
        >
          {PetFriendlyMenuItems}
        </Select>
      )
      break
    case 'Property Type':
      inputElement = (
        <Select
          defaultValue="Apartment"
          value={props.values.petFriendly}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange('type')
          }
          label={props.inputName}
          classes={{ root: classes.underline }}
        >
          {PropertyTypeMenuItems}
        </Select>
      )
      break
    default:
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel classes={{ root: classes.label }}>
        {props.inputName}
      </InputLabel>
      {inputElement}
    </FormControl>
  )
}
