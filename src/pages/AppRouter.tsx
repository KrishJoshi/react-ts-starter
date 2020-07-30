import { Container, Page } from "../common/components/Wrapper";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CreatePage, EditPage } from "./user";
import Home from "./home";
import React from "react";

export default () => (
  <Container>
    <Page>
      <Router>
        <Switch>
          <Route path="/users/create">
            <CreatePage />
          </Route>
          <Route path="/users/:id">
            <EditPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Page>
  </Container>
);
