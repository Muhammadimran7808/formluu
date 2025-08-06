import React from "react";

const DragIcon = ({className}:{className?: string}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-grip-vertical ${className} hover:stroke-[black] stroke-[#898884]`}
      aria-hidden="true"
    >
      <circle cx={9} cy={12} r={1} />
      <circle cx={9} cy={5} r={1} />
      <circle cx={9} cy={19} r={1} />
      <circle cx={15} cy={12} r={1} />
      <circle cx={15} cy={5} r={1} />
      <circle cx={15} cy={19} r={1} />
    </svg>
  );
};

export default DragIcon;
