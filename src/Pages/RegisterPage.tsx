import { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { user, ready } = useUserAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = useUserAuth();
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setError("");
    try {
      await createUser(name, email, password);
    } catch (err: any) {
      // Use 'err' instead of 'error' here
      setError(err.message);
      console.log(error); // Corrected from 'error' to 'err'
    }
  }
  if (!!user && ready) return <Navigate to={"/"} />;
  return (
    <div className="mx-auto my-16 max-w-[700px] p-4">
      <div>
        <h1 className="py-2 text-2xl font-bold">Register your account</h1>
        <p className="text-gray-500">
          Have an existing account?{" "}
          <Link className="text-black underline" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium" htmlFor="email">
            {" "}
            Name
          </label>
          <input
            onChange={(event) => setName(event.target.value)}
            className="rounded-xl border p-3"
            type="name"
            name="name"
            id="name"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium" htmlFor="email">
            {" "}
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
          <label className="py-2 font-medium" htmlFor="password">
            {" "}
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
