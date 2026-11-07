import { useState } from "react";

const input =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600";

export default function ProductForm({ onSubmit, loading, buttonText, initialData }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    crop: initialData?.crop || "red-chilli",
    quantity: initialData?.quantity || "",
    unit: initialData?.unit || "maund",
    price: initialData?.price || "",
    city: initialData?.city || "",
    quality: initialData?.quality || "",
    description: initialData?.description || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" value={form.title} placeholder="Title" onChange={handleChange} className={input} required />

      <select name="crop" value={form.crop} onChange={handleChange} className={input}>
        <option value="red-chilli">Red chilli</option>
        <option value="cotton">Cotton</option>
        <option value="maize">Maize</option>
      </select>

      <input name="quantity" type="number" value={form.quantity} placeholder="Quantity" onChange={handleChange} className={input} required />

      <select name="unit" value={form.unit} onChange={handleChange} className={input}>
        <option value="maund">Maund</option>
        <option value="kg">Kg</option>
        <option value="ton">Ton</option>
      </select>

      <input name="price" type="number" value={form.price} placeholder="Price per unit" onChange={handleChange} className={input} required />
      <input name="city" value={form.city} placeholder="City" onChange={handleChange} className={input} required />

      <select name="quality" value={form.quality} onChange={handleChange} className={input}>
        <option value="">Quality (optional)</option>
        <option value="A">Grade A</option>
        <option value="B">Grade B</option>
        <option value="C">Grade C</option>
      </select>

      <textarea name="description" value={form.description} placeholder="Description (optional)" onChange={handleChange} className={input} />

      <button
        disabled={loading}
        className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Please wait..." : buttonText}
      </button>
    </form>
  );
}