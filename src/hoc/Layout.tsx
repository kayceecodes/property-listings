import React, { CSSProperties, ReactNode } from 'react'
import Header from '../header/Header'
import { makeStyles, Theme } from '@material-ui/core/styles'
import PageTransition from './PageTransition'
import { PageAnimations } from '../../types/interfaces/animation'
import Head from 'next/head'

interface Props {
  children: ReactNode[] | ReactNode
  revealHeader?: boolean
  desc: string
  keywords: string
  bgColor?: string
  height?: string
}

export default function Layout(props: Props) {
  const { desc, keywords, bgColor, height, children } = props

  return (
    <div style={{ backgroundColor: bgColor, height: height }}>
      <Head>
        <title>Philadelphia Property Listings</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;500&family=Padauk&family=Roboto+Condensed:wght@300;400&display=swap"
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
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  )
}

Layout.defaultProps = {
  title: 'Philadelphia-Rentals',
  desc: 'Locate properties that are in the market downtown Philadelphia',
  keywords: 'map, mapbox, real estate, property',
}
