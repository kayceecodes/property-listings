import React, { CSSProperties, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Layout from "../src/hoc/Layout";
import { PageAnimations } from "../types/interfaces/animation";
import PageTransition from "../src/hoc/PageTransition";
import { redirect } from "next/dist/next-server/server/api-utils";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@material-ui/core";
import Container from "@mui/material/Container/Container";

interface Props {
  pageStyle?: CSSProperties;
  pageAnimations: PageAnimations;
}

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function HomePage(props: Props) {
  const classes = useStyles();
  const { pageAnimations } = props;
  const router = useRouter();

  useEffect(() => {
    router.push('/listings')
  });

  return (
    <Layout>
      <PageTransition pageAnimations={pageAnimations}>
        <div style={{ position: "relative", height: '100vh', width: '100%' }}>
          <div
            style={{
              position: "absolute",
              top: "35%",
              left: "45%",
              width: "120px",
              height: "100px",
              padding: "2%",
            }}
          >
            <CircularProgress color="secondary" thickness={5} size={50} />
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}
