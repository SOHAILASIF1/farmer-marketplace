import { useEffect, useState } from "react";
import RateBox from "../component/RateBox";
import {Link} from "react-router-dom"

export default function Home() {
  const [products,setProducts]=useState([])
  const [loading,setLoading]=useState([true])
  const [message,setMessage]=useState("")

  useEffect(()=>{
    const loadProducts=async()=>{
      try {
        const res=await fetch("http://localhost:7000/api/product")
        const result=await res.json()
        if (res.ok) {
          setProducts(result.products)
          
        }else {
          setMessage(result.message||"Could not load products")
        }
      } catch (error) {
         setMessage("Server not reachable");
        
      } finally{
        setLoading(false)
      }
    }
    loadProducts()
  },[])
  return (
    <div>
      <RateBox />

      <div className="mx-auto max-w-6xl p-4">
        <h2 className="mb-4 text-xl font-bold text-green-900">Latest Products</h2>

        {loading && <p className="text-center">Loading...</p>}

        {message && <p className="mb-4 text-sm text-red-600">{message}</p>}

        {!loading && !message && products.length === 0 && (
          <p className="text-gray-500">No products available yet.</p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p._id}
              to={`/products/${p._id}`}
              className="rounded-lg border bg-white p-4 shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-gray-800">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.crop} | {p.city}</p>
              <p className="text-sm text-gray-600">{p.quantity} {p.unit}</p>
              <p className="mt-1 font-bold text-green-700">Rs {p.price} / {p.unit}</p>
              <p className="mt-1 text-xs text-gray-500">
                Seller: {p.seller?.name} ({p.seller?.city})
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* neeche products ki list */}
    </div>
  );
}