import React, { useState, useEffect, useContext } from "react";
import { matchPath, parseQuery } from "../utils";
import history from "../utils/history";

export const RouterContext = React.createContext();

export const BrowserRouter = ({ children }) => {
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    const unlisten = history.listen((newLocation) => {
      setLocation(newLocation);
    });
    return unlisten; // Cleanup the listener when the component unmounts
  }, []);

  const queryParams = location?.search ? parseQuery(location.search) : {};

  return (
    <RouterContext.Provider value={{ location, query: queryParams, history }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Route = ({ path, children }) => {
  const { location, query } = React.useContext(RouterContext);
  const currentPath = location?.pathname;
  const preservedState = location?.state?._customState; // Extract the preserved state

  const params = matchPath(path, currentPath);

  return params
    ? React.cloneElement(children, { params, query, ...preservedState })
    : null;
};

export const RoutesWrapper = ({ children }) => {
  const { location } = React.useContext(RouterContext);
  const currentPath = location.pathname;
  let routeMatched = false;

  const modifiedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || routeMatched) {
      return null;
    }

    const path = child.props.path;
    const match = matchPath(path, currentPath); // Assuming matchPath is your path matching logic
    if (match) {
      routeMatched = true;
      return React.cloneElement(child, { ...child.props, params: match });
    }

    return null;
  });

  return routeMatched ? modifiedChildren : <h1>NOT FOUND</h1>;
};

export const Link = ({ to, children }) => {
  const { history } = useContext(RouterContext);

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        history.push(to);
        // window.location.href = to;
      }}
    >
      {children}
    </a>
  );
};
