import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();

  const [authMember, setAuthMember] = useState<Member | null>(() => {
    const token = cookies.get("accessToken");

    if (!token) {
      localStorage.removeItem("memberData");
      return null;
    }

    const storedMember = localStorage.getItem("memberData");

    return storedMember ? JSON.parse(storedMember) : null;
  });
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
