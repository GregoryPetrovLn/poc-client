import { FC } from "react";

interface Props {
  onClick: () => void;
  text: string;
  className?: string;
}

const Button: FC<Props> = ({ onClick, text, className }) => {
  return (
    <div
      onClick={onClick}
      className={`${className} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer`}
    >
      {text}
    </div>
  );
};

export default Button;
