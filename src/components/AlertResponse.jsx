import { useAlertStore } from "../stores/alert.store";
import { useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TbCircleCheck } from "react-icons/tb";
import { useShallow } from "zustand/react/shallow";

const AlertResponse = () => {
  const { alert, setAlert } = useAlertStore(
    useShallow((state) => ({ alert: state.alert, setAlert: state.setAlert }))
  );

  useEffect(() => {
    if (alert.showAlert) {
      setTimeout(() => {
        setAlert({ showAlert: false });
      }, 4000);
    }
  }, [alert]);

  return (
    <div className="absolute inset-x-0 top-0 pt-4">
      <div className="min-w-[200px] max-w-fit mx-auto">
        <div
          className={`alert ${alert.success ? "alert-success" : "alert-error"} ${
            !alert.showAlert ? "hidden" : ""
          }`}
        >
          <div className="flex gap-x-2">
            {alert.success ? <TbCircleCheck size="1.5em" /> : <IoCloseCircleOutline size="1.5em" />}
            {alert.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertResponse;
