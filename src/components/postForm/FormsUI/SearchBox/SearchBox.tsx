import React, { ChangeEvent, MouseEvent } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  Suggestion,
} from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import Icon from "@material-ui/core/Icon/Icon";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useField } from "formik";
import { color } from "@/src/theme/Color";
import { darken } from "@mui/system";
import GridContainer from "@/src/ui/grid/GridContainer";
import Grid from "@material-ui/core/Grid";

interface ISearchBoxProps {
  name: string;
  label: string;
  setFieldValue: (key: string, value: string | number) => void;
  // onSelectAddress: (
  //   address: string,
  //   latitude?: number | null,
  //   longitude?: number | null
  // ) => void;
  defaultValue: string;
}

const libraries: Libraries = ["places"];

const useStyles = makeStyles((theme) => ({
  autocomplete: {
    borderRadius: "4px",
    border: "1.2px solid #46494d",
    padding: "0 5px 5px",
    [theme.breakpoints.up("sm")]: {
      padding: "0 25px 5px 15px",
    },
  },
  textField: {
    marginTop: 2,
  },
  optionsText: {
    color: color.dimGray,
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: color.offWhite,
    },
  },
}));

export function SearchBox({
  setFieldValue,
  defaultValue,
  name,
}: ISearchBoxProps) {
  const [field, meta] = useField(name);
  const handleChange = (event: any) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };
  const configTextField = {
    ...field,
    error: false,
    helperText: "",
  };
  const inputStyle = {
    WebkitBoxShadow: "0 0 0 1000px #5b5f64 inset",
    border: "0px solid transparent",
    borderRadius: "0px",
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  const classes = useStyles();
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    libraries,
  });

  if (!isLoaded) return null;
  if (loadError) return <div>Error loading</div>;

  return (
    <div>
      <ReadySearchBox
        name={name}
        configTextField={configTextField}
        setFieldValue={setFieldValue}
        defaultValue={defaultValue}
      />
    </div>
  );
}

function ReadySearchBox({
  setFieldValue,
  defaultValue,
  name,
  configTextField,
}: Omit<ISearchBoxProps, "name" | "label"> & {
  name: string;
  configTextField: any;
}) {
  const classes = useStyles();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300, defaultValue });

  const handleChange = (e: any) => {
    setValue(e.currentTarget.value);
    // console.log("handleChange() value: ", value);
    // console.log("handleChange() event.currentTarget.value: ", e.target.value);
    if (e.target.value === "") {
      setFieldValue("address", "");
      setFieldValue("latitude", 0);
      setFieldValue("longitude", 0);
    }
  };

  const handleSelect = async (event: any, string) => {
    let address = (event.target.innerHTML || string);
   
    // setValue(address, false);
      clearSuggestions();
   
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
    
      setFieldValue("address", address);
      setFieldValue("latitude", lat);
      setFieldValue("longitude", lng);
    } catch (error) {
      console.error(`😱 Error:`, error);
    }
    console.log("Status in ReadySearchBox: ", status);
  };

  return (
    <Autocomplete
      classes={{
        root: classes.autocomplete,
        option: classes.optionsText,
        listbox: classes.optionsText,
      }}
      // onChange={handleSelect}
      onChange={(event, string) => handleSelect(event, string)}
      id="free-solo-demo"
      freeSolo
      options={data.map(({ place_id, description }) => description as string)}
      renderInput={(params) => (
        <Grid container justifyContent="space-around" alignItems="center">
          <Grid item xs={1} style={{ padding: "15px 0px 0 0" }}>
            <Icon>search</Icon>
          </Grid>
          <Grid item xs={10}>
            <TextField
              {...params}
              {...configTextField}
              onChange={(event: any) => handleChange(event)}
              size="small"
              id="outlined-size-small"
              name={name}
              label="Search Address"
              margin="normal"
              className={classes.textField}
            />
          </Grid>
        </Grid>
      )}
    />
  );
}

export default SearchBox;
