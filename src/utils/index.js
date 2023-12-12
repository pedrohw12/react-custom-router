import React from "react";

export const parseQuery = (queryString) => {
  if (!queryString) {
    return {};
  }
  const query = {};
  const pairs = (
    queryString[0] === "?" ? queryString.substr(1) : queryString
  ).split("&");
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
};

export const renderQueryParams = (queryParams) => {
  return (
    <ul>
      {Object.entries(queryParams).map(([key, value]) => (
        <li key={key}>
          {key}: {value}
        </li>
      ))}
    </ul>
  );
};

export const matchPath = (pathPattern, pathName) => {
  const patternParts = pathPattern.split("/");
  const pathParts = pathName.split("/");
  const params = {};

  // Ensure the pattern and path have the same number of segments
  if (patternParts.length !== pathParts.length) {
    return null;
  }

  // Check if the current path matches the route's path
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      if (pathParts[i]) {
        params[patternParts[i].substring(1)] = pathParts[i];
      } else {
        return null; // Missing a dynamic segment in the current path
      }
    } else if (patternParts[i] !== pathParts[i]) {
      return null; // Static segment does not match
    }
  }

  return params;
};
