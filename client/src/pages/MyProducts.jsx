import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("http://localhost:7000/api/product/getMyProducts", {
          credentials: "include",
        });
        const result = await res.json();
        if (res.ok) {
          setProducts(result.products);
        } else {
          setMessage(result.message || "Could not load products");
        }
      } catch (error) {
        setMessage("Server not reachable");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:7000/api/product/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const result = await res.json();

    if (res.ok) {
      setProducts(products.filter((p) => p._id !== id));
    } else {
      setMessage(result.message || "Could not delete product");
    }
  } catch (error) {
    setMessage("Server not reachable");
  }
};


  if (loading) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-900">My Products</h1>
        <Link
          to="/products/new"
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
        >
          Add Product
        </Link>
      </div>

      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}

      {!message && products.length === 0 && (
        <p className="text-gray-500">You have not added any product yet.</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p._id} className="rounded-lg border bg-white p-4 shadow">
           <Link to={`/products/${p._id}`} className="block">
    <h3 className="font-semibold hover:text-green-700">{p.title}</h3>
    <p className="text-sm text-gray-600">{p.crop} | {p.city}</p>
    <p className="text-sm text-gray-600">{p.quantity} {p.unit}</p>
    <p className="font-bold text-green-700">Rs {p.price} / {p.unit}</p>
    <p className="mt-1 text-xs text-gray-500">Status: {p.status}</p>
  </Link>


            <div className="mt-3 flex gap-2">
              <Link
                to={`/products/${p._id}/edit`}
                className="rounded border border-green-600 px-3 py-1 text-sm font-semibold text-green-600 hover:bg-green-50"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p._id)}
                className="rounded border border-red-500 px-3 py-1 text-sm font-semibold text-red-500 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;