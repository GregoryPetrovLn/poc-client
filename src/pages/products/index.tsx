import { useEffect, useRef } from "react";

import { useDispatch } from "../../../store/store";

const products = () => {
  const productRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!productRef.current) {
      //
    }

    return () => {
      productRef.current = true;
    };
  }, []);

  return <div>products page</div>;
};

export default products;
