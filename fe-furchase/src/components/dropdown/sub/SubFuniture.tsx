import React from "react";

type Props = {
  mouseLeave: () => void;
};

const SubFuniture = (mouse: Props) => {
  return (
    <div
      className="absolute left-full top-0 bg-white shadow-xl rounded-md  z-50 min-w-[350px]"
      onMouseLeave={mouse.mouseLeave}
    >
      <ul className="px-5  py-4 ">
        <li className="pt-2 hover:text-oranges-primary">menu 1</li>
        <li className="pt-2 hover:text-oranges-primary">menu 2</li>
        <li className="pt-2 hover:text-oranges-primary">menu 3</li>
        <li className="pt-2 hover:text-oranges-primary">menu 4</li>
      </ul>
    </div>
  );
};

export default SubFuniture;
