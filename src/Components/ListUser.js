import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Card, Space, Avatar } from "antd";
import { Link } from "react-router-dom";

const deleteHandler = (id) => {
  var myHeaders = new Headers();
  const token = localStorage.getItem("access_token");

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

  fetch("http://202.131.117.92:7100/admin/api/deleteUser", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      // console.log(result)
      alert("user delete succesfully", result);
    })
    .catch((error) => console.log("error", error));
};

const ListUser = () => {
  const [userData, setUserData] = useState([]);

  var myHeaders = new Headers();
  const token = localStorage.getItem("access_token");
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    draw: 1,
    columns: [
      {
        data: "image",
        name: "",
        searchable: false,
        orderable: false,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "name",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
    ],
    order: [
      {
        column: 1,
        dir: "desc",
      },
    ],
    start: 0,
    length: 15,
    search: {
      value: "",
      regex: false,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const columns = [
    {
      title: "photo",
      dataIndex: "profilePicture",
      render: (row) => (
        <Avatar icon={<img src={row} alt="" height="150px" width="150px" />} />
      ),
      key: "photo",
    },

    {
      title: "firstname",
      dataIndex: "firstName",
      key: "firstname",
    },
    {
      title: "lastname",
      dataIndex: "lastName",
      key: "lastname",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phoneNumber",
      key: "phone",
    },
    {
      title: "birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/user/view/${record._id}`}>view</Link>
          <Link to={`/user/edit/${record._id}`}>edit</Link>
          {/* <Link to={`/user/delete/${record._id}`}>delete</Link> */}
          <button onClick={(e) => deleteHandler(record._id)}>delete</button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    fetch("http://202.131.117.92:7100/admin/api/getUserList", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.data);
        setUserData(result.data.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <Card>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Table
            style={{ width: "800px", height: "800px" }}
            rowKey="id"
            columns={columns}
            dataSource={userData}
            pagination={true}
          ></Table>
        </div>
      </Card>
    </>
  );
};

export default ListUser;
