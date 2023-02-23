let inited = false;
const init = () => {
  if (!inited) {
    inited = true;
    window?.System.import("./index.js").catch(function (err) {
      console.error(err);
    });
  }
};

const game = (() => {
  return {
    init,
  };
})();

export default game;
