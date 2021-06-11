import React from 'react'
import GridContainer from '../ui/grid/GridContainer'
import Link from 'next/link'
import Button from '@material-ui/core/Button/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { route } from 'next/dist/next-server/server/router'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: '#161b22',
  },
  links: {
    color: '#ddd',
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
    path: '/sign-up',
    text: 'Sign Up',
  },
  {
    path: '/login',
    text: 'Login',
  },
]

export default function Header() {
  const classes = useStyles()

  return (
    <div style={{ backgroundColor: '#161b22' }}>
      <GridContainer alignItems="center" justify="center" xs={2} padding={30}>
        {routes.map((route) => (
             <Link key={route.text} href={route.path}>
             <Button style={{ color: '#ddd' }}>{route.text}</Button>
           </Link>
        ))}
      </GridContainer>
    </div>
  )
}
