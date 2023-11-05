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
  const [dummy, setDummy] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/validateToken`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result1 = await axios.get(`${process.env.REACT_APP_URL}/allusers`);
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

    if (isEmpty(localStorage.getItem("token"))) {
      setDummy(true)
    }
  }, [data, user, localStorage.getItem("token")]);

  const handleLogout = () => {
    dispatch(changeUservalues({}));
    localStorage.removeItem("token");
    setDummy(true);
  };

  console.log(user, "erknekjrkjen");
  const columns = [
    {
      title: <p className="text-[10px] !w-[15vw] sm:!text-[14px] md:!text-[16px]">FirstName</p>,
      dataIndex: "firstName",
      key: "firstName",
      render: (name) => {
        return <p className="text-[8px] !w-[15vw] sm:!text-[12px] md:!text-[14px]">{name}</p>;
      },
    },
    {
      title: <p className="text-[10px] !w-[15vw] sm:!text-[14px] md:!text-[16px]">LastName</p>,
      dataIndex: "lastName",
      key: "lastName",
      render: (name) => {
        return <p className="text-[8px] !w-[15vw] sm:!text-[12px] md:!text-[14px]">{name}</p>;
      },
    },
    {
      title: <p className="text-[10px] !w-[15vw] sm:!text-[14px] md:!text-[16px]">Email</p>,
      dataIndex: "email",
      key: "email",
      render: (name) => {
        return <p className="text-[8px] !w-[15vw] sm:!text-[12px] md:!text-[14px] ">{name}</p>;
      },
    },
    {
      title: <p className="text-[10px] !w-[15vw] sm:!text-[14px] md:!text-[16px]">Phone</p>,
      dataIndex: "phone",
      key: "phone",
      render: (name) => {
        return <p className="text-[8px] !w-[15vw] sm:!text-[12px] md:!text-[14px]">{name}</p>;
      },
    },
  ];

  return (
    <div>
      <div className="bg-blue-700 text-white flex justify-between px-5 py-2">
        <div>Logo</div>
        {user === undefined||dummy ? (
          <Button className="!text-md !text-white" onClick={()=>{navigate("/login")}} >
            <ExitToAppIcon />
            Login
          </Button>
        ) : (
          <Button className="!text-md !text-white"   onClick={handleLogout}>
            <ExitToAppIcon />
            Logout
          </Button>
        )}
      </div>
      {isLoading ? (
        <div className="flex gap-2 items-center justify-center h-screen text-xl bg-black/10 shadow-md">
          <Spin spinning={isLoading} />
          <div>Loading...</div>
        </div>
      ) : (
        <Table dataSource={User} columns={columns} pagination={false} scroll={{x:10}} className="md:w-[90vw] m-auto pt-5"/>
      )}
    </div>
  );
}

export default Home;
