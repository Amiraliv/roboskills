import { useSession } from "next-auth/react";
import { AnimatedText } from "./../";

import { CgProfile } from "react-icons/cg";

const HeaderProfileData = () => {
  const { data: session } = useSession();

  if (!session)
    return (
      <a href="/login">
        <AnimatedText text={"ثبت نام / ورود"} />
      </a>
    );

  return (
    <a href="/dashboard">
      <CgProfile />
      <span>حساب کاربری</span>
    </a>
  );
};

export default HeaderProfileData;
