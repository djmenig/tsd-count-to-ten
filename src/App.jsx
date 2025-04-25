import React, { useState } from "react";
import NumberTiles from "./NumberTiles";
import KoreanTiles from "./KoreanTiles";
import { Grid, Modal } from "@mui/material";
import BasicMenu from "./Menu";
import { DndContext } from "@dnd-kit/core";
import sounds from "./assets/sounds/sounds";
import Particles from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import AlertDialogSlide from "./AlertDialogSlide";
import Paper from "@mui/material/Paper";

function App() {
  const [gameOver, setGameOver] = useState(false);
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
    console.log(`Numbers from deleteTile function: ${numbers}`);
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

  function handleOnDragEnd(event) {
    const draggedTileId = event.active.id.slice(-2);
    let droppedTileId;
    if (event.over !== null) {
      droppedTileId = event.over.id.slice(-2);
      if (draggedTileId === droppedTileId) {
        console.log(`Tile "${event.active.id}" has been dropped. Match Made!`);
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
        console.log(`Tile "${event.active.id}" has been dropped. No Match.`);
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
  
  const particlesInit = async () => {
    await loadConfettiPreset(tsParticles);

    await tsParticles.load({
      options: {
        emitters: [
          {
            life: {
              duration: 5,
              count: 0,
              delay: .5,
            },
            position: {
              // x: 0,
              // y: 30,
            },
            particles: {
              move: {
                direction: "top-right",
              },
            },
          },
          {
            life: {
              duration: 5,
              count: 0,
              delay: 1,
            },
            position: {
              // x: 100,
              // y: 30,
            },
            particles: {
              move: {
                direction: "top-left",
              },
            },
          },
          {
            life: {
              duration: 5,
              count: 0,
              delay: 2,
            },
            position: {
              // x: 0,
              // y: 30,
            },
            particles: {
              move: {
                direction: "top-right",
              },
            },
          },
          {
            life: {
              duration: 0,
              count: 0,
            },
            position: {
              // x: 0,
              // y: 30,
            },
            particles: {
              move: {
                direction: "top-left",
              },
            },
          },
        ],
        preset: "confetti",
      }      
    });
  };

  return (
    <>
      <Paper id="gameBoard">
        <BasicMenu />
        <Grid container spacing={2} alignItems={"center"}>
          <DndContext onDragEnd={handleOnDragEnd}>
            <Grid size={3}>
              <NumberTiles numbers={numbers} matchedTileData={matchedTileData} />
            </Grid>
            <Grid size={9}>
              <KoreanTiles wordsAndSymbols={wordsAndSymbols} handleClick={handleClick} />
            </Grid>
          </DndContext>
        </Grid>
      </Paper>
      { gameOver && <Particles id="tsparticles" particlesLoaded={particlesInit} /> }
      <AlertDialogSlide gameOver={gameOver} />
    </>
  );

};

export default App