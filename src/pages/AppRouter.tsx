import { Container, Page } from "../common/components/Wrapper";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "./user";
import Home from "./home";
import React from "react";

export default () => (
  <Container>
    <Page>
      <Router>
        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Page>
  </Container>
);
