import "./App.css";
import React, { Component } from "react";
import FridgeView from './components/FridgeView';
import TabBar from './components/TabBar';
import { App as Cats, View } from 'framework7-react';


const f7Params = {
  theme: 'ios',
  popup: {
    closeOnEscape: true,
  },
  sheet: {
    closeOnEscape: true,
  },
  popover: {
    closeOnEscape: true,
  },
  actions: {
    closeOnEscape: true,
  },
};
export default class App extends Component {

  render() {
    return (
      <Cats param={f7Params}>
        <View main>
          <FridgeView></FridgeView>
          <TabBar></TabBar>
        </View>
      </Cats>
    );
  }
}
