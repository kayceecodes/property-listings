import React, { CSSProperties, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles'
import PageTransition from '../src/hoc/PageTransition'
import Layout from '../src/hoc/Layout'
import Map from '@/components/map/Map'
import data from './data/db.json'
import PropertyCards from '@/components/propertyCards/Index'
import { PageAnimations } from 'types/interfaces/animation'
import { Property, PropertyData } from 'types/interfaces/property'

interface Props {
  pageStyle?: CSSProperties
  pageAnimations: PageAnimations
}

const useStyles = makeStyles((theme: Theme) => ({}))

export default function ListingsPage(props: Props) {
  const { pageAnimations, pageStyle } = props
  const classes = useStyles()
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null)

  return (
    <Layout>
      <PageTransition pageAnimations={pageAnimations} pageStyle={pageStyle}>
        <div style={{ height: '400px', width: '100%' }}>
          <Map
            properties={data.properties}
            selectedProperty={selectedProperty}
            setSelectedProperty={setSelectedProperty}
          />
          <PropertyCards properties={data.properties} />
        </div>
      </PageTransition>
    </Layout>
  )
}
