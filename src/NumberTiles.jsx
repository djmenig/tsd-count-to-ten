import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities'

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
                    }}
                >
                    <span style={{fontWeight: "500", fontSize: "1.5rem", textAlign: "center"}}>{number}</span>
                </Paper>
    );
}


function NumberTiles() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (    
        <DndContext>
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
        </DndContext>
    )
}

export default NumberTiles;