import { Button, Form, Input, InputNumber, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash";
import axios from "axios";

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  //   const dispatch = useDispatch();

  const handleFinish = async (values) => {
    try {
      await axios.post("http://localhost:8080/createuser", values);
      notification.success({message:"Register Successfully lets login"})
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(0,0,0,0.7), rgba(1,0,0,0.8)), url("https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.webp?b=1&s=170667a&w=0&k=20&c=ZhlW6F6fSu42EG13PO0hkgV0L-MqHipJm1hT0yaRl9U=")',
      }}
      className="!h-[100vh] !w-[100vw] bg-no-repeat bg-cover flex items-center justify-center"
    >
      <div className="bg-black/0 rounded-md backdrop-blur-sm absolute h-[90vh] w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw] p-5 shadow-xl overflow-y-scroll">
        <h1 className="text-white text-xl text-center">
          Lets Login And Continue
        </h1>
        <Form
          layout="vertical"
          className="pt-8"
          form={form}
          onFinish={handleFinish}
        >
          <div className="grid sm:grid-cols-2 sm:gap-10">
            <Form.Item
              label={<p className="text-white">First Name</p>}
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your FirstName!",
                },
              ]}
            >
              <Input type="text" placeholder="FirstName" size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="text-white">Last Name</p>}
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your LastName!",
                },
              ]}
            >
              <Input type="text" placeholder="LastName" size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="text-white">Email</p>}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input type="email" placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="text-white">Phone</p>}
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone!",
                },
              ]}
            >
              <InputNumber
                type="number"
                placeholder="Phone"
                size="large"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label={<p className="text-white">Password</p>}
              name="password"
              dependencies={["confirmPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    console.log(value, "kj");
                    const confirmPassword = getFieldValue("confirmPassword");
                    if (!value || confirmPassword === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Password does not match with Confirm Password"
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Password"
                size="large"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label={<p className="text-white">Confirm password</p>}
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please input your Confirm password!",
                },

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    console.log(value, "jhvgv");
                    const password = getFieldValue("password");
                    if (!value || password === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Confirm Password does not match with  Password"
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Confirm Password"
                size="large"
              />
            </Form.Item>
          </div>
          <div className=" !pt-3 !mt-0 !flex flex-col  gap-7 justify-between px-3 ">
            <p className="text-[14px] lg:text-md text-white pt-5 text-center">
              By proceeding, you acknowledge and accept Users{" "}
              <span className="text-blue-500 cursor-pointer">Terms of Use</span>{" "}
              and
              <span className="text-blue-500 cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
            <div className="flex flex-col sm:flex-row justify-between">
              <p className="text-[12px] lg:text-md text-center text-white font-semibold ">
                Already a user?
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login here
                </span>
              </p>
              <Button
                className="bg-[#2874F0] text-md font-semibold  pb-2 text-white px-5 lg:px-10"
                htmlType="submit"
              >
                SignUp
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
