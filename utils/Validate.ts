import { FormValues, PostProperty } from "@/components/postForm/PostPropertyForm"
import { FormikErrors } from "formik/dist/types"

export const validate = (values: FormValues) => {
    let errors: FormikErrors<PostProperty> = {}
    // if (!values.email) {
    //   errors.email = 'Required'
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    //   errors.email = 'Invalid email format'
    // }
    // if (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/) {
    //   errors.phoneNumber = 'Invalid phone Number'
    // }
    if (!values.propertyOwnername) {
      errors.propertyOwnerName = 'Required'
    }
    if (!values.price) {
      errors.price = 'Required'
    }
    if (!values.streetAddress) {
      errors.streetAddress = 'Required'
    }
    if (!values.city) {
      errors.city = 'Required'
    }
    if (!values.zipcode) {
      errors.zipcode = 'Required'
    }
    if (!values.state) {
      errors.state = 'Required'
    }
    if (!values.latitude) {
      errors.longitude = 'Required'
    }
    if (!values.longitude) {
      errors.longitude = 'Required'
    }
    if (!values.images) {
      errors.images = 'Required'
    }
    if (!values.bedrooms) {
      errors.bedrooms = 'Required'
    }
    if (!values.sqft) {
      errors.sqft = 'Required'
    }
    if (!values.type) {
      errors.type = 'Required'
    }
  
    return errors
  }