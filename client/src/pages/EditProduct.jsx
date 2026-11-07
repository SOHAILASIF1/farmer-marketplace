import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../component/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // 1. Purana product lao
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
      } catch {
        setMessage("Server Not Reachable");
      } finally {
        setPageLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // 2. Update
  const handleUpdate = async (form) => {
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:7000/api/product/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (res.ok) {
        navigate("/my-products");
      } else {
        setMessage(result.message || "Could not update product");
      }
    } catch {
      setMessage("Server Not Reachable");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-green-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-green-900">Edit Product</h1>

        {message && <p className="mb-4 text-sm text-red-600">{message}</p>}

        {product && (
          <ProductForm
            initialData={product}
            onSubmit={handleUpdate}
            loading={loading}
            buttonText="Update Product"
          />
        )}
      </div>
    </div>
  );
};

export default EditProduct;