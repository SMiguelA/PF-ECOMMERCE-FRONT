import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getProducts } from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <div></div>
      <div>lado medio derecho</div>
    </div>
  );
}
