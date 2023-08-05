import { Fragment, useState } from "react";

interface InputI {
  name: string;
  isUser?: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type:string;
  className:string
}

const Input = ({ name, isUser, placeholder, onChange, value,type, className }: InputI) => {
  if (isUser === true) return null;
  return (
    <div>
      <label className="myLabel">{name}</label>
      <br />
      <input 
      className={className}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};

export default Input;
