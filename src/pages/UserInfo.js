import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

import ListUser from "../Components/ListUser";
import classes from "./UserInfo.module.css";

const UserInfo = () => {
  const history = useHistory();

  const logOutHandler = () => {
    localStorage.removeItem("access_token");
    localStorage.clear();
    history.push("/");
  };

  return (
    <>
      <div className={classes.main}>
        <h1 className={classes.h1}>User Management</h1>
        <Button type="primary" onClick={logOutHandler} className={classes.btn}>
          Log Out
        </Button>
      </div>
      <ListUser />
    </>
  );
};

export default UserInfo;
