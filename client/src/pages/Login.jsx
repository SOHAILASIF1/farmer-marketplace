import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const input =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600";

export default function Login() {

  const [form, setForm] = useState({

    email: "",


    password: "",

  });
  const {setUser}=useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const res = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (res.ok) {
        setUser(result.user)
        navigate("/");
      } else {
        setMessage(result.message || "Login failed");
      }

    } catch {
      setMessage("Server not reachable");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-green-900">Sign up</h1>

        {message && <p className="text-sm text-red-600">{message}</p>}


        <input name="email" type="email" placeholder="Email" onChange={handleChange} className={input} required />




        <input name="password" type="password" placeholder="Password (min 8)" onChange={handleChange} className={input} required />


        <button className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700">
          Login
        </button>
      </form>
    </div>
  );
}