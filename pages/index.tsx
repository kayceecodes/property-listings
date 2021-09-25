import React, { CSSProperties, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Layout from "../src/hoc/Layout";
import { PageAnimations } from "../types/interfaces/animation";
import PageTransition from "../src/hoc/PageTransition";
import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";

interface Props {
  pageStyle?: CSSProperties;
  pageAnimations: PageAnimations;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: "relative",
    height: "100vh",
    width: "100%",
  },
  wrapper: {
    position: "absolute",
    top: "35%",
    left: "45%",
    width: "120px",
    height: "100px",
    padding: "2%",
  },
}));

export default function HomePage(props: Props) {
  const classes = useStyles();
  const { pageAnimations } = props;
  const router = useRouter();

  useEffect(() => {
    router.push("/listings");
  });

  return (
    <Layout>
      <PageTransition pageAnimations={pageAnimations}>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <CircularProgress color="secondary" thickness={5} size={50} />
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}
