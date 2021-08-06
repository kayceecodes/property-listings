import React, { ReactNode, useState } from 'react'
import Header from '../header/Header'
import { makeStyles } from '@material-ui/core/styles'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid/Grid'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/src/theme/Theme'
import { Backdrop } from '@material-ui/core'

interface Props {
  children: ReactNode[] | ReactNode
  revealHeader?: boolean
  desc: string
  keywords: string
  bgColor?: string
  height?: string
}
const useStyles = makeStyles(() => ({
  menuBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    color: 'white',
  },
}))

const MenuBtn = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const classes = useStyles()
  const matches = { sm: useMediaQuery(theme.breakpoints.up('sm')) }

  if (matches.sm) return null
  return (
    <Button className={classes.menuBtn} onClick={() => setOpen(!open)}>
      <MenuIcon fontSize="large" />
    </Button>
  )
}

export default function Layout(props: Props) {
  const { desc, keywords, bgColor, height, children } = props
  const paths = [
    '/',
    '/listings',
    '/auth/sign-up',
    '/auth/login',
    '/post-property',
  ]
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()
  const matches = { sm: useMediaQuery(theme.breakpoints.up('sm')) }
  return (
    <div style={{ backgroundColor: bgColor, height: height }}>
      <Head>
        <title>Philadelphia Property Listings</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&family=Inter:wght@200;300;500&family=Padauk&family=Roboto+Condensed:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Grid container>
        <MenuBtn open={open} setOpen={setOpen} />

        <Grid item>
          <div style={{ zIndex: 2, position: 'fixed' }}>
            {paths.some((element) => router.asPath === element) && (
              <Header open={open} />
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ paddingLeft: matches.sm ? '118px' : '' }}>{children}</div>
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </div>
  )
}

Layout.defaultProps = {
  title: 'Philadelphia-Rentals',
  desc: 'Locate properties that are in the market downtown Philadelphia',
  keywords: 'map, mapbox, real estate, property',
}
