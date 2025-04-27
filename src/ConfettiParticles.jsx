import React, { useState } from "react";
import Particles from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

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

  function ConfettiParticles() {
    return (
        <Particles id="tsparticles" particlesLoaded={particlesInit} />
    );
  }

  export default ConfettiParticles;