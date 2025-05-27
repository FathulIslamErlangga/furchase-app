import React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
};

const Items = ({ children, className }: Props) => {
  return <div className={className}></div>;
};

export default Items;
