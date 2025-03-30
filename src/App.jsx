import React from "react";
import NumberTiles from "./NumberTiles";
import KoreanTiles from "./KoreanTiles";
import { Grid } from "@mui/material";
import BasicMenu from "./Menu";

function App() {

  return (
    <>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid size={3}>
          <NumberTiles />
        </Grid>
        
        <Grid size={9}>
          <BasicMenu />
          <KoreanTiles />
        </Grid>
      </Grid>
    </>
  )
}

export default App