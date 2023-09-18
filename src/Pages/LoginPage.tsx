import { Link, Navigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const { login, user } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError("");
    try {
      await login(email, password);
      setRedirect(true);
    } catch (err: any) {
      setError(err.message);
      console.log(error);
    }
  }
  if (redirect || !!user) return <Navigate to={"/"} />;
  return (
    <div className="mx-auto my-16 max-w-[700px] p-4">
      <div>
        <h1 className="py-2 text-2xl font-bold">Login to your account</h1>
        <p className="text-gray-500">
          Dont have an account yet?{" "}
          <Link className="text-black underline" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium" htmlFor="">
            Email Address
          </label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-xl border p-3"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium" htmlFor="">
            Password
          </label>
          <input
            className="rounded-xl border p-3"
            type="password"
            name="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="my-2 w-full rounded-xl border bg-black p-4 text-white hover:bg-gray-800">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
