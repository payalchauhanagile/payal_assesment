import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Card, Space, Avatar } from "antd";
import Search from "antd/lib/input/Search";
import { Link } from "react-router-dom";
import {
  EyeOutlined,
  EditOutlined,
  KeyOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import swal from "sweetalert";
import moment from "moment";
import axios from "axios";

import classes from "./ListUser.module.css";
import { DeleteOutline } from "@material-ui/icons";

const API = process.env.REACT_APP_API;

const ListUser = () => {
  const [userData, setUserData] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //change status of user
  const statusHandler = (id) => {
    const token = localStorage.getItem("access_token");

    var urlencoded = new URLSearchParams();
    urlencoded.append("userId", id);

    axios({
      method: "post",
      url: `${API}/admin/api/changedUserStatus`,
      headers: {
        Authorization: token,
      },
      data: urlencoded,
    })
      .then(function (response) {
        setIsActive((prev) => !prev);
        swal("User status change successfully!", "success", {
          buttons: [true, "ok"],
          icon: "success",
          timer: 2000,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //delete user
  const deleteHandler = (id) => {
    const token = localStorage.getItem("access_token");

    var urlencoded = new URLSearchParams();
    urlencoded.append("userId", id);

    setIsDelete(true);
    axios({
      method: "post",
      url: `${API}/admin/api/deleteUser`,
      headers: {
        Authorization: token,
      },
      data: urlencoded,
    })
      .then(function (response) {
        swal("User Delete successfully!", "success", {
          buttons: [true, "ok"],
          icon: "success",
          timer: 2000,
        });
        setIsDelete(false);
      })
      .catch(function (error) {
        console.log(error);
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
        dir: "asc",
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
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
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
      render: (birthday) => (
        <div>
          <p>{moment(birthday).format("DD-MM-YYYY")}</p>
        </div>
      ),
      sorter: (a, b) => moment(a.birthday).unix() - moment(b.birthday).unix(),
    },
    {
      title: "created date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <div>
          <p>{moment(createdAt).format("DD/MM/YYYY H:MM")}</p>
        </div>
      ),
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
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
          <Link
            onClick={(e) => {
              statusHandler(record._id);
            }}
          >
            {record?.isActive ? (
              <Avatar icon={<CheckOutlined style={{ color: "#4E89FF" }} />} />
            ) : (
              <Avatar icon={<CloseOutlined />} />
            )}
          </Link>
          <Link onClick={(e) => deleteHandler(record._id)}>
            <Avatar icon={<DeleteOutline />} />
          </Link>
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
  }, [isActive, isDelete]);

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
        <div className={classes.search}>
          <label>Search:- </label>
          <Search
            placeholder="search user"
            allowClear
            onSearch={searchHandler}
          />
        </div>
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
