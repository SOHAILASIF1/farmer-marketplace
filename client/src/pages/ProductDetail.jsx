import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`http://localhost:7000/api/product/${id}`);
        const result = await res.json();

        if (res.ok) {
          setProduct(result.product);
        } else {
          setMessage(result.message || "Product not found");
        }
      } catch (error) {
        setMessage("Server not reachable");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <p className="p-8 text-center">Loading...</p>;

  if (message) {
    return <p className="p-8 text-center text-red-600">{message}</p>;
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Link to="/my-products" className="text-sm text-green-600 hover:underline">
        Back
      </Link>

      <div className="mt-3 rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-green-900">{product.title}</h1>

        <p className="mt-1 text-sm text-gray-500">
          {product.crop} | {product.city}
        </p>

        <p className="mt-4 text-2xl font-bold text-green-700">
          Rs {product.price} / {product.unit}
        </p>

        <div className="mt-4 space-y-1 text-sm text-gray-700">
          <p>Quantity: {product.quantity} {product.unit}</p>
          <p>Quality: {product.quality || "Not mentioned"}</p>
          <p>Status: {product.status}</p>
          <p>Seller: {product.seller?.name} ({product.seller?.city})</p>
        </div>

        {product.description && (
          <p className="mt-4 text-gray-600">{product.description}</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;