import { color } from "@/src/theme/Color";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import { fade } from "@material-ui/core/styles/colorManipulator";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { ContentfulImages } from "types/interfaces/property";

interface Props {
  setFieldValue: (key: string, value: string) => void;
  images: ContentfulImages[];
}

const useStyles = makeStyles((theme) => ({
  fileInputBtn: {
    color: fade(color.offWhite, 0.65),
    marginRight: "20px",
    padding: "10px 30px",
    border: `1px solid ${fade("#000", 0.25)}`,
  },
  fileInput: {
    display: "none",
  },
  text: {
    color: fade(color.offWhite, 0.65),
    fontWeight: 300,
  },
}));

export default function Upload(props: Props) {
  const { setFieldValue, images } = props;
  const classes = useStyles();
  console.log("images in Upload component: ", images);

  const uploadImage = (files: FileList) => {
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'ubveh1ft')

    fetch('https://api.cloudinary.com/v1_1/duezerehu/image/upload', {
        method: 'POST',
        body: formData
    })
    .then((res) => console.log(res))
}

  return (
    <>
      <input
        type="file"
        multiple
        name="images[]"
        accept="images/*"
        id="raised-button-file"
        onChange={(event) => setFieldValue("images", event.target.value)}
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
        {images.length > 0 ? images : "Upload Images"}
      </span>
    </>
  );
}
