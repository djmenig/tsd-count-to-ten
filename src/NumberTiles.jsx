import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useDraggable } from '@dnd-kit/core';
import { motion, AnimatePresence, color } from 'framer-motion';
import { duration } from '@mui/material';

//pass the MUI Paper component to the motion.create() function to create a motion component version of Paper
const MotionPaper = motion.create(Paper);

function DraggableTile({ number, matchedTileData }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `draggable-${number}`,
    });

    const isMatched = matchedTileData[`draggable-${number}`];
    const isAnimating = matchedTileData[`draggable-${number}`]?.isAnimating;
    const noMatch = matchedTileData[`draggable-${number}`]?.noMatch;
    // console.log("No Match:", noMatch);
    const style = {
        transform: isMatched
            ? `translate(${matchedTileData[`draggable-${number}`].x}px, ${matchedTileData[`draggable-${number}`].y} )` 
            : transform ? `translate(${transform.x}px, ${transform.y}px)` 
            : undefined,
        touchAction: 'none', // Prevents scrolling on touch devices while dragging
    };

    

    return (
        <MotionPaper 
            ref={setNodeRef}
            style={style}
            {...(!isAnimating ? listeners : {})} 
            {...(!isAnimating ? attributes : {})} 
            initial= {{ x: 0, y:0, opacity: 1, scale: 1, rotate: 0}}
            animate={{ 
                x: isAnimating ? matchedTileData[`draggable-${number}`].x : transform?.x,
                y: isAnimating ? matchedTileData[`draggable-${number}`].y : transform?.y,
                opacity: isAnimating ? 0 : 1,
                scale: isAnimating ? [1, 2, 0.5] : 1,
                border: noMatch ? ["none", "2px solid #ed1a3b", "none"] : null,
                rotate: isAnimating ? 720 : noMatch ? [0, 5, -5, 5, -5, 5, -5, 5, -5, 5, -5, 5, -5, 0] : 0,
                transition: isAnimating || noMatch ? { duration: 1, opacity: {duration: 0.5, delay: 0.5,} } : {duration: 0},
            }}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "48px",
                height: "48px",
                cursor: "grab",
            }}
        >
            <span style={{fontWeight: "500", fontSize: "1.5rem", textAlign: "center"}}>{number}</span>
        </MotionPaper>
    );
}


function NumberTiles({ numbers, matchedTileData }) {
    return (    
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    justifyContent: "center",
                }}
            >
                <AnimatePresence>
                {numbers.map((n) => (
                    <DraggableTile key={n} number={n} matchedTileData={matchedTileData}></DraggableTile>
                ))}</AnimatePresence>
            </Box>
    );
}

export default NumberTiles;