import React from "react";
import { Result, Button } from "antd";

const NotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="NotFound"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      extra={
        <Button type="primary" href="/">
          Quay về trang chủ
        </Button>
      }
    />
  );
};

export default NotFound;
