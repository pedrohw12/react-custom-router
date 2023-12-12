export const createHistory = () => {
  let listeners = [];
  let historyStack = []; // Array to keep track of history entries
  let currentIdx = -1; // Current index in the history stack

  let location = {
    pathname: window.location.pathname,
    state: window.history.state,
  };

  const updateLocation = (pathname, state) => {
    location = { pathname, state };
  };

  const notifyListeners = () => {
    updateLocation(window.location.pathname, window.history.state);
    listeners.forEach((listener) => listener(location));
  };

  window.addEventListener("popstate", notifyListeners);

  const push = (pathname, state = {}, customState = {}) => {
    window.history.pushState(
      { ...state, _customState: customState },
      "",
      pathname
    );
    historyStack = historyStack.slice(0, currentIdx + 1); // Remove future entries
    historyStack.push({
      pathname,
      state: { ...state, _customState: customState },
    });
    currentIdx++;
    notifyListeners();
  };

  const replace = (pathname, state = {}, customState = {}) => {
    window.history.replaceState(
      { ...state, _customState: customState },
      "",
      pathname
    );
    historyStack[currentIdx] = {
      pathname,
      state: { ...state, _customState: customState },
    };
    notifyListeners();
  };

  const go = (n) => {
    window.history.go(n);
  };

  const goBack = () => go(-1);
  const goForward = () => go(1);

  const listen = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // Methods to inspect and manipulate the history stack
  const getStack = () => [...historyStack];
  const getCurrentIndex = () => currentIdx;

  return {
    push,
    replace,
    listen,
    location,
    go,
    goBack,
    goForward,
    getStack,
    getCurrentIndex,
  };
};

const history = createHistory();
export default history;
