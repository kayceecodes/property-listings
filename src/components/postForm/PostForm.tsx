import React, { useState } from "react";
import Container from "@material-ui/core/Container/Container";
import Grid, { GridSize } from "@material-ui/core/Grid/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "./FormsUI/Textfield";
import { Property, PropertyPost } from "types/interfaces/property";
import Button from "@material-ui/core/Button/Button";
import Select from "./FormsUI/Select";
import { inputProps } from "../../../utils/Constants";
import DateTimePicker from "./FormsUI/DateTimePicker";
import { color } from "@/src/theme/Color";
import { fade, lighten } from "@material-ui/core/styles/colorManipulator";
import Popper from "@material-ui/core/Popper/Popper";
import Icon from "@material-ui/core/Icon/Icon";
import { Entry, Environment, Space } from "contentful-management/types";
import { createClient } from "contentful-management";
import Upload from "./FormsUI/Upload/Upload";

const useStyles = makeStyles((theme) => ({
  // fileInputBtn: {
  //   color: fade(color.offWhite, 0.65),
  //   marginRight: "20px",
  //   padding: "10px 30px",
  //   border: `1px solid ${fade("#000", 0.25)}`,
  // },
  // fileInput: {
  //   display: "none",
  // },
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  paper: {
    border: `1px solid ${fade(lighten(color.darkSlateBlue, 0.08), 0.2)}`,
    padding: theme.spacing(1),
    backgroundColor: "#2a2a2a",
    borderRadius: "3px",
    color: fade(color.offWhite, 0.93),
  },
  submitBtn: {
    color: "#111 !important",
    padding: "15px 30px",
  },
  submitBtnWrapper: {
    width: "45%",
    margin: "30px auto 0",
  },
  text: {
    color: fade(color.offWhite, 0.65),
    fontWeight: 300,
  },
}));

const INITIAL_FORM_STATE: Omit<PropertyPost, "id"> = {
  firstName: "Dan",
  lastName: "Lot",
  email: "dlot@gmail.com",
  phone: "267 483 3003",
  price: "$35000.00",
  streetAddress: "123 South St.",
  city: "Philadelphia",
  state: "Pennsylvania",
  zipcode: "92130",
  latitude: -39.94217,
  longitude: -75.17629,
  images: [],
  bedrooms: 1,
  bathrooms: 1,
  sqft: 30050,
  carSpaces: 3,
  type: "Condominium",
  datePosted: "",
  petFriendly: "No Pets",
};
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Required"),
  price: Yup.string().required("Required"),
  streetAddress: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  zipcode: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  /**/ latitude: Yup.number().required("Required"),
  /**/ longitude: Yup.number().required("Required"),
  // images: Yup.string().required('Required'),
  /**/ bedrooms: Yup.number().required("Required"),
  /**/ sqft: Yup.number().required("Required"),
  /**/ carSpaces: Yup.number().required("Required"),
  type: Yup.string().required("Required"),
  datePosted: Yup.date().required("Required"),
  petFriendly: Yup.string().required("Required"),
});

