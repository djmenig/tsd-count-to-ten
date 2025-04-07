import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useDraggable } from '@dnd-kit/core';

function DraggableTile({ number }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `draggable-${number}`,
    });

    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        touchAction: 'none', // Prevents scrolling on touch devices while dragging
    };

    return (
        <Paper ref={setNodeRef} style={style} {...listeners} {...attributes} 
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
                </Paper>
    );
}


function NumberTiles({ numbers }) {
    return (    
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    justifyContent: "center",
                }}
            >
                {numbers.map((n) => (
                    <DraggableTile key={n} number={n}></DraggableTile>
                ))}
            </Box>
    );
}

export default NumberTiles;