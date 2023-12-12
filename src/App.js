import React from "react";
import { BrowserRouter, Route, RoutesWrapper } from "./router";
import { UserProfile } from "./pages/user-profile";
import { Settings } from "./pages/settings";
import Navigation from "./components/nav-bar";
import Home from "./pages/home";
import About from "./pages/about";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <RoutesWrapper>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/user/:id">
          <UserProfile />
        </Route>
        <Route path="/dashboard/settings">
          <Settings />
        </Route>
      </RoutesWrapper>
    </BrowserRouter>
  );
};

export default App;
