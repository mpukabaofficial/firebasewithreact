import { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { createUser } = useUserAuth();
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      setRedirect(true);
    } catch (err: any) {
      // Use 'err' instead of 'error' here
      setError(err.message);
      console.log(error); // Corrected from 'error' to 'err'
    }
  }
  if (redirect) return <Navigate to={"/account"} />;

  return (
    <div className="mx-auto my-16 max-w-[700px] p-4">
      <div>
        <h1 className="py-2 text-2xl font-bold">Sign in to your account</h1>
        <p>
          Have an existing account?{" "}
          <Link className="text-blue-500" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium" htmlFor="email">
            {" "}
            {/* Add 'htmlFor' */}
            Email Address
          </label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            className="border p-3"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium" htmlFor="password">
            {" "}
            {/* Add 'htmlFor' */}
            Password
          </label>
          <input
            className="border p-3"
            type="password"
            name="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="my-2 w-full border border-blue-500 bg-blue-600 p-4 text-white hover:bg-blue-500">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
