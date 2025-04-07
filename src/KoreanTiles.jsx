import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import hana from './assets/sounds/hana.mp3';
import dul from './assets/sounds/dul.mp3';
import set from './assets/sounds/set.mp3';
import net from './assets/sounds/net.mp3';
import daseot from './assets/sounds/daseot.mp3';
import yaseot from './assets/sounds/yaseot.mp3';
import ilgop from './assets/sounds/ilgop.mp3';
import yeodeol from './assets/sounds/yeodeol.mp3';
import ahop from './assets/sounds/ahop.mp3';
import yeol from './assets/sounds/yeol.mp3';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useDroppable} from '@dnd-kit/core'

function DroppableTile({ number, symbol, word, onClick }) {
    const { setNodeRef, isOver, listeners } = useDroppable({
        id: `droppable-${number}`,
    });

    return (
        <Paper ref={setNodeRef} onClick={onClick}
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

function KoreanTiles() {
    const wordsAndSymbols = React.useMemo(() => [
        { id: 1, word: "hana", symbol: "하나", sound: new Audio(hana) },
        { id: 2, word: "dul", symbol: "둘", sound: new Audio(dul) },
        { id: 3, word: "set", symbol: "셋", sound: new Audio(set) },
        { id: 4, word: "net", symbol: "넷", sound: new Audio(net) },
        { id: 5, word: "daseot", symbol: "다섯", sound: new Audio(daseot) },
        { id: 6, word: "yaseot", symbol: "여섯", sound: new Audio(yaseot) },
        { id: 7, word: "ilgop", symbol: "일곱", sound: new Audio(ilgop) },
        { id: 8, word: "yeodeol", symbol: "여덟", sound: new Audio(yeodeol) },
        { id: 9, word: "ahop", symbol: "아홉", sound: new Audio(ahop) },
        { id: 10, word: "yeol", symbol: "열", sound: new Audio(yeol) },
    ]);

    function handleClick(sound, id) {
        console.log(`Tile ${id} has been clicked!`);
        sound.currentTime= 0;
        sound.play();
    }

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
                    <DroppableTile key={n.id} number={n.id} symbol={n.symbol} word={n.word} onClick={() => {handleClick(n.sound, n.id)}} />
                ))}
            </Box>
    )
}

export default KoreanTiles;