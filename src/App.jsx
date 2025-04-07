import React from "react";
import NumberTiles from "./NumberTiles";
import KoreanTiles from "./KoreanTiles";
import { Grid } from "@mui/material";
import BasicMenu from "./Menu";
import { DndContext } from "@dnd-kit/core";

function App() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function handleOnDragClick() {
    console.log("Tile has been dropped.");
  }

  return (
    <>
      <Grid container spacing={2} alignItems={"center"}>
        <DndContext onDragEnd={handleOnDragClick}>
          <Grid size={3}>
            <NumberTiles numbers={numbers} />
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