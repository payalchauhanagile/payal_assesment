import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Card, Space, Avatar, Button } from "antd";
import Search from "antd/lib/input/Search";
import { Link } from "react-router-dom";
import {
  EyeOutlined,
  EditOutlined,
  KeyOutlined,
  CheckOutlined,
} from "@ant-design/icons";

// const API = process.env.REACT_APP;

const ListUser = () => {
  const [userData, setUserData] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  // const [Delete, setDelete] = useState(false);

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
        console.log(result);
        // setDelete(true);
        alert("user delete succesfully", result);
      })
      .catch((error) => console.log("error", error));
  };

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
    length: 100,
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
      // sorter: (a, b) => a.firstName - b.firstName,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "lastname",
      dataIndex: "lastName",
      key: "lastname",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "phone",
      dataIndex: "phoneNumber",
      key: "phone",
      sorter: (a, b) => a.phoneNumber - b.phoneNumber,
    },
    {
      title: "birthday",
      dataIndex: "birthday",
      key: "birthday",
      sorter: (a, b) => a.birthday - b.birthday,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/user/view/${record._id}`}>
            <Avatar icon={<EyeOutlined />} />
          </Link>
          <Link to={`/user/edit/${record._id}`}>
            <Avatar icon={<EditOutlined />} />
          </Link>
          <Link to={`/user/reset`}>
            <Avatar icon={<KeyOutlined />} />
          </Link>
          <Link to={`/user/status/${record._id}`}>
            <Avatar icon={<CheckOutlined />} />
          </Link>

          {/* <Link to={`/user/delete/${record._id}`}>delete</Link> */}
          <Button onClick={(e) => deleteHandler(record._id)}>delete</Button>
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

  const searchHandler = (searchInput) => {
    if (searchInput !== "") {
      let serchedUser = userData.filter((user) => {
        return (
          user.firstName.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0
        );
      });
      setSearchResult(serchedUser);
      setIsSearched(true);
    } else {
      setIsSearched(false);
    }
  };

  const onChange = (sorter) => {
    console.log("params", sorter);
  };

  return (
    <>
      <Card>
        <Search
          placeholder="search user"
          allowClear
          onSearch={searchHandler}
          style={{
            // width: "600px",
            maxWidth: "fit-content",
            justifyContent: "center",
            display: "flex",
            alignTtems: "center",
          }}
        />
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Table
            style={{
              maxWidth: "fit-content",
              justifyContent: "center",
              display: "flex",
              alignTtems: "center",
            }}
            pagination={true}
            rowKey="id"
            columns={columns}
            dataSource={isSearched === false ? userData : searchResult}
            onChange={onChange}
          ></Table>
        </div>
      </Card>
    </>
  );
};

export default ListUser;
