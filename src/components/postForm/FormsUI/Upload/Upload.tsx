import { color } from "@/src/theme/Color";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { ContentfulImages } from "types/interfaces/property";

interface Props {
  setFieldValue: (key: string, value: string) => void;
  setSelectedImage: React.Dispatch<React.SetStateAction<FileList>>
  image: FileList;
}

const useStyles = makeStyles((theme) => ({
  fileInputBtn: {
    color: alpha(color.offWhite, 0.65),
    marginRight: "20px",
    padding: "10px 30px",
    border: `1px solid ${alpha("#000", 0.25)}`,
  },
  fileInput: {
    display: "none",
  },
  text: {
    color: alpha(color.offWhite, 0.65),
    fontWeight: 300,
  },
}));

export default function Upload(props: Props) {
  const { setFieldValue, setSelectedImage, image } = props;
  const classes = useStyles();
  console.log("images in Upload component: ", image);

  //   const uploadImage = (files: FileList) => {
  //     const formData = new FormData()
  //     formData.append('file', files[0])
  //     formData.append('upload_preset', 'ubveh1ft')
  //     fetch('https://api.cloudinary.com/v1_1/duezerehu/image/upload', {
  //         method: 'POST',
  //         body: formData
  //     })
  //     .then((res) => console.log(res))
  // }

  return (
    <>
      <input
        type="file"
        multiple
        name="images[]"
        accept="images/*"
        id="raised-button-file"
        onChange={(event) => {setFieldValue("images", event.target.value)
      setSelectedImage(event.target.files);
      console.log('Values.images in Upload.tsx -> onChange:', image)
      }}
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
        {image.length > 0 ? image : "Upload Images"}
      </span>
    </>
  );
}
