// import React from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Checkbox,
//   Card,
//   DatePicker,
//   Select,
//   Row,
//   Col,
// } from "antd";
// import {
//   UserOutlined,
//   LockOutlined,
//   MailOutlined,
//   IdcardOutlined,
//   PhoneOutlined,
//   HomeOutlined,
// } from "@ant-design/icons";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const AuthForm: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const type = location.pathname.includes("signup") ? "signup" : "login";

//   const onFinish = async (values: any) => {
//     try {
//       if (type === "login") {
//         const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
//           userName: values.userName,
//           password: values.password,
//         });

//         if (res.data?.data?.accessToken) {
//           localStorage.setItem("accessToken", res.data.data.accessToken);

//           const user = res.data.data.user; // backend trả về user info
//           localStorage.setItem("user", JSON.stringify(user));

//           alert("Đăng nhập thành công!");

//           if (user?.role) {
//             navigate(`/${user.role}/dashboard`);
//           } else {
//             navigate("/"); // fallback
//           }
//         } else {
//           alert("Đăng nhập thất bại!");
//         }
//       } else {
//         const res = await axios.post(
//           "http://localhost:8080/api/v1/auth/register",
//           {
//             name: values.name,
//             password: values.password,
//             email: values.email,
//             // cccd: values.cccd,
//             phoneNumber: values.phoneNumber,
//             // address: values.address,
//             // gender: values.gender,
//             // birth: values.birth ? values.birth.format("YYYY-MM-DD") : null,
//           },
//           {
//             headers: { "Content-Type": "application/json" },
//           }
//         );

//         if (res.data?.statusCode === 201) {
//           alert("Đăng ký thành công!");
//           navigate("/login");
//         } else {
//           alert(res.data?.message || "Đăng ký thất bại!");
//         }
//       }
//     } catch (error: any) {
//       console.error(error);
//       alert("Có lỗi xảy ra, vui lòng thử lại!");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         backgroundImage:
//           'linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(0,0,0,0)), url("/public/bg_login.jpg")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         padding: "16px",
//       }}
//     >
//       <Row justify="center" align="middle" style={{ width: "100%", margin: 0 }}>
//         <Col xs={24} sm={18} md={12} lg={8}>
//           <Card
//             title={type === "login" ? "Login" : "Sign up"}
//             headStyle={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
//             style={{
//               width: "100%",
//               borderRadius: 16,
//               textAlign: "center",
//               padding: "20px",
//               backgroundColor: "#fff",
//               boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
//             }}
//           >
//             <Form name={type} layout="vertical" onFinish={onFinish} size="large">
//               <Form.Item
//                 name="name"
//                 rules={[{ required: true, message: "Hãy nhập tên đăng nhập!" }]}
//               >
//                 <Input
//                   prefix={<UserOutlined />}
//                   placeholder="Tên đăng nhập / Email"
//                   allowClear
//                 />
//               </Form.Item>

//               {/* Password */}
//               <Form.Item
//                 name="password"
//                 rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
//               >
//                 <Input.Password
//                   prefix={<LockOutlined />}
//                   placeholder="Mật khẩu"
//                   allowClear
//                 />
//               </Form.Item>

//               {/* Extra fields khi signup */}
//               {type === "signup" && (
//                 <>
//                   <Form.Item
//                     name="confirmPassword"
//                     dependencies={["password"]}
//                     hasFeedback
//                     rules={[
//                       { required: true, message: "Hãy nhập lại mật khẩu!" },
//                       ({ getFieldValue }) => ({
//                         validator(_, value) {
//                           if (!value || getFieldValue("password") === value) {
//                             return Promise.resolve();
//                           }
//                           return Promise.reject(
//                             new Error("Mật khẩu nhập lại không khớp!")
//                           );
//                         },
//                       }),
//                     ]}
//                   >
//                     <Input.Password
//                       prefix={<LockOutlined />}
//                       placeholder="Xác nhận mật khẩu"
//                       allowClear
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     name="email"
//                     rules={[
//                       { required: true, type: "email", message: "Hãy nhập email!" },
//                     ]}
//                   >
//                     <Input prefix={<MailOutlined />} placeholder="Email" allowClear />
//                   </Form.Item>

//                   {/* <Form.Item
//                     name="cccd"
//                     rules={[{ required: true, message: "Hãy nhập số CCCD!" }]}
//                   >
//                     <Input
//                       prefix={<IdcardOutlined />}
//                       placeholder="Số căn cước công dân"
//                       allowClear
//                     />
//                   </Form.Item> */}

//                   <Form.Item name="phoneNumber">
//                     <Input
//                       prefix={<PhoneOutlined />}
//                       placeholder="Số điện thoại (Không bắt buộc)"
//                       allowClear
//                     />
//                   </Form.Item>

//                   {/* <Form.Item name="address">
//                     <Input
//                       prefix={<HomeOutlined />}
//                       placeholder="Địa chỉ (Không bắt buộc)"
//                       allowClear
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     name="gender"
//                     rules={[{ required: true, message: "Hãy chọn giới tính!" }]}
//                   >
//                     <Select placeholder="Giới tính">
//                       <Select.Option value="male">Nam</Select.Option>
//                       <Select.Option value="female">Nữ</Select.Option>
//                       <Select.Option value="other">Khác</Select.Option>
//                     </Select>
//                   </Form.Item>

//                   <Form.Item name="birth">
//                     <DatePicker placeholder="Ngày sinh" style={{ width: "100%" }} />
//                   </Form.Item> */}
//                 </>
//               )}

//               {/* Remember + forgot password */}
//               {type === "login" && (
//                 <Form.Item>
//                   <Checkbox style={{ float: "left" }}>Remember me</Checkbox>
//                   <a
//                     style={{ float: "right" }}
//                     onClick={() => navigate("/forgot-password")}
//                   >
//                     Forgot password?
//                   </a>
//                 </Form.Item>
//               )}

//               {/* Submit */}
//               <Form.Item>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   block
//                   style={{
//                     backgroundColor: "#46d9f6ff",
//                     borderColor: "#46d9f6ff",
//                     fontWeight: "bold",
//                   }}
//                   className="auth-btn"
//                 >
//                   {type === "login" ? "Login" : "Sign up"}
//                 </Button>
//               </Form.Item>

//               {/* Switch login/signup */}
//               <Form.Item style={{ textAlign: "center" }}>
//                 {type === "login" ? (
//                   <>
//                     Don’t have an account?{" "}
//                     <Button
//                       type="link"
//                       style={{ padding: 0 }}
//                       onClick={() => navigate("/signup")}
//                     >
//                       Sign up
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     Already have an account?{" "}
//                     <Button
//                       type="link"
//                       style={{ padding: 0 }}
//                       onClick={() => navigate("/login")}
//                     >
//                       Login
//                     </Button>
//                   </>
//                 )}
//               </Form.Item>
//             </Form>
//           </Card>
//         </Col>
//       </Row>

//       <style>
//         {`
//           .auth-btn {
//             transition: all 0.3s ease;
//           }
//           .auth-btn:hover {
//             background-color: #30a4fdff !important;
//             border-color: #30a4fdff !important;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default AuthForm;
