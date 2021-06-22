import React, { CSSProperties, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import PageTransition from '../src/hoc/PageTransition'
import Layout from '../src/hoc/Layout'
import MyMap from '@/components/map/MyMap'
// import data from './data/db.json'
import PropertyCards from '@/components/propertyCards/Index'
import { PageAnimations } from 'types/interfaces/animation'
import { PropertyData } from 'types/interfaces/property'

var contentful = require("contentful");

let client = contentful.createClient({
  space: process.env.NEXT_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN,
});


export async function getServerSideProps() {
  let data = await client.getEntries({
    content_type: "propertyListings",
  }).then((data) => {
    console.log('data response in gSSP: ', data.items)
    console.log('data.items[0].fields response in gSSP: ', data.items[0].fields)
    return data
  }).catch((err) => {
    console.log('Error Message: ', err)
  });
  
  return {
    props: {
      properties: data.items
      // properties: JSON.parse(JSON.stringify(data.properties))
    },
  };
}


interface Props {
  pageStyle?: CSSProperties
  pageAnimations: PageAnimations
  // properties: PropertyData[]
  properties: any
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    backgroundColor: '#cacacf',
  },
}))

export default function ListingsPage(props: Props) {
  const { pageAnimations, pageStyle, properties } = props
  const classes = useStyles()
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyData | null>(null)

    console.log(' data.items - properties: ', properties)
  
  return (
    <Layout>
      {/* <PageTransition pageAnimations={pageAnimations} pageStyle={pageStyle}> */}
        <MyMap
          properties={properties}
          selectedProperty={selectedProperty}
          setSelectedProperty={setSelectedProperty}
        />
        <PropertyCards properties={properties} />
      {/* </PageTransition> */}
    </Layout>
  )
}
