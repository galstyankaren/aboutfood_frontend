import React, { Component } from "react";
import styled from "styled-components";

export default class ListFoodInventory extends Component {
  render() {
    return <Root />;
  }
}

const Root = styled.div({
  backgroundColor: "rgba(255,120,90,1)",
  borderRadius: 9,
  display: "flex",
  flex: "1 1 0%",
  flexDirection: "column",
  height: "100vh",
  width: "100vw"
});
