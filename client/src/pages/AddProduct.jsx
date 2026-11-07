import React from 'react'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import ProductForm from '../component/ProductForm'

const AddProduct = () => {
    const [message,setMessage]=useState("")
    const [loading,setLoading]=useState(false)
    const navigate= useNavigate()


    const handleCreate=async(form)=>{
        setMessage("")
        setLoading(true)
        try {

            const res=await fetch("http://localhost:7000/api/product/createPostSeller",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials:"include",
                body:JSON.stringify(form)
            })
            const result=await res.json()
            if (res.ok) {
                navigate("/")

                
            }else{
                setMessage(result.message||"Could not add product")
            }
        } catch (error) {
            setMessage("Server Not Reachable")
            
        } finally{
            setLoading(false)
        }
    }
  return (
     <div className="flex min-h-[80vh] items-center justify-center bg-green-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-green-900">Add Product</h1>

        {message && <p className="mb-4 text-sm text-red-600">{message}</p>}

        <ProductForm onSubmit={handleCreate} loading={loading} buttonText="Add Product" />
      </div>
    </div>
  )
}

export default AddProduct