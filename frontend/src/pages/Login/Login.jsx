import { useDispatch, useSelector } from "react-redux";
import Signin from "./Signin";
import Signup from "./Signup";
import { useState } from "react";

function Login() {
  const [formType, setFormType] = useState("login");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return formType === "login" ? (
    <Signin setFormType={setFormType} />
  ) : (
    <Signup setFormType={setFormType} />
  );
}

export default Login;
