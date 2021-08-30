import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Modal from '@material-ui/core/Modal/Modal'
import Paper from '@material-ui/core/Paper/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'
import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography/Typography'
import Button from '@material-ui/core/Button/Button'
import GridContainer from '../grid/GridContainer'
import Icon from '@material-ui/core/Icon/Icon'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  carouselWrapper: {
    textAlign: 'center',
    paddingLeft: '0',
  },
  paper: {
    padding: '10px 10px 20px 25px',
    width: '97%',
    fontFamily: 'Roboto',
    margin: '40px auto 0px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '390px',
      margin: '80px auto 0px',
    },
  },
  alert: {
    color: `${theme.palette.common.dimGray}`,
  },
}))

export default function PermissionPopup({ setOpen, open, handleClose }: Props) {
  const classes = useStyles()

  return (
    <Modal
      open={open}
      onClose={handleClose}
      role="dialog"
      aria-labelledby="selected property modal"
      aria-describedby="selected property modal"
    >
      <Paper className={classes.paper + ' ' + classes.alert}>
        <GridContainer justifyContent="flex-end">
          <Icon
            onClick={() => {
              setOpen(false)
            }}
          >
            cancel
          </Icon>
        </GridContainer>
        <br />
        <Typography variant="body2" component="div">
          You are not logged in. Do you want to continue as a guest?
        </Typography>
        <br />
        <GridContainer justifyContent="space-around">
          <Button variant="contained">Guest</Button>
          <Button variant="contained">Login</Button>
        </GridContainer>
      </Paper>
    </Modal>
  )
}
