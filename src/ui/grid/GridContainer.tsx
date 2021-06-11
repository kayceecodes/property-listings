import Grid, {
  GridContentAlignment,
  GridDirection,
  GridSpacing,
  GridWrap,
  GridJustification,
  GridItemsAlignment,
} from '@material-ui/core/Grid/Grid'
import { GridSize } from '@material-ui/core/Grid/Grid'

import React, { HtmlHTMLAttributes, ReactNode } from 'react'

interface Container {
  alignContent: GridContentAlignment
  alignItems: GridItemsAlignment
  direction: GridDirection
  justify: GridJustification
  spacing: GridSpacing
  wrap: GridWrap
  zeroMinWidth: boolean
  children: ReactNode[]
}

interface Item {
  xs: number
  sm: number
  md: number
  lg: number
}

interface Styles {
  height: string
  width: string
  margin: string | number
  padding: string | number
}

type Props = Item & Container & HtmlHTMLAttributes<any> & Styles

export default function ContainItems(props: Partial<Props>) {
  return (
    <Grid
      container
      alignContent={props.alignContent as GridContentAlignment}
      alignItems={props.alignItems as GridItemsAlignment}
      direction={props.direction as GridDirection}
      justify={props.justify as GridJustification}
      spacing={props.spacing as GridSpacing}
      wrap={props.wrap as GridWrap}
      style={{
        height: props.height,
        width: props.width,
        margin: props.margin,
        padding: props.padding,
      }}
    >
      {props.children?.map((item, index) => (
        <Grid
          key={index}
          item
          xs={props.xs as GridSize}
          sm={props.sm as GridSize}
          md={props.md as GridSize}
          lg={props.lg as GridSize}
          zeroMinWidth={props.zeroMinWidth ?? false}
        >
          {item}
        </Grid>
      ))}
    </Grid>
  )
}
