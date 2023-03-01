import _ from "lodash";
import { Stage, Sprite } from "@inlet/react-pixi";

const Map = ({ data }) => {
  const spriteSize = 8;
  const [row, col] = [26, 26];
  const [width, height] = [row * spriteSize, col * spriteSize];
  return (
    <Stage width={width} height={height}>
      {_.map(data, (key, index) => {
        if (key >= 1 && key <= 5) {
          const position = [
            (index % 26) * spriteSize,
            Math.floor(index / 26) * spriteSize,
          ];
          return (
            <Sprite
              key={index}
              width={spriteSize}
              height={spriteSize}
              image={`./image/tank/${key}.png`}
              position={position}
            />
          );
        }
        return null;
      })}
    </Stage>
  );
};

export default Map;
