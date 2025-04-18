import React, { useState } from "react";
import NumberTiles from "./NumberTiles";
import KoreanTiles from "./KoreanTiles";
import { Grid } from "@mui/material";
import BasicMenu from "./Menu";
import { DndContext } from "@dnd-kit/core";
import sounds from "./assets/sounds/sounds";

function App() {
  //component data
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [matchedTileData, setMatchedTileData] = useState({});
  const wordsAndSymbols = React.useMemo(() => [
    { id: 1, word: "hana", symbol: "하나", sound: new Audio(sounds.hana) },
    { id: 2, word: "dul", symbol: "둘", sound: new Audio(sounds.dul) },
    { id: 3, word: "set", symbol: "셋", sound: new Audio(sounds.set) },
    { id: 4, word: "net", symbol: "넷", sound: new Audio(sounds.net) },
    { id: 5, word: "daseot", symbol: "다섯", sound: new Audio(sounds.daseot) },
    { id: 6, word: "yaseot", symbol: "여섯", sound: new Audio(sounds.yaseot) },
    { id: 7, word: "ilgop", symbol: "일곱", sound: new Audio(sounds.ilgop) },
    { id: 8, word: "yeodeol", symbol: "여덟", sound: new Audio(sounds.yeodeol) },
    { id: 9, word: "ahop", symbol: "아홉", sound: new Audio(sounds.ahop) },
    { id: 10, word: "yeol", symbol: "열", sound: new Audio(sounds.yeol) },
  ]);
  const soundEffects = React.useMemo(() => [
    { id: 1, sound: new Audio(sounds.correct1) },
    { id: 2, sound: new Audio(sounds.incorrect1) },
  ]);

  function handleClick(sound, word) {
    //console.log(`Tile "${word}" has been clicked!`);
    sound.currentTime= 0;
    sound.play();
  };
  function deleteTile(id) {
    const idNumber = id.replace(/[^0-9]/g, '');
    setNumbers(numbers.filter((number) => number != idNumber));
  };
  function handleOnDragEnd(event) {
    const draggedTileId = event.active.id.slice(-2);
    let droppedTileId;
    if (event.over !== null) {
      droppedTileId = event.over.id.slice(-2);
      if (draggedTileId === droppedTileId) {
        console.log(`Tile "${event.active.id}" has been dropped. Match Made!`);
        soundEffects[0].currentTime = 0;
        soundEffects[0].sound.play();
        //set matched NumberTile end position
        setMatchedTileData((prev) => ({
          ...prev,
          [event.active.id]: {
            x: event.delta.x,
            y: event.delta.y,
            isAnimating: true,
          } 
        }));
        //deleteTile function
        setTimeout(() => {
          deleteTile(event.active.id);
          }, 800);
        
        //trigger animation


      } else {
        console.log(`Tile "${event.active.id}" has been dropped. No Match.`);
        soundEffects.currentTime= 0;
        soundEffects[1].sound.play();
        //trigger animation
      }
    } else {
      droppedTileId = null;
    };
  };

  return (
    <>
      <Grid container spacing={2} alignItems={"center"}>
        <DndContext onDragEnd={handleOnDragEnd}>
          <Grid size={3}>
            <NumberTiles numbers={numbers} matchedTileData={matchedTileData} />
          </Grid>
          <Grid size={9}>
            <KoreanTiles wordsAndSymbols={wordsAndSymbols} handleClick={handleClick} />
          </Grid>
        </DndContext>
        <BasicMenu />
      </Grid>
    </>
  );

};

export default App