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
import PostForm from '@/components/postForm/PostForm'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import PageTransition from '@/src/hoc/PageTransition'
import { PageAnimations } from 'types/interfaces/animation'

interface Props {
  pageStyle?: CSSProperties
  pageAnimations: PageAnimations
  // properties: PropertyData[]
  properties: any
}

export default function PostPropertyPage(props: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = () => setOpen(false)
  const { pageAnimations, pageStyle } = props
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
  } /* 0px     600px    960px    1280px   1920px */

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
            <GridContainer justifyContent={matches.md ? 'space-between' : 'center'}>
              <Box mb={5}>
                <Typography
                  component="div"
                  variant={`${matches.md ? 'h3' : 'h4'}`}
                >
                  Post Your Property
                  <Typography variant="body1" component="div">
                    Post the property you would like to put on the market below.{' '}
                    <br />
                    You would be posting it as a Guest user.
                  </Typography>
                </Typography>
              </Box>
              <GridContainer justifyContent="center">
                {/* <PostPropertyForm /> */}
                <Box
                  style={{ backgroundColor: lighten(color.darkSlateBlue, 0.3), borderRadius: '5px', boxShadow: '0 0px 15px rgba(0,0,0,0.5)' }}
                  my={5}
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
