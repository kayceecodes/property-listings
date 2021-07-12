jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));
    
import React from 'react'
import { render } from '../tests/test-utils'
// import { render } from '@testing-library/react'
import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { Property } from '../types/interfaces/property'
import PostProperty from '../pages/post-property'

export type PostPropertyType = React.ComponentProps<typeof PostProperty>


const baseProps: PostPropertyType = {
}

const renderUI = (props?: PostPropertyType) =>
  render(<PostProperty {...baseProps} {...props} />, {})


test('initial load of form in post-property', () => {
  // renderUI()
  // const form = screen.getByRole("form")
})
