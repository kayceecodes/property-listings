import React, { CSSProperties } from 'react'
import { Theme } from '@material-ui/core/styles/createTheme'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Layout from 'src/hoc/Layout'
import PageTransition from 'src/hoc/PageTransition'
import { PageAnimations } from 'types/interfaces/animation'

interface Props {
    pageStyle?: CSSProperties
    pageAnimations: PageAnimations
  }
  
  const useStyles = makeStyles((theme: Theme) => {
  
  })
  
  export default function SignUp(props: Props) {
    const classes = useStyles()
    const { pageAnimations, pageStyle } = props
    return (
        <Layout>
      {/* <PageTransition pageAnimations={pageAnimations} pageStyle={pageStyle}> */}
            <div>Sign Up</div>
      {/* </PageTransition> */}
      </Layout>
    )
  }
  