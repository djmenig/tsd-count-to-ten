import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useDroppable} from '@dnd-kit/core'

function DroppableTile({ number, symbol, word, onClick }) {
    const { setNodeRef, isOver, listeners } = useDroppable({
        id: `droppable-${number}`,
    });

    const [clicked, setClicked] = React.useState(false);

    const handleOnClick = () => {
        setClicked(true);
        if (onClick) {
            onClick();
        } setTimeout(() => {
            setClicked(false);
        }, 200);
    };

    const elevation = clicked ? 1 : 3;

    return (
        <Paper ref={setNodeRef} onClick={handleOnClick} elevation={elevation}
            sx={{
                minHeight: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100px",
                height: "100px",
                cursor: "pointer",
                border: isOver ? '1px solid #1976d2' : '1px gray',
            }}
        >
            <ruby style={{display: "inline-block", fontFamily: "Noto Sans KR", fontWeight: "bold", fontSize: "2rem", textAlign: "center"}}>{symbol}
                <rt style={{display: "block", fontWeight: "400", fontSize: "1rem", color: "gray", textAlign: "center"}}>({word})</rt>
            </ruby>
            <VolumeUpIcon sx={{ fontSize: ".75rem", color: "gray" }}/>
        </Paper>
    );
}

function KoreanTiles({wordsAndSymbols, handleClick}) {

    return (
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    placeItems: "center",
                }}
            >
                {wordsAndSymbols.map((n) => (
                    <DroppableTile key={n.id} number={n.id} symbol={n.symbol} word={n.word} onClick={() => {handleClick(n.sound, n.word)}} />
                ))}
            </Box>
    )
}

export default KoreanTiles;