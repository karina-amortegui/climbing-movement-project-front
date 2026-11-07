//  <th
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//               onClick={() => {
//                 console.log("HELLO WORLD")
//               }}>Movement</th>
import { Fragment, type ChangeEventHandler } from "react";

interface IMovementTableHeader {
  headerText: string
  onClick?: () => void
  onChange?: ChangeEventHandler<HTMLSelectElement, HTMLSelectElement>
}

export default function MovementTableHeader({ headerText, onClick, onChange }: IMovementTableHeader) {
  const handleMouseEnter = (e: any) => {
    e.currentTarget.style.cursor = 'pointer';
    e.currentTarget.style.color = "#074666";
  };

  const handleMouseLeave = (e: any) => {
    e.currentTarget.style.cursor = 'default';
    e.currentTarget.style.color = "#00f5ff";
  };

  return (
    <Fragment>
      <th
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}>
        {headerText === "Execution" ? (
          <select onChange={onChange}>
            <option>{headerText}</option>
            <option>static</option>
            <option>dynamic</option>
          </select>
        ) : headerText}

      </th>
      {/* {headerText === "Execution" && (

        <select>
          <option>A</option>
          <option>B</option>
        </select>
      )} */}
    </Fragment>
  )
}