// jest.mock(
//   '@material-ui/core/someMuiComp/someMuiComp',
//   () =>
//     ({ children }: any) =>
//       <div>{children}</div>
// )
import React from 'react'
import Map from '../src/components/map/Map'
import { render } from '../tests/test-utils'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

type MapType = React.ComponentProps<typeof Map>

const baseProps: MapType = {
  setSelectedProperty: () => {},
  selectedProperty: {
    _id: 0,
    propertyownername: 'Ruth King',
    price: '$12910.00',
    streetaddress: '4470 Stefanie Flat Apt. 014',
    zipcode: '70269',
    latitude: 39.92248275098166,
    longitude: -75.21264357559222,
    bedrooms: 1,
    bathrooms: 3,
    sqft: 919,
    carSpaces: 2,
    type: 'Apartment',
    daysspotted: 56,
    yearbuilt: 1993,
    petFriendly: 'cats only',
  },
  properties: [
    {
      _id: 0,
      propertyownername: 'Ruth King',
      price: '$12910.00',
      streetaddress: '4470 Stefanie Flat Apt. 014',
      zipcode: '70269',
      latitude: 39.92248275098166,
      longitude: -75.21264357559222,
      bedrooms: 1,
      bathrooms: 3,
      sqft: 919,
      carSpaces: 2,
      type: 'Apartment',
      daysspotted: 56,
      yearbuilt: 1993,
      petFriendly: 'cats only',
    },
    {
      _id: 1,
      propertyownername: 'Rachel James',
      price: '$1189830.00',
      streetaddress: '66667 Dan Springs Suite 983',
      zipcode: '70269',
      latitude: 40.01262749366766,
      longitude: -75.2253948861866,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 339,
      carSpaces: 2,
      type: 'House',
      daysspotted: 6,
      yearbuilt: 1993,
      petFriendly: 'yes',
    },
  ]
}

//   test('SomeComponent shows default value', (children) => {
//     render(<SomeComponent children={children} />)
//     expect(screen.getByText(/Black Stones/)).toBeInTheDocument()
//   })

//   const categoryCount = (category: string) =>
//     someData.reduce(
//       (acc, elem, index, arr): any =>
//         category === elem.category ? acc + 1 : acc,
//       0
//     )

const renderUI = (props?: MapType) => render(<Map {...baseProps} {...props} />, {})

test('check if markers are in place', () => {
  renderUI()
  const smallText = screen.getAllByRole('textbox')
  expect(smallText).toBeInTheDocument()
})
