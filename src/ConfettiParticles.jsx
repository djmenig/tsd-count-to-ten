import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// const particlesInit = async () => {
//     await loadConfettiPreset(tsParticles);

//     await tsParticles.load({
//       options: {
//         emitters: [
//           {
//             life: {
//               duration: 5,
//               count: 0,
//               delay: .5,
//             },
//             position: {
//               // x: 0,
//               // y: 30,
//             },
//             particles: {
//               move: {
//                 direction: "top-right",
//               },
//             },
//           },
//           {
//             life: {
//               duration: 5,
//               count: 0,
//               delay: 1,
//             },
//             position: {
//               // x: 100,
//               // y: 30,
//             },
//             particles: {
//               move: {
//                 direction: "top-left",
//               },
//             },
//           },
//           {
//             life: {
//               duration: 5,
//               count: 0,
//               delay: 2,
//             },
//             position: {
//               // x: 0,
//               // y: 30,
//             },
//             particles: {
//               move: {
//                 direction: "top-right",
//               },
//             },
//           },
//           {
//             life: {
//               duration: 0,
//               count: 0,
//             },
//             position: {
//               // x: 0,
//               // y: 30,
//             },
//             particles: {
//               move: {
//                 direction: "top-left",
//               },
//             },
//           },
//         ],
//         preset: "confetti",
//       }      
//     });
// };


function ConfettiParticles(props) {
  const [init, setInit] = useState(false);
  const [particlesOn, setParticlesOn] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadConfettiPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      emitters: [
        {
          life: {
            duration: 5,
            count: 0,
            delay: .5,
          },
          position: {
            x: 50,
            y: 0,
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
            x: 75,
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
            x: 25,
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
            x: 50,
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
    }),
    [],
  );

  if (props.gameOver && init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
    setParticlesOn(true);
  } else if (props.gameOver && setParticlesOn) {
    container.destory();
    setParticlesOn(false);
  };

  return <></>;
};

export default ConfettiParticles;