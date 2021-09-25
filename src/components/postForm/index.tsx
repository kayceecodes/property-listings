import React, { useState } from "react";
import Container from "@material-ui/core/Container/Container";
import Grid, { GridSize } from "@material-ui/core/Grid/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "./FormsUI/Textfield";
import { Property } from "types/interfaces/property";
import Button from "@material-ui/core/Button/Button";
import Select from "./FormsUI/Select";
import { inputProps } from "../../../utils/Constants";
import DateTimePicker from "./FormsUI/DateTimePicker";
import { color } from "@/src/theme/Color";
import { alpha, lighten } from "@material-ui/core/styles/colorManipulator";
import Popper from "@material-ui/core/Popper/Popper";
import Upload from "./FormsUI/Upload/Upload";
import SearchBox from "./SearchBox/SearchBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box/Box";
import { useRouter } from "next/router";
import { createEntryWithAsset } from "@/src/contentful/createEntryWithAsset";
import GridContainer from "@/src/ui/grid/GridContainer";

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
    fontSize: "1.1rem",
    letterSpacing: "1.2px",
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

function Forms(props) {

  switch (props.type) {
    case "auto-complete":
      return (
        <SearchBox
          name={props.name}
          label={props.label}
          setFieldValue={props.setFieldValue}
          defaultValue=""
        />
      )
    case "textfield":
      return <TextField name={props.name} label={props.label} />;
    case "select":
      return (
        <Select name={props.name} label={props.label} options={props.options} />
      );
    case "file":
      return (
        <Upload
          name={props.name}
          setFieldValue={props.setFieldValue}
          setSelectedImage={props.setSelectedImage}
          image={props.values.image}
        />
      )
    case "date-picker":
      return <DateTimePicker name="datePosted" label="Date Posted" />
    default:
      return <strong>No Match</strong>
  }
}

const initialValues: Property = {
  address: "",
  firstName: "Toni",
  lastName: "Miles",
  email: "tmiles@gmail.com",
  phone: "301 510 0229",
  price: "$3300.00",
  image: undefined,
  images: undefined,
  latitude: 0,
  longitude: 0,
  bedrooms: 2,
  bathrooms: 2,
  sqft: 1800,
  carSpaces: 2,
  type: "House",
  status: "Rent",
  datePosted: "",
  petFriendly: "No",
};

const validationSchema = Yup.object().shape({
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
  const router = useRouter();
  const handleSubmit = (values: Omit<Property, "id">) => {
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
      router.push("/listings");
    }, 5000);
  };

  return (
    <GridContainer xs={12}>
      <Container maxWidth="md">
        {formLoading ? (
          <Box justifyContent="center" alignItems="center">
            <CircularProgress
              style={{ padding: "40px" }}
              color="secondary"
              size={145}
              thickness={4}
            />
          </Box>
        ) : (
          <div className={classes.formWrapper}>
            <Formik
              validateOnChange={true}
              initialValues={{
                ...initialValues,
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
              validationSchema={validationSchema}
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
                        <Forms
                          name={prop.name}
                          label={prop.label}
                          type={prop.type}
                          setFieldValue={setFieldValue}
                          defaultValue=""
                          options={prop.options}
                          setSelectedImage={setSelectedImage}
                          values={values}
                        />
                      </Grid>
                    ))}
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
    </GridContainer>
  );
}
