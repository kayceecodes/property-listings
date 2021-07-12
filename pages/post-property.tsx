import React, { useState } from 'react'
import Layout from '@/src/hoc/Layout'
import PermissionPopup from '@/src/ui/modals/PermissionPopup'
import Container from '@material-ui/core/Container/Container'
import Typography from '@material-ui/core/Typography/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/theme/Theme'
import PostPropertyForm from '@/components/postForm/PostPropertyForm'
import GridContainer from '@/src/ui/grid/GridContainer'
import { colors } from '@/src/theme/Color'
import Box from '@material-ui/core/Box/Box'

export default function PostPropertyPage() {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = () => setOpen(false)
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
  } /* 0px     600px    960px    1280px   1920px */

  return (
    <Layout>
      <Box py={5}>
        <Container maxWidth="lg">
          <PermissionPopup
            handleClose={handleClose}
            open={open}
            setOpen={setOpen}
          />
          <GridContainer justify={matches.md ? 'space-between' : 'center'}>
            <Box mb={5}>
              <Typography
                style={{
                  margin: '15px 0px',
                  color: colors.cream,
                  fontSize: '2rem',
                }}
                component="div"
                variant={`${matches.md ? 'body1' : 'h3'}`}
              >
                Post Your Property
                <Typography variant="body1" component="div">
                  Post the property you would like to put on the market below.{' '}
                  <br />
                  You would be posting it as a Guest user.
                </Typography>
              </Typography>
            </Box>
            <GridContainer justify="center">
              <PostPropertyForm />
            </GridContainer>
          </GridContainer>
        </Container>
      </Box>
    </Layout>
  )
}
