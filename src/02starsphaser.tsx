import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const Game: React.FC = () => {
  const gameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gameRef.current) {
      // Create a new Phaser game instance
      const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameRef.current, // Attach the game to this div
        scene: {
          preload: preload,
          create: create,
          update: update,
        },
      });

      // Phaser scene functions
      function preload() {
        this.load.image(
          "sky",
          "https://labs.phaser.io/assets/skies/space3.png"
        );
        this.load.image(
          "star",
          "https://labs.phaser.io/assets/sprites/star.png"
        );
      }

      function create() {
        this.add.image(400, 300, "sky");
        this.add.sprite(400, 300, "star");
      }

      function update() {
        // Game update logic goes here
      }

      // Cleanup on component unmount
      return () => {
        game.destroy(true);
      };
    }
  }, []);

  return <div ref={gameRef} />;
};

export default Game;
