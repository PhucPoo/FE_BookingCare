// import React from "react";
// import { Form, Input, Button, Checkbox, Card } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";

// interface LoginFormValues {
//   username: string;
//   password: string;
//   remember: boolean;
// }

// const Login: React.FC = () => {
//   const onFinish = (values: LoginFormValues) => {
//     console.log(values);
//   };

//   return (
//     <div
//       style={{
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundImage: 'linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),url("/public/bg_login.jpg")',
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   }}

//     >
//         <Card
//         title="Đăng nhập"
//         style={{ width: 400, borderRadius: 10, textAlign: "center", padding: "20px", backgroundColor: "#fce587ff" }}
//         >
//         <Form
//           name="login_form"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//         >
//           <Form.Item
//             name="username"
//             rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
//           >
//             <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
//           >
//             <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
//           </Form.Item>

//           <Form.Item>
//             <Form.Item name="remember" valuePropName="checked" noStyle>
//               <Checkbox>Ghi nhớ đăng nhập</Checkbox>
//             </Form.Item>
//             <a style={{ float: "right" }} href="#">
//               Quên mật khẩu?
//             </a>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" 
//                     htmlType="submit" 
//                     block
//                     style={{ fontWeight: "bold" }}>
//               Đăng nhập
//             </Button>
//           </Form.Item>
//             <Form.Item>
//               <Button type="default" 
//                       block 
//                       style={{ fontWeight: "bold" }} 
//                       onClick={() => (window.location.href = "/signup")}>
//                 Đăng ký
//               </Button>
//             </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default Login;
