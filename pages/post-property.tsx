import React, { useState } from 'react'
import Layout from '@/src/hoc/Layout'
import PermissionPopup from '@/src/ui/modals/PermissionPopup'
import Container from '@material-ui/core/Container/Container'
import Typography from '@material-ui/core/Typography/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/theme/Theme'
import PostPropertyForm from '@/components/postForm/PostPropertyForm'

export default function PostPropertyPage() {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = () => setOpen(false)
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
  } /* 0px     600px    960px    1280px   1920px */

  return (
    <Layout>
      <Container maxWidth="md">
        <PermissionPopup
          handleClose={handleClose}
          open={open}
          setOpen={setOpen}
        />
        <Typography variant={`${matches.md ? 'h5' : 'h6'}`}>Post Property Page</Typography>
        <PostPropertyForm />
      </Container>
    </Layout>
  )
}
