// @ts-nocheck

// 将给定数字调整为8的倍数
export function adjustNumber(number: number) {
  return Math.round(number / 8) * 8;
}

export function world(_game) {
  const _mapLayer = _game.mapLayer;
  const _playerTank = _mapLayer.players.children[0];
  const pause = () => {
    cc.game.pause();
  };
  const resume = () => {
    cc.game.resume();
  };
  const load = (level = 1) => {
    _mapLayer.__reset();
    _game.level = level;
    _game._stage = "";
    _playerTank.active = false;

    _mapLayer._loadMap();
  };
  const start = (level = 1, { stage = "" } = {}) => {
    _mapLayer.__reset();
    _game.level = level;
    _game._stage = stage;
    _playerTank.active = true;

    _game.gameStart();
  };

  window.__gameworld__ = {
    _game,
    pause,
    resume,
    load,
    start,
  };
}
