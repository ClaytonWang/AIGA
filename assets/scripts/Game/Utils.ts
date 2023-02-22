// @ts-nocheck

// 将给定数字调整为8的倍数
export function adjustNumber(number: number) {
  return Math.round(number / 8) * 8;
}

export function world(_game) {
  const _mapLayer = _game.mapLayer;
  const pause = () => {
    cc.game.pause();
  };
  const resume = () => {
    cc.game.resume();
  };
  const start = (level = 1) => {
    _game.level = level;
    _game.gameStart();
  };

  window.__gameworld__ = {
    _game,
    pause,
    resume,
    start,
  };
}
