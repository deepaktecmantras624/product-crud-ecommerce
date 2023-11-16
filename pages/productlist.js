import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [productDetails, setProductDetails] = useState([]);

  const router=useRouter()
  useEffect(() => {
    const optionData =
    JSON.parse(localStorage.getItem("productFormData")) || [];
    setProductDetails(optionData);
  }, []);
  console.log("🚀 ~ file: productlist.js:11 ~ ProductList ~ productName:", productDetails)

  const handleDelete = (id) => {
    const newUpdateOptionAfterDelete = productDetails.filter(
      (e) => e.id !== id
    );

    localStorage.setItem(
      "productFormData",
      JSON.stringify(newUpdateOptionAfterDelete)
    );

    setProductDetails(newUpdateOptionAfterDelete);
  };

  const handleEdit = (id) => {


  router.push(`/edit/${id}`);

  };

  console.log("🚀 ~ file: productlist.js:205 ~ ProductList ~ productDetails:", productDetails)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
        Product Table
      </h1>

      <Link
        className="block text-center text-indigo-500 hover:underline mb-4"
        href="/addproduct"
      >
        Go to Add Product
      </Link>
      <table className=" min-w-[80%] m-auto border border-gray-300">
        <thead>
          <tr>
            <th className="border py-2 px-4">Image</th>
            <th className="border py-2 px-4">Product Name</th>
            <th className="border py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productDetails?.map((product, index) => (
            <tr
              key={product.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="border py-2 px-4">
                <img
                  // src={product.images.thumbnail}
                  src={product.data.thumbnail}
                  alt="error"
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="border py-2 px-4">
                {product.data.productName}
              </td>

              <td className="border py-2 px-4">
                <div className="ml-4">
                  <button
                    onClick={() => handleEdit(product.id)}
                 
                    className="py-1 px-3 ml-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring focus:border-yellow-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="py-1 px-3 ml-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:border-red-800"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



    </div>
  );
};

export default ProductList;
