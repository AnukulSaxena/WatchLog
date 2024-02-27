import React, { useState } from "react";

function CreditSwitcher({ className, isChecked, handleChangeCredit }) {
  return (
    <div className={`${className}`}>
      <label className=" inline-flex cursor-pointer items-center justify-center rounded-md bg-white p-1">
        <input
          type="checkbox"
          name="Switcher"
          className="sr-only"
          checked={isChecked}
          onChange={handleChangeCredit}
        />
        <span
          className={` space-x-[6px] w-12 rounded py-1 px-2 text-sm font-medium ${
            isChecked ? " bg-neutral-500 " : ""
          }`}
        >
          Cast
        </span>
        <span
          className={`flex text-center space-x-[6px] w-12 rounded py-1  pl-2 text-sm font-medium ${
            !isChecked ? " bg-neutral-500" : ""
          }`}
        >
          Crew
        </span>
      </label>
    </div>
  );
}

export default CreditSwitcher;
