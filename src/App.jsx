import React, { useState } from "react";
import NumberTiles from "./NumberTiles";
import KoreanTiles from "./KoreanTiles";
import { Grid, Modal } from "@mui/material";
import BasicMenu from "./Menu";
import { DndContext } from "@dnd-kit/core";
import sounds from "./assets/sounds/sounds";
import AlertDialogSlide from "./AlertDialogSlide";
import Paper from "@mui/material/Paper";
import ConfettiParticles from "./ConfettiParticles";
import Button from '@mui/material/Button';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [matchedTileData, setMatchedTileData] = useState({});
  const wordsAndSymbolsOrigin = React.useMemo(() => [
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
  const [wordsAndSymbols, setWordsAndSymbols] = useState(wordsAndSymbolsOrigin);
  const soundEffects = React.useMemo(() => [
    { id: 1, sound: new Audio(sounds.correct1) },
    { id: 2, sound: new Audio(sounds.incorrect1) },
  ]);

  function sortWordsAndSymbols() {
    setWordsAndSymbols([...wordsAndSymbols].sort(() => Math.random() - 0.5));
    console.log("clicked");
  }
  console.log(wordsAndSymbols);
  
  function handleClick(sound, word) {
    sound.currentTime= 0;
    sound.play();
  };
  function deleteTile(id) {
    const idNumber = id.replace(/[^0-9]/g, '');
    setNumbers(numbers.filter((number) => number != idNumber));
    numbers.length < 2 && setGameOver(true);
  };
  function resetNoMatch(id) {
    const stringId = String(id);
    setMatchedTileData((prev) => ({
      ...prev,
      [id]: {
        noMatch: false,
      }
    }));
  };
  function gameReset() {
    console.log("gameReset Triggered");
    setGameOver(false);
    setNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    setWordsAndSymbols(wordsAndSymbolsOrigin);
    setMatchedTileData({});
  };

  function handleOnDragEnd(event) {
    const draggedTileId = event.active.id.slice(-2);
    let droppedTileId;
    if (event.over !== null) {
      droppedTileId = event.over.id.slice(-2);
      if (draggedTileId === droppedTileId) {
        soundEffects[0].sound.currentTime = 0;
        soundEffects[0].sound.play();
        setMatchedTileData((prev) => ({
          ...prev,
          [event.active.id]: {
            x: event.delta.x,
            y: event.delta.y,
            isAnimating: true,
          } 
        }));
        setTimeout(() => {
          deleteTile(event.active.id);
          }, 1000);

      } else {
        soundEffects[1].sound.currentTime = 0;
        soundEffects[1].sound.play();
        setMatchedTileData((prev) => ({
          ...prev,
          [event.active.id]: {
            noMatch: true,
          }
        }));
        setTimeout(() => {
          resetNoMatch(event.active.id);
        }, 1000);
      }
    } else {
      droppedTileId = null;
    };
  };

  return (
    <>
      <Paper elevation='5' id="gameBoard">

        <BasicMenu />

        <DndContext onDragEnd={handleOnDragEnd}>

          <div className="mainContentContainer">
            <NumberTiles numbers={numbers} matchedTileData={matchedTileData} />

            <div className="rightSideOfGameboardContainer">
              <div className="buttonContainer">
                <Button variant="contained" sx={{width: "100px"}} onClick={sortWordsAndSymbols}>SHUFFLE</Button>
                <Button variant="contained" sx={{width: "100px"}} onClick={gameReset} color="error">RESET</Button>
              </div>
              
              <KoreanTiles wordsAndSymbols={wordsAndSymbols} handleClick={handleClick} />
            </div>

           </div>

        </DndContext>

        <ConfettiParticles gameOver={gameOver} />

      </Paper>

      <AlertDialogSlide gameOver={gameOver} gameReset={gameReset} />
    </>
  );

};

export default App