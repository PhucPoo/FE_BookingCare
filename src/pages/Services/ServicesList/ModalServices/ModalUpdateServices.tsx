import MDEditor from "@uiw/react-md-editor";
import { Input, Modal } from "antd/lib";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { updateService } from "../../../../api/Services/ServiceApi";
import { toast } from "react-toastify";

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
  handleGetServiceList: () => void;
};

const ModalUpdateServices = ({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  DataToUpdateFromParent,
  id,
  handleGetServiceList,
}: Props) => {
  const { handleSubmit, control, reset } = useForm();
  const [value, setValue] = useState<string>("");

  const handleCancel = () => {
    setIsModalUpdateOpen(false);
    reset();
  };
  const onSubmit = async (data: object) => {
    const res = await updateService({
      ...data,
      description: value,
      id: DataToUpdateFromParent?.id,
    });
    if (!res?.error) {
      toast.success("Sửa dịch vụ hoàn tất");
      handleGetServiceList();
      setIsModalUpdateOpen(false);
      setValue("");
      reset();
    }
  };

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

export default ModalUpdateServices;
