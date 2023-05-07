import { FC } from "react";

interface Props {
  children: React.ReactNode;
}
const Card: FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-lg overflow-x-auto mt-10">
        {children}
      </div>
    </div>
  );
};

export default Card;
