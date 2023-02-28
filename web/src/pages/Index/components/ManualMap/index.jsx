import { Input } from "antd";
import { AwesomeButtonProgress } from "react-awesome-button";
import "./index.less";

const ManualMap = ({
  handleStart,
  handleRandom,
  mapData,
  setMapData,
  level,
}) => {
  return (
    <div className="manual-map-zone">
      <div className="tip-section">
        <p>
          <b>Tips: </b>
          <br />
          <i>WASD 方向；J 发射</i>
        </p>
      </div>
      <div className="map-section">
        <Input.TextArea
          value={mapData}
          onChange={(e) => setMapData(e.target.value)}
          autoSize={{
            minRows: 26,
            maxRows: 26,
          }}
          className="game-map-input"
        />
      </div>
      {level && (
        <div className="button-section">
          <AwesomeButtonProgress type="secondary" onPress={handleStart}>
            启动游戏
          </AwesomeButtonProgress>
          <AwesomeButtonProgress type="primary" onPress={handleRandom}>
            随机关卡
          </AwesomeButtonProgress>
        </div>
      )}
    </div>
  );
};

export default ManualMap;
