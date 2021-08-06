import React, { CSSProperties } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Typography from '@material-ui/core/Typography/Typography'
import Paper from '@material-ui/core/Paper/Paper'
import MenuList from '@material-ui/core/MenuList/MenuList'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Layout from '../src/hoc/Layout'
import { PageAnimations } from '../types/interfaces/animation'
import PageTransition from '../src/hoc/PageTransition'

interface Props {
  pageStyle?: CSSProperties
  pageAnimations: PageAnimations
}

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export default function HomePage(props: Props) {
  const classes = useStyles()
  const { pageAnimations } = props
  return (
    <Layout>
      <PageTransition pageAnimations={pageAnimations}>
        HOME
      </PageTransition>
    </Layout>
  )
}
