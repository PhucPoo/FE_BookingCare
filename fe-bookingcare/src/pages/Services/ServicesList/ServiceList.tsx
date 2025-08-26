import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import "./ServiceList.css";
import { Button, Typography } from "antd";
import ModalAddServices from "./ModalAddServices";
const ServiceList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ServiceList, setServiceList] = useState([]);
  return (
    <>
      <div className="container">
        <Button
          type="primary"
          icon={<IoIosAddCircle />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Thêm
        </Button>
        <div>
          {ServiceList.length === 0 && (
            <Typography>Chưa có dịch vụ nào trong danh sách</Typography>
          )}
          {ServiceList && ServiceList.length > 0}
        </div>
      </div>
      <ModalAddServices
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default ServiceList;
