import { useState } from "react";

const input =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    role: "buyer",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const { confirmPassword, ...data } = form;

    try {
      const res = await fetch("http://localhost:7000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setMessage(result.message || "Account created");
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

        <input name="name" placeholder="Full name" onChange={handleChange} className={input} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className={input} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} className={input} />
        <input name="city" placeholder="City" onChange={handleChange} className={input} />

        <select name="role" value={form.role} onChange={handleChange} className={input}>
          <option value="buyer">Buyer</option>
          <option value="farmer">Farmer</option>
          <option value="dealer">Dealer</option>
        </select>

        <input name="password" type="password" placeholder="Password (min 8)" onChange={handleChange} className={input} required />
        <input name="confirmPassword" type="password" placeholder="Confirm password" onChange={handleChange} className={input} required />

        <button className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700">
          Sign up
        </button>
      </form>
    </div>
  );
}