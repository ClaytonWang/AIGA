import { useEffect } from "react";
import { Input } from "antd";
import game from "@/utils/game";
import { AwesomeButton } from "react-awesome-button";
import "./index.less";
import "react-awesome-button/dist/styles.css";

export default function HomePage() {
  useEffect(() => {
    window.setTimeout(() => {
      game.init();
    }, 100);
  }, []);
  return (
    <div className="game-wrapper">
      <div className="game-world game-section">
        <div id="GameDiv">
          <div id="Cocos3dGameContainer">
            <canvas id="GameCanvas"></canvas>
          </div>
        </div>
      </div>
      <div className="game-config game-section">
        <div className="config-zone">
          <div className="tip-section">
            <p>
              <b>Tips: </b>
              <br />
              <i>WASD 方向；J 发射</i>
            </p>
          </div>
          <div className="map-section">
            <Input.TextArea
              autoSize={{
                minRows: 26,
                maxRows: 26,
              }}
              className="game-map-input"
            />
          </div>
          <div className="button-section">
            <AwesomeButton className="game-button" type="secondary">
              启动游戏
            </AwesomeButton>
          </div>
        </div>
      </div>
    </div>
  );
}
