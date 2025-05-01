// "use client"; // クライアントサイドで動作

import { useEffect, useRef } from "react";
import Phaser from "phaser";

export default function Home() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && gameRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameRef.current,
        scene: {
          preload: function () {
            // アセット読み込み
            this.load.image("player", "/src/assets/player.png");
          },
          create: function () {
            // スプライトを追加
            const player = this.add.sprite(400, 300, "player").setScale(0.5);
            // キーボード入力
            this.input.keyboard?.on("keydown-LEFT", () => {
              player.x -= 5;
            });
            this.input.keyboard?.on("keydown-RIGHT", () => {
              player.x += 5;
            });
            this.input.keyboard?.on("keydown-UP", () => {
              player.y -= 5;
            });
            this.input.keyboard?.on("keydown-DOWN", () => {
              player.y += 5;
            });
          },
        },
      };

      const game = new Phaser.Game(config);

      // クリーンアップ
      return () => {
        game.destroy(true);
      };
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-4">My Phaser Game</h1>
      <div ref={gameRef} className="border-4 border-white" />
    </main>
  );
}
