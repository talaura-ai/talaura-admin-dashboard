import { redirect } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export const Loader = async () => {
  const admin = useAppSelector((state) => state.admin);
  if (!admin.token) {
    return redirect("/login");
  }
  return null;
};
