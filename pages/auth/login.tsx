import { Theme } from '@material-ui/core/styles/createTheme'
import makeStyles from '@material-ui/core/styles/makeStyles'
import React, { CSSProperties } from 'react'
import Layout from 'src/hoc/Layout'
import PageTransition from 'src/hoc/PageTransition'
import { PageAnimations } from 'types/interfaces/animation'

interface Props {
  pageStyle?: CSSProperties
  pageAnimations: PageAnimations
}

const useStyles = makeStyles((theme: Theme) => {})

export default function Login(props: Props) {
  const classes = useStyles()
  const { pageAnimations, pageStyle } = props
  return (
    <Layout>
      {/* <PageTransition pageAnimations={pageAnimations} pageStyle={pageStyle}> */}
        <div>Login</div>
      {/* </PageTransition>s */}
    </Layout>
  )
}
