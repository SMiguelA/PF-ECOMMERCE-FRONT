import { useEffect } from "react";
import { useSelector } from "react-redux";

function useLocalStorageUser() {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("user", JSON.stringify(user));
    };

    const handleUnload = () => {
      localStorage.setItem("user", JSON.stringify(user));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      //cuando recarga
      window.removeEventListener("beforeunload", handleBeforeUnload);
      //cuando abandona
      window.removeEventListener("unload", handleUnload);
    };
  }, [user]);
}

export default useLocalStorageUser;
