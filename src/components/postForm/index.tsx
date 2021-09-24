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
import { alpha, lighten } from "@material-ui/core/styles/colorManipulator";
import Popper from "@material-ui/core/Popper/Popper";
import { createClient } from "contentful-management";
import Upload from "./FormsUI/Upload/Upload";
import SearchBox from "./SearchBox/SearchBox";
import { LittleSearchBox } from "./SearchBox/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box/Box";
import { useRouter } from "next/router";

const client = createClient({
  accessToken: process.env.NEXT_CONTENTFUL_PERSONAL_ACCESS_TOKEN as string,
});

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    transition: "opacity 0.3s",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  paper: {
    border: `1px solid ${alpha(lighten(color.darkSlateBlue, 0.08), 0.2)}`,
    padding: theme.spacing(1),
    backgroundColor: "#2a2a2a",
    borderRadius: "3px",
    color: alpha(color.offWhite, 0.93),
  },
  submitBtn: {
    backgroundColor: `${alpha(lighten(color.darkSlateBlue, 0.08), 0.15)}`,
    color: "#fff !important",
    paddingTop: "15px",
    paddingBottom: "15px",
    fontSize: '1.1rem',
    letterSpacing: '1.2px',
  },
  submitBtnWrapper: {
    width: "45%",
    margin: "30px auto 0",
  },
  text: {
    color: alpha(color.offWhite, 0.65),
    fontWeight: 300,
  },
}));

// const INITIAL_FORM_STATE: Omit<PropertyPost, "id"> = {
// const INITIAL_FORM_STATE: any = {
// firstName: "Toni",
// lastName: "Belmany",
// email: "tbel@gmail.com",
// phone: "267 483 3003",
// price: "$1900.00",
// images: [],
// bedrooms: 2,
// bathrooms: 2,
// sqft: 50050,
// carSpaces: 2,
// type: "House",
// status: "Rent",
// datePosted: "",
// petFriendly: "No",
// };
const INITIAL_FORM_STATE: any = {
  firstName: "Toni",
  lastName: "Miles",
  email: "tmiles@gmail.com",
  phone: "301 510 0229",
  price: "$3300.00",
  image: "",
  bedrooms: 2,
  bathrooms: 2,
  sqft: 50050,
  carSpaces: 2,
  type: "House",
  status: "Rent",
  datePosted: "",
  petFriendly: "No",
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
  address: Yup.string().required("Required"),
  image: Yup.string().required("Required"),
  /**/ bedrooms: Yup.number().required("Required"),
  /**/ sqft: Yup.number().required("Required"),
  /**/ carSpaces: Yup.number().required("Required"),
  type: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
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
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<FileList>();
  const uploadImage = async (): Promise<any> => {
    const formData = new FormData();
    console.log("selectedImage:", selectedImage);
    formData.append("file", selectedImage[0]);
    formData.append("upload_preset", "ubveh1ft");

    return fetch("https://api.cloudinary.com/v1_1/duezerehu/image/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  };
  const router = useRouter()
  const handleSubmit = (values: Omit<PropertyPost, "id">) => {
    uploadImage().then((res) => createEntryWithAsset(values, res.secure_url));
  };
  const handleLoading = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
    }, 1500);
    setTimeout(() => {
      setFormLoading(true);
    }, 1500);
    setTimeout(() => {
      setFormLoading(false);
    router.push('/listings')
    }, 5000);
  };
  async function createEntryWithAsset(
    data: Omit<Property, "id">,
    uploadHref: string
  ) {
    // #1 Get Space
    const space = await client.getSpace(process.env.NEXT_CONTENTFUL_SPACE_ID);
    // #2 Get Environment
    const environment = await space.getEnvironment("master");
    const random_id = faker.datatype.string(8)
    // console.log('Random faker string: ', random_id)

    console.log("data.lng in postProperty() : ", data.longitude);
    // #3 Create Entry
    let entry = await environment.createEntry("propertyListings", {
      fields: {
        id: {
          "en-US": faker.datatype.number(2000).toString(),
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
        address: {
          "en-US": data.address,
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
        image: {
          "en-US": null,
        },
      },
    });
    // #4 Reassign Entry to have latest version
    entry = await entry.publish();
    // #5 Asset Creation
    let asset = await environment.createAsset({
      fields: {
        title: {
          "en-US": "image",
        },
        file: {
          "en-US": {
            contentType: "image/jpeg",
            fileName: faker.datatype.number(5) + "-" + data.zipcode + ".jpg",
            upload: uploadHref,
          },
        },
      },
    });
    // #6 Asset Publish
    asset = await asset.processForAllLocales();
    asset = await asset.publish();

    // //#7 Update Entry With New Asset
    entry.fields["image"]["en-US"] = {
      sys: {
        id: asset.sys.id,
        linkType: "Asset",
        type: "Link",
      },
    };
    entry = await entry.update();
    entry = await entry.publish();
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        
        <Container maxWidth="md">
          {formLoading ? (
            <Box justifyContent="center" alignItems="center">
              <CircularProgress style={{padding: '40px'}} color="secondary" size={145} thickness={4} />
            </Box>
          ) : (
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
                        <Typography variant="h5">Property Details</Typography>
                      </Grid>
                      {inputProps.map((prop) => (
                        <Grid
                          key={prop.name}
                          item
                          xs={prop.xs as GridSize}
                          sm={prop.sm as GridSize}
                          md={prop.md as GridSize}
                        >
                          {prop.type === "auto-complete" ? (
                            // <LittleSearchBox />
                            <SearchBox
                              name={prop.name}
                              label={prop.label}
                              setFieldValue={setFieldValue}
                              defaultValue=""
                            />
                          ) : prop.type === "textfield" ? (
                            <TextField name={prop.name} label={prop.label} />
                          ) : prop.type === "select" ? (
                            <Select
                              name={prop.name}
                              label={prop.label}
                              options={prop.options}
                            />
                          ) : prop.type === "file" ? (
                            <Upload
                              name={prop.name}
                              setFieldValue={setFieldValue}
                              setSelectedImage={setSelectedImage}
                              image={values.image}
                            />
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
                            disabled={
                              (!isValid && !dirty) || isSubmitting || !dirty
                            }
                            variant="outlined"
                            fullWidth={true}
                            className={classes.submitBtn}
                            onClick={(event: any) => {
                              if (!isValid || Object.keys(errors).length > 0) {
                                handlePopper(event);
                                console.log("not submitted..");
                              } else {
                                console.log("It's been submitted!");
                                submitForm();
                                handleSubmit(values);
                                handleLoading();
                              }
                            }}
                          >
                            {btnLoading ? (
                              <CircularProgress size={15} thickness={2} />
                            ) : (
                              <span>Submit</span>
                            )}
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
          )}
        </Container>
      </Grid>
    </Grid>
  );
}
