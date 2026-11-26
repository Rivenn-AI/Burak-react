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
    if (!storedMember) return null;

    try {
      const parsed = JSON.parse(storedMember);
      return parsed?.member ? parsed.member : parsed;
    } catch (e) {
      return null;
    }
  });

  const setAuthMemberHandler = (member: Member | null) => {
    const cleanMember = (member as any)?.member
      ? (member as any).member
      : member;
    setAuthMember(cleanMember);
    if (cleanMember) {
      localStorage.setItem("memberData", JSON.stringify(cleanMember));
    } else {
      localStorage.removeItem("memberData");
    }
  };

  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
  return (
    <GlobalContext.Provider
      value={{
        authMember,
        setAuthMember: setAuthMemberHandler,
        orderBuilder,
        setOrderBuilder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
