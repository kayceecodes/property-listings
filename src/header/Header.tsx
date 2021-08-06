import React from 'react'
import GridContainer from '../ui/grid/GridContainer'
import Link from 'next/link'
import Button from '@material-ui/core/Button/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { route } from 'next/dist/next-server/server/router'
import createStyles from '@material-ui/core/styles/createStyles'
import { color } from '../theme/Color'
import { darken } from '@material-ui/core'
import Box from '@material-ui/core/Box/Box'
import { matches } from 'lodash'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/src/theme/Theme'
import { fade, lighten } from '@material-ui/core/styles/colorManipulator'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    activeLink: {
      color: '#eee !important'
    },
    container: {
      position: 'fixed',
      padding: 5,
      backgroundColor: lighten(color.darkSlateBlue, 0.018),
      transition: 'transform 0.3s',
      borderRight: `2px solid ${fade(lighten(color.darkSlateBlue, 0.08), 0.2)}`, 
    },
    hide: {
      transform: 'translateX(-200px)',
      [theme.breakpoints.up('sm')]: {
        transform: 'translateX(0px)'
       },
    },
    show: {
      transform: 'translateX(0px)',
    },
    linkBtns: {
      color: fade('#ccc', 0.4),
      textTransform: 'none',
      [theme.breakpoints.up('md')]: {
        fontSize: '1.1rem',
      }
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
  // {
  //   path: '/auth/sign-up',
  //   text: 'Sign Up',
  // },
  // {
  //   path: '/auth/login',
  //   text: 'Login',
  // },
  {
    path: '/post-property',
    text: 'Post Property',
  },
]

export default function Header(props: { open: boolean }) {
  const classes = useStyles()
  const matches = {sm: useMediaQuery(theme.breakpoints.up('sm'))} 
  const router = useRouter()

  return (
    <Box
      height="100%"
      className={classes.container + ' ' + (props.open ? '' : classes.hide)} 
    >
      <GridContainer margin="50px 0" justify="space-around" direction="column" height="35vh">
        {routes.map((route) => (
          <Link key={route.text} href={route.path}>
            <Button className={classes.linkBtns + ' ' + (router.asPath === route.path ? classes.activeLink : '')}>{route.text}</Button>
          </Link>
        ))}
      </GridContainer>
    </Box>
  )
}
