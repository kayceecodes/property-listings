import React from 'react'
import GridContainer from '../ui/grid/GridContainer'
import Link from 'next/link'
import Button from '@material-ui/core/Button/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Theme } from '@material-ui/core/styles/createTheme'
import createStyles from '@material-ui/core/styles/createStyles'
import { color } from '../theme/Color'
import { darken } from '@material-ui/core'
import Box from '@material-ui/core/Box/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/src/theme/Theme'
import { alpha, lighten } from '@material-ui/core/styles/colorManipulator'
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
      borderRight: `1px solid ${alpha(darken(color.offWhite, 0.3), 0.1)}`,
      boxShadow: '0 0 15px #00000080' 
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
      color: alpha('#ccc', 0.4),
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
      <GridContainer margin="50px 0" justifyContent="space-around" direction="column" height="35vh">
        {routes.map((route) => (
          <Link key={route.text} href={route.path}>
            <Button className={classes.linkBtns + ' ' + (router.asPath === route.path ? classes.activeLink : '')}>{route.text}</Button>
          </Link>
        ))}
      </GridContainer>
    </Box>
  )
}
