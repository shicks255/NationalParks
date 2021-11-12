import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useRecordSignup = () => {
  console.log("bal");
  const { user } = useAuth0();
  console.log(user);

  if (user) {
    console.log(`user exists ${user}`);
  }
  if (!user) {
    console.log("ok now we need to save this user");
  }
};

export default useRecordSignup;
