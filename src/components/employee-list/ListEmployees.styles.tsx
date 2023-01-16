import styled from 'styled-components'
import { STATUS } from '../../common/enums/status.enum';
const handleColorType = (status:string| undefined) => {
  switch (status) {
    case STATUS.INACTIVE:
      return "color: rgb(220, 38, 38); background: rgba(220, 38, 38,.1);";
    case STATUS.APPROVED:
      return "color: rgb(22, 163, 74); background: rgba(22, 163, 74,.1);";
    case STATUS.IN_CHECK:
      return "color: rgb(249, 115, 22); background: rgba(249, 115, 22,.1);";
    case STATUS.ACTIVE:
      return "color: rgb(59, 130, 246); background: rgba(59, 130, 246,.1);";

    default:
      return "color: rgb(156, 163, 175); background: rgba(156, 163, 175,.1);";
  }
};

export const ListEmployeesContents = styled.div`
 padding: 0 0 5rem;
  flex: 1;
  margin: 50px;
  background: #fff;
  @media (max-width: 768px) {
    margin: 20px;
  }
`

export const Header = styled.div`
 display: flex;
 display: flex;
 align-items: center;
 justify-content: flex-end;
 padding: 20px;
`
export const StatusBadge = styled.div`
    display: inline-block;
    text-align: center;
    padding: 4px 15px;
    border-radius: 30px;
    ${({ color }) => handleColorType(color)};
`