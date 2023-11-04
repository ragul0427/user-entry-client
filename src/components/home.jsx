import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { changeUservalues } from "../Redux/userSlice";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { Button, Table, Spin } from "antd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Cookies from "js-cookie";

function Home() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [User, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(`http://localhost:8080/validateToken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result1 = await axios.get("http://localhost:8080/allusers");
      setData(result1.data.message);
      dispatch(changeUservalues(result.data));
      if (!isEmpty(result.data)) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData().then(() => {
      setIsLoading(false);
      setIsAuthenticated(!isEmpty(user));
    });
  }, []);

  useEffect(() => {
    setUser(
      data &&
        data.filter((res) => {
          return res._id === user?.userId;
        })
    );
  }, [data, user]);

  const handleLogout = () => {
    dispatch(changeUservalues({}));
    Cookies.remove("token");
    navigate("/login");
  };

  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <div>
      <div className="bg-blue-700 text-white flex justify-between px-5 py-2">
        <div>Logo</div>
        <Button className="!text-md !text-white" onClick={handleLogout}>
          <ExitToAppIcon />
          Logout
        </Button>
      </div>
      {isLoading ? (
        <div className="flex gap-2 items-center justify-center h-screen text-xl bg-black/10 shadow-md">
          <Spin spinning={isLoading} />
          <div >
            Loading...
          </div>
        </div>
      ) :
      (
        <Table dataSource={User} columns={columns} pagination={false} />
      )
}
    </div>
  );
}

export default Home;
