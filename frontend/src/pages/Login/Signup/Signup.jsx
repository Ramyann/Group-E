import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../context/slices/userSlice";

function Signup({ setFormType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = z.object({
    email: z.string().email("Invalid email").min(5, "Email is required"),
    password: z.string().min(6, "Password must be at least 8 characters"),
    rememberMe: z.boolean().optional(),
  });

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(schema),
  });

  const {
    getValues,
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const x = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      dispatch(setUser({ token: x?.token, rememberMe: data?.rememberMe }));
      navigate("/");
      reset();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-[#242424] flex items-center justify-center w-full h-svh">
      <div className="absolute w-[30%] h-[60%] bg-[#373737] border-[1px] blur-[2px] rounded-4xl"></div>

      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        className="z-10 flex flex-col items-center justify-around max-w-[30%] h-[50%]"
      >
        <h2 className="text-2xl font-bold border border-[#808080] px-6 py-2 rounded-xl ">
          Signup
        </h2>

        <div className="flex flex-col gap-y-4">
          <input
            {...register("email", { required: true, value: "" })}
            type="email"
            placeholder="Email"
            className="border-2 border-[#4c4c4c] w-80 px-4 py-3 rounded-md"
          />

          <input
            {...register("password", { required: true, value: "" })}
            type="password"
            placeholder="Password"
            className="border-2 border-[#4c4c4c] px-4 py-3 rounded-md"
          />
        </div>

        <div className="flex justify-between w-full px-2">
          <span onClick={() => setFormType("login")}>
            Already have an account? <i className="text-blue-500 underline">Sign in</i>
          </span>
        </div>

        <button
          type="submit"
          form="login-form"
          className="cursor-pointer w-[65%] rounded-xl text-xl p-2 bg-primary font-bold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
