import React, { Component } from "react";

import FridgeView from "./components/FridgeView";

export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ show: !this.state.show });
  }
  render() {
    return (
      <div>
        <FridgeView></FridgeView>
      </div>
    );
  }
}
