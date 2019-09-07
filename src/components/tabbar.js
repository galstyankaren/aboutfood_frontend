import React from "react";
import {
  Link,
  Toolbar
} from "framework7-react";

export default class Tabbar extends React.Component {
  render() {
    return (
      <Toolbar tabbar labels position="bottom">
        <Link
          tabLink="#tab-1"
          tabLinkActive
          iconF7="f7:email_fill"
        ></Link>
        <Link
          tabLink="#tab-2"
          iconF7="f7:calendar_fill"
        ></Link>
        <Link
          tabLink="#tab-3"
          iconF7="f7:cloud_upload_fill"
        ></Link>
      </Toolbar >
    );
  }
}