export default function PostForm() {
  const classes = useStyles();
  var faker = require("faker");
  var _ = require("lodash");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handlePopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const [selectedImage, setSelectedImage] = useState<File>()
  const uploadImage = () => {
    const formData = new FormData()
    formData.append('file', selectedImage)
    formData.append('upload_preset', 'ubveh1ft')

    return fetch('https://api.cloudinary.com/v1_1/duezerehu/image/upload', {
        method: 'POST',
        body: formData
    })
    .then((res) => console.log(res))
}
  const handleSubmit = (values:Omit<PropertyPost, "id">) => {
    const href = uploadImage()
    postProperty(values)
  }
  const postProperty = (data: Partial<Property>) => {
    const SPACE_ID = process.env.NEXT_CONTENTFUL_SPACE_ID;
    const client = createClient({
      accessToken: process.env.NEXT_CONTENTFUL_PERSONAL_ACCESS_TOKEN as string,
    });
    // 1 get space by space id
    client.getSpace(SPACE_ID).then((space: Space) => {
      // 2 get environment
      space.getEnvironment("master").then(async (environment: Environment) => {
        // 3 then - Create Entry
        environment
          .createEntry("propertyListings", {
            fields: {
              id: {
                "en-US": faker.datatype.number(4) + "-" + data.streetAddress,
              },
              firstName: {
                "en-US": data.firstName,
              },
              lastName: {
                "en-US": data.lastName,
              },
              email: {
                "en-US": data.email,
              },
              phone: {
                "en-US": data.phone,
              },
              price: {
                "en-US": data.price,
              },
              streetAddress: {
                "en-US": data.streetAddress,
              },
              city: {
                "en-US": data.city,
              },
              state: {
                "en-US": data.state,
              },
              zipcode: {
                "en-US": data.zipcode,
              },
              latitude: {
                "en-US": Number(data.latitude as number),
              },
              longitude: {
                "en-US": Number(data.longitude as number),
              },
              bedrooms: {
                "en-US": data.bedrooms,
              },
              bathrooms: {
                "en-US": data.bathrooms,
              },
              sqft: {
                "en-US": Number(data.sqft),
              },
              carSpaces: {
                "en-US": data.carSpaces,
              },
              type: {
                "en-US": data.type,
              },
              datePosted: {
                "en-US": data.datePosted,
              },
              petFriendly: {
                "en-US": data.petFriendly,
              },
              images: {
                "en-US": [],
              },
            },
          })
          // 4 then - publish entry
          .then((entry) => entry.publish())
          .then(function (entry: Entry) {
            
            // 5 create a new asset in my Contentful media section
            environment
              .createAssetWithId(
                faker.datatype.number(4).toString(),
                {
                  fields: {
                    title: {
                      "en-US": data.streetAddress,
                    },
                    file: {
                      "en-US": {
                        contentType: "image/jpeg",
                        fileName: data.streetAddress + ".jpeg",
                        upload: "http://www.example.com/test.jpg",
                      },
                    },
                  },
                }
              )
              .then((asset) => asset.processForAllLocales())
              .then((asset) => asset.publish())
              .then(function (asset) {
                // assign uploaded image as an entry field
                entry.fields["image"]["en-US"] = {
                  sys: { id: asset.sys.id, linkType: "Asset", type: "Link" },
                };
                return entry.update();
              });
          });
      });
    });
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              validateOnChange={true}
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({
                isValid,
                dirty,
                errors,
                isSubmitting,
                submitForm,
                values,
                setFieldValue,
              }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>Property Details</Typography>
                    </Grid>
                    {inputProps.map((prop) => (
                      <Grid
                        key={prop.name}
                        item
                        xs={prop.xs as GridSize}
                        sm={prop.sm as GridSize}
                      >
                        {prop.type === "textfield" ? (
                          <TextField name={prop.name} label={prop.label} />
                        ) : prop.type === "select" ? (
                          <Select
                            name={prop.name}
                            label={prop.label}
                            options={prop.options}
                          />
                        ) : prop.type === "file" ? (
                          <>
                            <Upload setFieldValue={setFieldValue} images={values.images} />

                          {/* <input
                              type="file"
                              multiple
                              name="images[]"
                              accept="images/*"
                              id="raised-button-file"
                              onChange={(event) =>
                                setFieldValue("images", event.target.value)
                              }
                              className={classes.fileInput}
                            />
                            <label htmlFor="raised-button-file">
                              <Button
                                component="span"
                                id="file-browser"
                                className={classes.fileInputBtn}
                                // onClick={() => setFiles(values.images[0].fields.file.url)}
                              >
                                <Icon>perm_media</Icon>
                              </Button>
                            </label>
                            <span className={classes.text}>
                              {values.images.length > 0
                                ? values.images
                                : "Upload Images"}
                            </span>  */}
                          </>
                        ) : (
                          <DateTimePicker
                            name="datePosted"
                            label="Date Posted"
                          />
                        )}
                      </Grid>
                    ))}
                    {/* {console.log("Errors in Formik: ", errors)} */}
                    {/* {console.log('Images: ', values.images[0].fields.file.url)} */}
                    <Grid item xs={12}>
                      <div className={classes.submitBtnWrapper}>
                        <Button
                          disabled={(!isValid && !dirty) || isSubmitting}
                          variant="outlined"
                          fullWidth={true}
                          className={classes.submitBtn}
                          onClick={(event: any) => {
                            if (!isValid || Object.keys(errors).length > 0) {
                              handlePopper(event);
                              submitForm();
                              console.log("not submitted..");
                            } else {
                              console.log("It's been submitted!");
                              submitForm();
                              handleSubmit(values)
                              // postProperty(values);
                            }
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                      <Popper open={open} anchorEl={anchorEl}>
                        <div className={classes.paper}>
                          Please finish the form.
                        </div>
                      </Popper>
                      {/* <pre>{JSON.stringify(values.images)}</pre> */}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}
