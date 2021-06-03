import React, { useRef, useEffect, useState, CSSProperties } from "react";

import { Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Link from "next/link";
import GridContainer from "../src/ui/grid/GridContainer";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import MenuList from "@material-ui/core/MenuList/MenuList";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import PageTransition from "../src/hoc/PageTransition";
import { PageAnimations } from "../types/interfaces/animation";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

interface Props {
  pageStyle?: CSSProperties;
  pageAnimations: PageAnimations;
}

const useStyles = makeStyles((theme: Theme) => ({
  mapContainer: {
    height: "400px",
  },
  sidebar: {
    backgroundColor: "rgba(135, 155, 175, 0.9)",
    color: "#ffffff",
    padding: "6px 12px",
    fontFamily: "monospace",
    zIndex: 1,
    position: "absolute",
    left: 0,
    margin: "12px",
    borderRadius: "4px",
  },
}));

export default function ListingsPage(props: Props) {
  const { pageAnimations } = props;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const classes = useStyles();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, [map, lng, lat]);

  return (
    <div>
      <div className={classes.sidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className={classes.mapContainer} />
    </div>
    // <PageTransition pageAnimations={pageAnimations}>
    //   <></>
    // </PageTransition>
  );
}
