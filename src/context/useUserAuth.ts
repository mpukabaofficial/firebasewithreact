import { useContext } from "react";
import { UserContext } from "./AuthContext";

export const useUserAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserAuth must be used within an AuthContextProvider");
  }
  return context;
};
