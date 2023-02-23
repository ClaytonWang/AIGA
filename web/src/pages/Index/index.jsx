import { useEffect } from "react";
import game from "@/utils/game";
import "./index.less";

export default function HomePage() {
  useEffect(() => {
    window.setTimeout(() => {
      game.init();
    }, 100);
  }, []);
  return (
    <div className="game-wrapper">
      <div className="game-world">
        <div id="GameDiv">
          <div id="Cocos3dGameContainer">
            <canvas id="GameCanvas"></canvas>
          </div>
        </div>
      </div>
      <div className="game-config"></div>
    </div>
  );
}
