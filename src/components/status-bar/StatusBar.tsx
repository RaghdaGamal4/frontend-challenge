import React from "react";
import { STATUS } from "../../common/enums/status.enum";
import { ListStatuses, Status } from "./StatusBar.styles";

const employeeStatuses = [
  STATUS.ADDED,
  STATUS.IN_CHECK,
  STATUS.APPROVED,
  STATUS.ACTIVE,
  STATUS.INACTIVE,
];

interface IEmployeeStatusProps {
  status: STATUS;
  onStatusUpdate: React.Dispatch<STATUS>;
}

const StatusBar: React.FC<IEmployeeStatusProps> = ({
  status,
  onStatusUpdate,
}) => {
  return (
    <ListStatuses>
      {employeeStatuses.map((employeeStatus, i) => (
        <Status key={i} bg={status === employeeStatus ? "active" : ""}>
        <div
          key={i}
          className={`status ${status === employeeStatus ? "active" : ""}`}
          onClick={(e) => {
            onStatusUpdate(employeeStatus);
          }}
        >
          {employeeStatus}
        </div>

        </Status>
      ))}
    </ListStatuses>
  );
};

export default StatusBar;
