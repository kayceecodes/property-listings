import React from 'react'
import GridContainer from '../ui/grid/GridContainer'
import Link from 'next/link'
import Button from '@material-ui/core/Button/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { route } from 'next/dist/next-server/server/router'

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    backgroundColor: '#161b22',
    color: '#ccc',
    font: '0.8rem Inter',
    textTransform: 'none',
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.95rem",
    }
  },
}))

const routes = [
  {
    path: '/',
    text: 'Home',
  },
  {
    path: '/listings',
    text: 'Listings',
  },
  {
    path: '/auth/sign-up',
    text: 'Sign Up',
  },
  {
    path: '/auth/login',
    text: 'Login',
  },
]

export default function Header() {
  const classes = useStyles()

  return (
    <div style={{ backgroundColor: '#161b22' }}>
      <GridContainer alignItems="center" justify="center" xs={3} padding={22}>
        {routes.map((route) => (
          <Link key={route.text} href={route.path}>
            <Button className={classes.btn}>{route.text}</Button>
          </Link>
        ))}
      </GridContainer>
    </div>
  )
}
