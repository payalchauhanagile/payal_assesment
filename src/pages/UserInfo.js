import { Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

import ListUser from "../Components/ListUser";

const UserInfo = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <h1 style={{ marginLeft: "40px" }}>User Management</h1>
        <Button type="primary" style={{ marginLeft: "70%", marginTop: "10px" }}>
          <NavLink to="/">Log Out</NavLink>
        </Button>
      </div>
      <ListUser />
    </>
  );
};

export default UserInfo;
