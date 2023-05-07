import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="black" loading={true} />
    </div>
  );
};

export default Loading;
