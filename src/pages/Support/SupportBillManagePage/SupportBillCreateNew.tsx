import {
  Divider,
  Input,
  Modal,
  Radio,
  Select,
  type RadioChangeEvent,
} from "antd/lib";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { searchPatient } from "../../../api/Patient/PatientApi";
import { getAllService } from "../../../api/Services/ServiceApi";
import { toast } from "react-toastify";
import { createBill } from "../../../api/Bill/BillApi";
import useUserInfoStore from "../../../Zustand/configZustand";

type Props = {
  isModalCreateOpen: boolean;
  setIsModalCreateOpen: (value: boolean) => void;
  handleGetBillList: () => void;
};

const SupportBillCreateNew = ({
  isModalCreateOpen,
  setIsModalCreateOpen,
  handleGetBillList,
}: Props) => {
  const { handleSubmit, control, reset } = useForm();
  const [listPatient, setListPatient] = useState([]);
  const [listService, setListService] = useState([]);
  const [checkRender, setCheckRender] = useState(false);
  const [listServiceSelected, setListServiceSelected] = useState<
    {
      serviceId: number;
      serviceName: string;
      quantity: number;
    }[]
  >([]);
  const [radioValue, setRadioValue] = useState(0);
  const [dataToCreate, setDataCreate] = useState<{
    patientId: number | string;
    supportId: number | string;
    status: string;
    services: { serviceId: number; quantity: number }[];
  }>({
    status: "UNPAID",
    patientId: "",
    supportId: "",
    services: [],
  });
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const onRadioChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
    setDataCreate({ ...dataToCreate, status: e.target.value });
  };

  const onSubmit = async (data: object) => {
    let buildQuery = "";
    Object.keys(data).map((item) => {
      if (data[item] != undefined) {
        buildQuery = buildQuery.concat(`&${item}=${data[item]}`);
      }
    });

    const res = await searchPatient(buildQuery);
    const result = res.data.result.map((item) => {
      return {
        value: item.id,
        label: item.account.name,
      };
    });
    setListPatient(result);
  };

  const handleChange = (value: number) => {
    console.log(`selected ${value}`);
    setDataCreate({ ...dataToCreate, patientId: value });
  };

  const handleChangeService = (value: string, item?: object | object[]) => {
    const listServiceSelectedClone = listServiceSelected;
    const checkContain = listServiceSelectedClone.find(
      (i) => i.serviceId === item?.value
    );
    if (checkContain) {
      toast.warning("Dịch vụ đã được thêm trước đó");
      return;
    }
    listServiceSelectedClone.push({
      serviceId: item?.value,
      serviceName: item?.label,
      quantity: 0,
    });
    setListServiceSelected(listServiceSelectedClone);
    setCheckRender(!checkRender);
    setDataCreate({ ...dataToCreate, services: listServiceSelected });
  };

  const handleUpdateQuantity = (id: number, value: string) => {
    const listServiceSelectedClone = listServiceSelected;

    listServiceSelectedClone.filter((item) => {
      if (item.serviceId === id) {
        item.quantity = +value;
      }
    });
    setListServiceSelected(listServiceSelectedClone);
    setDataCreate({ ...dataToCreate, services: listServiceSelected });
  };

  const handleCreateBill = async () => {
    const listServiceSelectedClone = listServiceSelected;
    listServiceSelectedClone.map((item) => {
      if (!item.quantity || !item.serviceId || !item.serviceName) {
        toast.warning("thiếu dữ liệu ở tệp danh sách dịch vụ");
      }
    });

    if (
      !dataToCreate.patientId ||
      !dataToCreate.services ||
      !dataToCreate.status ||
      !dataToCreate.supportId
    ) {
      toast.warning("thiếu dữ liệu ");
      return;
    }
    const res = await createBill(dataToCreate);
    if (!res.error) {
      setIsModalCreateOpen(false);
      toast.success("Hoàn thành");
      handleGetBillList();
      reset();
    } else {
      toast.error(res.message);
    }
  };
  const handleGetAllService = async () => {
    if (isModalCreateOpen) {
      const res = await getAllService();
      const result = res.data.result.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setListService(result);
    }
  };
  useEffect(() => {
    handleGetAllService();
    setDataCreate({ ...dataToCreate, supportId: userInfo.actorId });
  }, [isModalCreateOpen, listServiceSelected, setListServiceSelected]);
  return (
    <Modal
      title="Tạo mới hoá đơn"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalCreateOpen}
      onCancel={() => {
        setIsModalCreateOpen(false);
        setListPatient([]);
        reset();
      }}
      footer=""
      width={1000}
    >
      <Divider>chọn bệnh nhân</Divider>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="flex justify-between gap-5">
          <div className="w-full">
            Tên bệnh nhân:
            <br />
            <Controller
              name="name"
              control={control}
              rules={{ required: "Yêu cầu nhập tên" }}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} placeholder="Tên" type="text" />
                  {fieldState.error && (
                    <p style={{ color: "red" }}>{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <div className="w-full">
            Số điện thoại:
            <br />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} placeholder="Số điện thoại" type="number" />
                  {fieldState.error && (
                    <p style={{ color: "red" }}>{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
        </div>
        <div className="flex justify-between gap-5">
          <div className="w-full">
            Căn cước công dân:
            <br />
            <Controller
              name="cccd"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    placeholder="Căn cước công dân"
                    type="number"
                  />
                  {fieldState.error && (
                    <p style={{ color: "red" }}>{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <div className="w-full">
            Bảo hiểm y tế:
            <br />
            <Controller
              name="bhyt"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} placeholder="Bảo hiểm y tế" type="number" />
                  {fieldState.error && (
                    <p style={{ color: "red" }}>{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="flex justify-between gap-5">
          <div className="w-full">
            Địa chỉ:
            <br />
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} placeholder="Địa chỉ" type="text" />
                  {fieldState.error && (
                    <p style={{ color: "red" }}>{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="mt-3">
          <input
            type="submit"
            className="cursor-pointer mr-5  px-5 py-1.5  text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          />
          {listPatient && listPatient.length > 0 && (
            <Select
              style={{ width: 250 }}
              onChange={handleChange}
              options={listPatient}
              allowClear
            />
          )}
        </div>
      </form>
      <Divider>danh sách dịch vụ đã dùng</Divider>
      <div className="flex flex-col">
        {listService && listService.length > 0 && (
          <Select
            style={{ width: "50%" }}
            onChange={handleChangeService}
            options={listService}
            allowClear
          />
        )}
        {listServiceSelected && listServiceSelected.length > 0 && (
          <ol className="mt-5 w-full">
            {listServiceSelected.map((item) => {
              return (
                <div
                  key={item.serviceId}
                  className="flex items-center gap-5 w-3/4 justify-between mt-2"
                >
                  <p>
                    {item.serviceId}-{item.serviceName}
                  </p>
                  <div>
                    Quantity:
                    <input
                      className="border border-gray-300 rounded-xs focus:ring-2 ml-5"
                      onChange={(e) =>
                        handleUpdateQuantity(item.serviceId, e.target.value)
                      }
                    />
                  </div>
                </div>
              );
            })}
          </ol>
        )}
      </div>
      <Divider>Trạng thái hoá đơn</Divider>
      <Radio.Group
        onChange={onRadioChange}
        value={radioValue}
        options={[
          {
            value: 1,
            label: "Đã thanh toán",
          },
          {
            value: 0,
            label: "Chưa thanh toán",
          },
        ]}
      />
      <Divider>Xác nhận</Divider>
      <button
        className="w-full bg-blue-500 text-red-50 rounded-xl py-3 cursor-pointer"
        onClick={() => handleCreateBill()}
      >
        Xác nhận tạo hoá đơn
      </button>
    </Modal>
  );
};

export default SupportBillCreateNew;
