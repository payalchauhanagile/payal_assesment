import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Card, Space, Avatar, Button } from "antd";
import Search from "antd/lib/input/Search";
import { Link, useHistory } from "react-router-dom";
import { EyeOutlined, EditOutlined, KeyOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import moment from "moment";

import classes from "./ListUser.module.css";

const API = process.env.REACT_APP_API;

const ListUser = () => {
  const [userData, setUserData] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [Delete, setDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const history = useHistory();

  //change status of user
  const statusHandler = (id) => {
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

    fetch(`${API}/admin/api/changedUserStatus`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setIsActive((prev) => !prev);
      })
      .catch((error) => console.log("error", error));
  };

  //delete user
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
    setDelete(true);
    fetch(`${API}/admin/api/deleteUser`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        swal("User Delete successfully!", "success", {
          buttons: false,
          timer: 2000,
        }).then(history.push("/user"));
        setDelete(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  //listing users
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
        <Avatar icon={<img src={row} alt="" height="200px" width="200px" />} />
      ),
      key: "photo",
    },

    {
      title: "firstname",
      dataIndex: "firstName",
      key: "firstname",
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
      sorter: (a, b) => moment(a.birthday).unix() - moment(b.birthday).unix(),
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
          <Button
            style={{ width: "80px" }}
            type="primary"
            onClick={(e) => {
              statusHandler(record._id);
            }}
          >
            {record?.isActive ? "Active" : "In-Active"}
          </Button>
          <Button onClick={(e) => deleteHandler(record._id)}>delete</Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true);
    fetch(`${API}/admin/api/getUserList`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUserData(result.data.data);
        setError(null);
      })
      .catch((error) => setError(error.message));
    setLoading(false);
  }, [isActive, Delete]);

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

  return (
    <>
      <Card>
        <Search
          placeholder="search user"
          allowClear
          onSearch={searchHandler}
          className={classes.search}
        />
        <div className={classes.layout}>
          {loading ? (
            <p>Loading....</p>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <Table
              className={classes.table}
              pagination={true}
              rowKey="id"
              columns={columns}
              dataSource={isSearched === false ? userData : searchResult}
              onChange={() => {}}
              locale={{ emptyText: "User Data Not Found...!" }}
            ></Table>
          )}
        </div>
      </Card>
    </>
  );
};

export default ListUser;
