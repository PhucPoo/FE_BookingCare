import { Button, Divider, Modal } from "antd";
import TimeData from "../../MockData/TimaData";
import { useEffect, useState } from "react";
type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  timeSelected: { id: number; label: string }[];
  setTimeSelected: (arr: { id: number; label: string }[]) => void;
};

const ModalRegisterTime = ({
  isModalOpen,
  handleOk,
  handleCancel,
  timeSelected,
  setTimeSelected,
}: Props) => {
  const [checkRender, setCheckRender] = useState(false);
  useEffect(() => {}, [timeSelected.length]);
  return (
    <>
      <Modal
        title="Đăng kí lịch khám"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Divider />
        <h1 className="text-xl">Các lịch khám đã đăng kí</h1>
        <div className="flex gap-2 flex-wrap">
          {timeSelected.length === 0 && <p>Chưa đăng kí bất cứ lịch nào</p>}
          {timeSelected &&
            timeSelected.length > 0 &&
            timeSelected.map((item) => {
              return (
                <Button
                  key={item.id}
                  onClick={() => {
                    const timeSelectedClone = timeSelected;
                    const checkContain = timeSelectedClone.find(
                      (i) => i.id === item.id
                    );

                    if (!checkContain) {
                      alert("Chưa đăng kí ca khám này");
                      return;
                    }
                    const index = timeSelectedClone.indexOf(item);
                    if (index > -1) {
                      timeSelectedClone.splice(index, 1);
                    }

                    setTimeSelected(timeSelectedClone);
                    setCheckRender(!checkRender);
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
        </div>
        <Divider />
        <div className="flex gap-2 flex-wrap">
          {TimeData.map((item) => {
            return (
              <Button
                key={item.id}
                onClick={() => {
                  const timeSelectedClone = timeSelected;
                  const checkContain = timeSelectedClone.find(
                    (i) => i.id === item.id
                  );

                  if (checkContain) {
                    alert("Đã đăng kí ca khám này");
                    return;
                  }

                  timeSelectedClone.push(item);
                  setTimeSelected(timeSelectedClone);
                  setCheckRender(!checkRender);
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default ModalRegisterTime;
