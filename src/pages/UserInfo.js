import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

import ListUser from "../Components/ListUser";

const UserInfo = () => {
  const history = useHistory();

  const logOutHandler = () => {
    localStorage.removeItem("access_token");
    localStorage.clear();
    history.push("/");
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <h1 style={{ marginLeft: "40px" }}>User Management</h1>
        <Button
          type="primary"
          style={{ marginLeft: "70%", marginTop: "10px" }}
          onClick={logOutHandler}
        >
          Log Out
        </Button>
      </div>
      <ListUser />
    </>
  );
};

export default UserInfo;
