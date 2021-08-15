import React from 'react'
import { render } from '../tests/test-utils'
// import { render } from '@testing-library/react'
import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { Property } from '../types/interfaces/property'
import Card from '../src/components/propertyCards/Card'

export type CardType = React.ComponentProps<typeof Card>
// type RecursivePartial<T> = {
//     [P in keyof T]?: RecursivePartial<T[P]>;
//   };

const baseProps: CardType = {
  property:
    {
      id: '0100',

      streetAddress: '4470 Stefanie Flat Apt. 014',
      city: 'Philadelphia',
      zipcode: '70269',
      state: 'PA',

      latitude: 39.92248275098166,
      longitude: -75.21264357559222,

      images: [{fields:{file:{url: '/some-tested-img'}}}],

      firstName: 'Ruth',
      lastName: 'King',
      email: 'rking@gmail.com',
      phone: '(231) 393 - 9391',
      price: '$12910.00',

      bedrooms: 1,
      bathrooms: 3,
      sqft: 919,
      carSpaces: 2,
      type: 'Apartment',
      datePosted: '08/02/2021',
      petFriendly: 'cats only',
    },
    setOpen: jest.fn()
}

const renderUI = (props?: CardType) =>
  render(<Card {...baseProps} {...props} />, {})

test('check if the city a property-card is showing up', async () => {
  renderUI()

  await waitFor(() => {
    expect(screen.getByRole(/listitem/)).toBeInTheDocument()
  })
}) 

test('modal pops up when you click Learn-More btn', () => {
  renderUI()
  userEvent.click(screen.getByText(/Learn More/))
  expect(baseProps.setOpen).toHaveBeenCalled()
})
