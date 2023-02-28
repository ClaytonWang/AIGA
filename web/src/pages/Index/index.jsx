import { useCallback, useEffect, useMemo, useState } from "react";
import game from "@/utils/game";

import "./index.less";
import { ManualMap } from "./components";
import "react-awesome-button/dist/styles.css";

export default function HomePage() {
  const [level, setLevel] = useState();
  const [mapData, setMapData] = useState("");

  useMemo(() => {
    if (level) {
      game.getMapDataByLevel(level).then((map) => {
        setMapData(game.decodeMap(map));
      });
    } else {
      setMapData("");
    }
  }, [level]);
  useMemo(() => {
    if (mapData) {
      game.load({
        level,
        map: game.encodeMap(mapData),
      });
    }
  }, [level, mapData]);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      game.init().then(() => {
        setLevel(game.random());
      });
      return () => window.clearTimeout(timer);
    }, 100);
  }, []);

  const handleStart = useCallback(
    (element, next) => {
      if (level && mapData) {
        game.start({
          level,
          map: game.encodeMap(mapData),
        });
        document.getElementById("GameCanvas").focus();
      }
      next();
    },
    [level, mapData]
  );
  const handleRandom = useCallback(
    (element, next) => {
      let nextLevel = game.random();
      while (nextLevel === level) {
        nextLevel = game.random();
      }
      setLevel(nextLevel);
      next();
    },
    [level]
  );

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
          <ManualMap
            handleStart={handleStart}
            handleRandom={handleRandom}
            setMapData={setMapData}
            mapData={mapData}
            level={level}
          />
        </div>
      </div>
    </div>
  );
}
