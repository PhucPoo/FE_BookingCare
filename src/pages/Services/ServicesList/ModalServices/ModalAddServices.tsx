import React, { useState } from "react";
import { Input, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import "./ModalAddServices.css";
import MDEditor from "@uiw/react-md-editor";
type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (e: boolean) => void;
};

const ModalAddServices = ({ isModalOpen, setIsModalOpen }: Props) => {
  const [value, setValue] = useState<string>("");
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: object) =>
    console.log({ ...data, description: value });

  return (
    <>
      <Modal
        title="Tạo mới dịch vụ"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        centered
      >
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div>
            Tên:
            <br />
            <Controller
              name="name"
              control={control}
              rules={{ required: "Yêu cầu nhập tên" }}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} placeholder="Tên" />
                  {fieldState.error && (
                    <p style={{ color: "red" }}>{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            Giá:
            <br />
            <Controller
              name="cost"
              control={control}
              rules={{
                required: "Yêu cầu điền giá dịch vụ",
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} placeholder="cost" type="number" />
                  {fieldState.error && (
                    <p style={{ color: "red" }}>{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            Miêu tả:
            <br />
            <MDEditor value={value} onChange={(val) => setValue(val || "")} />
          </div>

          <input
            type="submit"
            className="cursor-pointer py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          />
        </form>
      </Modal>
    </>
  );
};

export default ModalAddServices;
