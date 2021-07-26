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
import TextField from '@material-ui/core/TextField/TextField'

interface Props {
  value: string | number
  handleChange(e: React.ChangeEvent<any>): void;
  <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  inputName: string
  name: string
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
        <TextField
        id="role"
        select
        label="Role"
        classes={{root: classes.underline }}
        value={props.value}
        onChange={props.handleChange}
      
        helperText="Please select your role"
        margin="normal"
        variant="outlined"
      >
        {StateMenuItems}
      </TextField>
        // <Select
        //   // defaultValue="Alabama"
        //   value={props.value}
        //   name={props.name}
        //   onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
        //     // props.handleChange
        //     props.handleChange(event.target.value as string)
        //   }
        //   label={props.inputName}
        //   classes={{ root: classes.underline }}
        // >
        //   {StateMenuItems}
        // </Select>
      )
      break
    case 'Bedrooms':
      inputElement = (
        <Select
          // defaultValue={1}
          // value={props.value}
          name={props.name}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange
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
          // defaultValue={1}
          // value={props.value}
          name={props.name}
          // onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
          //   props.handleChange
          // }
          onChange={props.handleChange}
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
          // defaultValue={0}
          // value={props.value}
          name={props.name}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange
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
          // defaultValue="No Pets"
          // value={props.value}
          name={props.name}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange
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
          // value={props.value}
          name={props.name}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange
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
