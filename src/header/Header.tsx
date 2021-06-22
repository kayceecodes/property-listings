import React from 'react'
import GridContainer from '../ui/grid/GridContainer'
import Link from 'next/link'
import Button from '@material-ui/core/Button/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { route } from 'next/dist/next-server/server/router'
import createStyles from '@material-ui/core/styles/createStyles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    linkBtns: {
      color: '#ccc !important',
      font: '0.9rem Inter',
      textTransform: 'none'
    },
  })
)

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
  {
    path: '/auth/post-property',
    text: 'Post Property'
  }
]

export default function Header() {
  const classes = useStyles()

  return (
    <div style={{ backgroundColor: '#161b22' }}>
      <GridContainer alignItems="center" justify="flex-end" xs={2} padding={22}>
        {routes.map((route) => (
          <Link key={route.text} href={route.path}>
            <Button className={classes.linkBtns}>{route.text}</Button>
          </Link>
        ))}
      </GridContainer>
    </div>
  )
}
