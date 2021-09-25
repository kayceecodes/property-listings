import React, { CSSProperties, useState } from 'react'
import Layout from '@/src/hoc/Layout'
import PermissionPopup from '@/src/ui/modals/PermissionPopup'
import Container from '@material-ui/core/Container/Container'
import Typography from '@material-ui/core/Typography/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/theme/Theme'
import GridContainer from '@/src/ui/grid/GridContainer'
import { color } from '@/src/theme/Color'
import Box from '@material-ui/core/Box/Box'
import PostForm from '@/components/postForm/index'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import PageTransition from '@/src/hoc/PageTransition'
import { PageAnimations } from 'types/interfaces/animation'

interface Props {
  pageStyle?: CSSProperties
  pageAnimations: PageAnimations
  properties: any
}

export default function PostPropertyPage(props: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = () => setOpen(false)
  const { pageAnimations, pageStyle } = props
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
  } 
  return (
    <Layout>
      <PageTransition pageAnimations={pageAnimations}>
        <Box py={5} mx={3} mt={8}>
          <Container maxWidth="lg">
            <PermissionPopup
              handleClose={handleClose}
              open={open}
              setOpen={setOpen}
            />
            <GridContainer direction="column">
              <Box mb={3}>
                <Typography
                  component="div"
                  variant={`${matches.md ? 'h3' : 'h4'}`}
                >
                  Post Your Property
                  <Typography style={{marginTop: '30px'}} variant="body1" component="div">
                    Post the property you would like to put on the market below.{' '}
                    <br />
                    Then check on it in the <strong>Listings</strong> page.
                  </Typography>
                </Typography>
              </Box>
              <GridContainer justifyContent="center">
                {/* <PostPropertyForm /> */}
                <Box
                  style={{ backgroundColor: lighten(color.darkSlateBlue, 0.3), borderRadius: '5px', boxShadow: '0 0px 15px rgba(0,0,0,0.8)' }}
                  mt={13}
                >
                  <PostForm />
                </Box>
              </GridContainer>
            </GridContainer>
          </Container>
        </Box>
      </PageTransition>
    </Layout>
  )
}
