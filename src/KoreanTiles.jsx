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

function KoreanTiles() {
    const wordsAndSymbols = [
        { id: 1, word: "hana", symbol: "하나", sound: hana },
        { id: 2, word: "dul", symbol: "둘", sound: dul },
        { id: 3, word: "set", symbol: "셋", sound: set },
        { id: 4, word: "net", symbol: "넷", sound: net },
        { id: 5, word: "daseot", symbol: "다섯", sound: daseot },
        { id: 6, word: "yaseot", symbol: "여섯", sound: yaseot },
        { id: 7, word: "ilgop", symbol: "일곱", sound: ilgop },
        { id: 8, word: "yeodeol", symbol: "여덟", sound: yeodeol },
        { id: 9, word: "ahop", symbol: "아홉", sound: ahop },
        { id: 10, word: "yeol", symbol: "열", sound: yeol }
    ];

    function handleClick(sound) {
        console.log("Tile has been clicked!");
        const audio = new Audio(sound);
        audio.play();
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
                <Paper onClick={() => {handleClick(n.sound)}}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100px",
                        height: "100px",
                    }}
                >
                    <ruby style={{display: "inline-block", fontWeight: "bold", fontSize: "2rem", textAlign: "center"}}>{n.symbol}
                        <rt style={{display: "block", fontWeight: "400", fontSize: "1rem", color: "gray", textAlign: "center"}}>({n.word})</rt>
                    </ruby>
                </Paper>
            ))}
        </Box>
    )
}

export default KoreanTiles;