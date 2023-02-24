import _ from "lodash";

let execed = false;
let inited = false;
const init = () => {
  if (!execed) {
    execed = true;
    return new Promise((resolve, reject) => {
      window.addEventListener("GAMEWORLD_INIT", () => {
        inited = true;
        Object.assign(game, window.__gameworld__ || {});
        resolve(inited);
      });
      window?.System.import("./index.js").catch(function (err) {
        console.error(err);
        reject(err);
      });
    });
  }
  return Promise.resolve(inited);
};

const random = () => {
  return _.random(1, 36);
};

// 格式化map数据,for game
const encodeMap = (mapData) => {
  // 0. 预处理数据
  const mapStr = (() => {
    return _.replace(
      _.isArray(mapData) ? mapData.join("") : _.toString(mapData),
      /\s+/g,
      ""
    );
  })();
  // 1.填充
  return _.padStart(mapStr, 26 * 26, "0");
};

// 格式化map数据,for display
const decodeMap = (mapStr) => {
  // 0. 预处理数据
  const data = _.replace(mapStr, /\s+/g, "");
  // 1. 26*26空地图
  const standard = (() => {
    return _.map(new Array(26).fill(1), () => _.padStart("", 26, "0"));
  })();
  // 2. 根据data填充地图
  for (let i = 0; i * 26 < data.length; i++) {
    const str = _.padStart(data.slice(i * 26, (i + 1) * 26), 26, "0");
    standard[i] = str;
  }
  return standard.join("\n");
};

const game = (() => {
  return {
    init,
    random,
    decodeMap,
    encodeMap,
  };
})();

export default game;
