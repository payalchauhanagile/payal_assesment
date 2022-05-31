import React, { useState } from "react";
import { Button, Card, Space } from "antd";
import { useParams, NavLink } from "react-router-dom";

const UserStatus = () => {
  const [isActive, setIsActive] = useState(false);
  const { id } = useParams();
  console.log(id);

  const token = localStorage.getItem("access_token");

  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("userId", id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const statusHandler = () => {
    fetch(
      "http://202.131.117.92:7100/admin/api/changedUserStatus",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setIsActive((prev) => !prev);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Card style={{ margin: "250px 550px", height: "220px", width: "300px" }}>
      <h2 style={{ textAlign: "center" }}>Are you sure?</h2>
      {isActive ? (
        <h1 style={{ alignText: "center" }}> Activate user</h1>
      ) : (
        <h1 style={{ alignText: "center" }}> In-Activate User</h1>
      )}

      <div>
        <Space size="middle">
          <Button type="primary">
            <NavLink to="/user">Back</NavLink>
          </Button>
          <Button type="primary" onClick={statusHandler}>
            {isActive === true ? <p>In-Active</p> : <p>Active</p>}
          </Button>
          <br />
        </Space>
        <br />
        <br />
        <div style={{ margin: "0 0 0 80px" }}></div>
      </div>
    </Card>
  );
};

export default UserStatus;
