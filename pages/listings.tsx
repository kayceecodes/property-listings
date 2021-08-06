import React, { CSSProperties, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import PageTransition from '../src/hoc/PageTransition'
import Layout from '../src/hoc/Layout'
import MyMap from '../src/components/map/MyMap'
import PropertyCards from '../src/components/propertyCards/Index'
import { PageAnimations } from 'types/interfaces/animation'
import PropertyModal from '../src/components/propertyModal/PropertyModal'

var contentful = require('contentful')

let client = contentful.createClient({
  space: process.env.NEXT_CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN as string,
})

export async function getServerSideProps() {
  let data = await client
    .getEntries({
      content_type: 'propertyListings',
    })
    .then((data) => {
      console.log('data response in gSSP: ', data.items)
      console.log(
        'data.items[0].fields response in gSSP: ',
        data.items[0].fields
      )
      return data
    })
    .catch((err) => {
      console.log('Error Message: ', err)
    })

  return {
    props: {
      properties: data.items,
      // properties: JSON.parse(JSON.stringify(data.properties))
    },
  }
}

interface Props {
  pageStyle?: CSSProperties
  pageAnimations: PageAnimations
  // properties: PropertyData[]
  properties: any
}

export default function ListingsPage(props: Props) {
  const { pageAnimations } = props
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = () => setOpen(false)
  const properties = props.properties.map((property) => property.fields)

  console.log('listings.tsx data.items - properties: ', properties)

  return (
    <Layout>
      <PageTransition pageAnimations={pageAnimations}>
        <PropertyModal open={open} handleClose={handleClose} />
        <MyMap
          setOpen={setOpen}
          properties={properties}
        />
        <PropertyCards
          setOpen={setOpen}
          properties={properties}
        />
      </PageTransition>
    </Layout>
  )
}
