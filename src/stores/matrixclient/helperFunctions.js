function fiveSecTimeout(func) {
  setTimeout(() => {
    func;
  }, 5000);
}

function tenSecTimeout(func) {
  setTimeout(() => {
    func;
  }, 10000);
}

export { fiveSecTimeout, tenSecTimeout };
