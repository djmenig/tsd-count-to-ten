import React from "react";
import NumberTiles from "./NumberTiles";
import KoreanTiles from "./KoreanTiles";
import { Grid } from "@mui/material";
import BasicMenu from "./Menu";
import { DndContext } from "@dnd-kit/core";

function App() {

  return (
    <>
      <Grid container spacing={2} alignItems={"center"}>
        <DndContext>
          <Grid size={3}>
            <NumberTiles />
          </Grid>
          <Grid size={9}>
            <KoreanTiles />
          </Grid>
        </DndContext>
        <BasicMenu />
      </Grid>
    </>
  )
}

export default App