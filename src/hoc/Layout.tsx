import React, { CSSProperties, ReactNode } from "react";
import Header from "../header/Header";
import { makeStyles, Theme } from "@material-ui/core/styles";
import PageTransition from "./PageTransition";
import { PageAnimations } from "../../types/interfaces/animation";

interface Props {
  children: ReactNode[];

  revealHeader?: boolean;
  bgColor?: string;
  height?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: "relative",
  },
}));

export default function Layout(props: Props) {
  const classes = useStyles();
  const { bgColor, height, children } = props;

  return (
    <div
      style={{ backgroundColor: bgColor, height: height }}
      className={classes.container}
    >
        <Header />
        {children}
    </div>
  );
}
