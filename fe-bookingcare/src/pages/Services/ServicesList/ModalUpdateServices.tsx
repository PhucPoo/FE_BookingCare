import { Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

type Props = {
  isModalUpdateOpen: boolean;
  setIsModalUpdateOpen: (e: boolean) => void;
  DataToUpdateFromParent: {
    id: number;
    name: string;
    cost: number;
    description: string;
  } | null;
  key: number | null;
  id: number | null;
};

const ModalUpdateServices = ({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  DataToUpdateFromParent,
  id,
}: Props) => {
  const { handleSubmit, control, reset } = useForm();
  const handleCancel = () => {
    setIsModalUpdateOpen(false);
    reset();
  };
  const onSubmit = (data: object) => console.log(data);

  useEffect(() => {}, [id]);
  return (
    <>
      <Modal
        title="Cập nhật dịch vụ"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalUpdateOpen}
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
                  <Input
                    {...field}
                    placeholder="Tên"
                    defaultValue={DataToUpdateFromParent?.name}
                  />
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
              defaultValue={DataToUpdateFromParent?.cost}
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
            <Controller
              name="description"
              control={control}
              defaultValue={DataToUpdateFromParent?.description}
              rules={{
                required: "Yêu cầu mô tả dịch vụ",
                minLength: 8,
              }}
              render={({ field, fieldState }) => (
                <>
                  <TextArea {...field} placeholder="Mô tả" />
                  {fieldState.error && (
                    <p style={{ color: "red" }}>{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
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

export default ModalUpdateServices;
