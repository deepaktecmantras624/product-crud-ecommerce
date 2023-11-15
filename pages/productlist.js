import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [editedOption, setEditedOption] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const router=useRouter()
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    metaTagTitle: "",
    metaTagDescription: "",
    modelName: "",
    sku: "",
    mpn: "",
    upc: "",
    price: "",
    quantity: "",
    minimumQuantity: "",
    outOfStockStatus: "",
    date: "",
    lengths: "",
    widths: "",
    heights: "",
    dimensionClass: "",
    weight: "",
    weightClass: "",
    status: "",
    thumbnail: "",
    uploadedImages: [],
  });

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

// image===========

// const handleUpload = (e) => {
//   const files = Array.from(e.target.files);
//   const newImages = files.map((file) => URL.createObjectURL(file));
//   setFormData((prevData) => ({
//     ...prevData,
//     Image: {
//       ...prevData.Image,
//       uploadedImages: [
//         ...(prevData.Image.uploadedImages || []),
//         ...newImages,
//       ],
//     },
//   }));
//   const storedImages = JSON.parse(localStorage.getItem("image")) || [];
//   localStorage.setItem(
//     "image",
//     JSON.stringify([...storedImages, ...newImages])
//   );
// };

// const handleThumbnailUpload = (e) => {
//   const file = e.target.files[0];
//   const thumbnailURL = URL.createObjectURL(file);
//   setFormData((prevData) => ({
//     ...prevData,
//     Image: {
//       ...prevData.Image,
//       thumbnail: thumbnailURL,
//     },
//   }));

//   localStorage.setItem("thumbnail", JSON.stringify(thumbnailURL));
// };
// const handleRemove = (index) => {
//   const updatedImages = [...formData.Image.uploadedImages];
//   updatedImages.splice(index, 1);
//   setFormData((prevData) => ({
//     ...prevData,
//     Image: {
//       ...prevData.Image,
//       uploadedImages: updatedImages,
//     },
//   }));
//   localStorage.setItem("image", JSON.stringify(updatedImages));
// };
// ===============
  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleInputChange = (tab, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [tab]: {
        ...prevData[tab],
        [field]: value,
      },
    }));
  };
 // console.log("🚀 ~ file: productlist.js:84 ~ handleEdit ~ formData:", editedOption)
  const handleEdit = (id) => {
  //   setEditedOption(product);
    
  //   setFormData({
  //     General: product.general,
  //     Data: product.data,
  //     Specification: product.specification,
  //     Images: product.images,
  //   });

  router.push(`/edit/${id}`);

  };
  // console.log("🚀 ~ file: productlist.js:82 ~ handleEdit ~ product:", formData)

  // const handleSaveEdit = () => {
  //   if (editedOption) {
  //     const updatedOptions = productDetails?.map((option) => {
  //       return option.id === editedOption.id
  //         ? {
  //             ...option,
  //            data:option.data,
  //           }
  //         : option;
  //     });

  //     localStorage.setItem("productFormData", JSON.stringify(updatedOptions));
  //     // localStorage.setItem("typeNames",JSON.stringify(updatedOptions.flatMap((option) => option.typeNames)));

  //     setProductDetails(updatedOptions);
  //     setEditedOption(null);
  //     setFormData({
  //       General: {
  //         productName: "",
  //         description: "",
  //         metaTagTitle: "",
  //         metaTagDescription: "",
  //       },
  //       Data: {
  //         modelName: "",
  //         sku: "",
  //         mpn: "",
  //         upc: "",
  //         price: "",
  //         quantity: "",
  //         minimumQuantity: "",
  //         outOfStockStatus: "",
  //         date: "",
  //       },
  //       Specification: {
  //         lengths: "",
  //         widths: "",
  //         heights: "",
  //         dimensionClass: "",
  //         weight: "",
  //         weightClass: "",
  //         status: "",
  //         lengths: "",
  //         widths: "",
  //         heights: "",
  //         dimensionClass: "",
  //       },
  //       Image: {
  //         thumbnail: "",
    
  //         uploadedImages: [],
  //       },
  //     });
  //   }
  // };
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
                  src="https://static1.xdaimages.com/wordpress/wp-content/uploads/wm/2023/09/iphone-15-blue-main.jpg"
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

{/* Edit part started after clicking edit button */}
{
  editedOption && (
    <div className="max-w-xl mx-auto my-8 p-6 bg-gray-100 rounded-md shadow-md text-gray-800">
    <div className="flex justify-between items-center mb-4">
      <p className="text-4xl text-blue-700 font-bold">Edit Products</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        onClick={handleSaveEdit}
      >
        Save
      </button>
    </div>

    <div className="flex mb-4">
      <div
        className={`cursor-pointer mr-4 py-2 px-4 rounded ${
          activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
        onClick={() => handleTabChange(1)}
      >
        General
      </div>
      <div
        className={`cursor-pointer py-2 px-4 rounded ${
          activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
        onClick={() => handleTabChange(2)}
      >
        Data
      </div>
      <div
        className={`cursor-pointer py-2 ml-4 px-4 rounded ${
          activeTab === 3 ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
        onClick={() => handleTabChange(3)}
      >
        Specification
      </div>
      <div
        className={`cursor-pointer py-2 ml-4 px-4 rounded ${
          activeTab === 4 ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
        onClick={() => handleTabChange(4)}
      >
        Images
      </div>
      {/* Add more tabs as needed */}
    </div>

    <div>
      {activeTab === 1 && (
        <div>
          <label className="block mb-2">Product Name:</label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-4"
            value={formData.General?.productName}
            onChange={(e) =>
              [handleInputChange("productName", e.target.value),
              setFormData({...formData?.productName})]
            }
          />
          <label className="block mb-2">Description:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData?.description}
            // onChange={(e) =>
            //   handleInputChange("General", "description", e.target.value)
            // }
            onChange={(e) =>
              [handleInputChange( "description", e.target.value),
              setFormData({...formData?.description || ""})]
            }
          />
          <label className="block mb-2">Meta Tag Title:</label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-4"
            value={formData?.metaTagTitle}
            // onChange={(e) =>
            //   handleInputChange("General", "metaTagTitle", e.target.value)
            // }
            onChange={(e) =>
              [handleInputChange( "metaTagTitle", e.target.value),
              setFormData({...formData?.metaTagTitle || ""})]
            }
          />
          <label className="block mb-2">Meta Tag Description:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData?.metaTagDescription}
            // onChange={(e) =>
            //   handleInputChange(
            //     "General",
            //     "metaTagDescription",
            //     e.target.value
            //   )
            // }
            onChange={(e) =>
              [handleInputChange( "metaTagDescription", e.target.value),
              setFormData({...formData?.metaTagDescription || ""})]
            }
          />
        </div>
      )}

      {activeTab === 2 && (
        <div>
          {/* Model Section */}
          <div>
            <h1 className="text-3xl underline text-gray-700">Model</h1>
            <label className="block mb-2">Model Name:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={formData?.modelName}
              // onChange={(e) =>
              //   handleInputChange("Data", "modelName", e.target.value)
              // }
              onChange={(e) =>
                [handleInputChange( "modelName", e.target.value),
                setFormData({...formData?.modelName || ""})]
              }
            />
            <label className="block mb-2">Stock Keeping Unit(SKU):</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData?.sku}
              // onChange={(e) =>
              //   handleInputChange("Data", "sku", e.target.value)
              // }
              onChange={(e) =>
                [handleInputChange("sku", e.target.value),
                setFormData({...formData.Data?.sku || ""})]
              }
            />{" "}
            <label className="block mb-2">
              Manufacture Part Number(MPN):
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={formData?.mpn}
              // onChange={(e) =>
              //   handleInputChange("Data", "mpn", e.target.value)
              // }
              onChange={(e) =>
                [handleInputChange( "mpn", e.target.value),
                setFormData({...formData?.mpn || ""})]
              }
            />
            <label className="block mb-2">Universal Product Code(UPC):</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData?.upc}
              // onChange={(e) =>
              //   handleInputChange("Data", "upc", e.target.value)
              // }
              onChange={(e) =>
                [handleInputChange( "upc", e.target.value),
                setFormData({...formData?.upc || ""})]
              }
            />
          </div>

          {/* Price Section */}
          <div>
            <h1 className="text-3xl underline text-gray-700">Price</h1>

            <label className="block mb-2">Price:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={formData?.price}
              // onChange={(e) =>
              //   handleInputChange("Data", "price", e.target.value)
              // }
              onChange={(e) =>
                [handleInputChange( "price", e.target.value),
                setFormData({...formData?.price || ""})]
              }
            />
          </div>
          {/* Stock Section */}
          <div>
            <h1 className="text-3xl underline text-gray-700">Stock</h1>

            <label className="block mb-2">Quantity:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={formData?.quantity}
              // onChange={(e) =>
              //   handleInputChange("Data", "quantity", e.target.value)
              // }
              onChange={(e) =>
                [handleInputChange("quantity", e.target.value),
                setFormData({...formData?.quantity || ""})]
              }
            />
            <label className="block mb-2">Minimum Quantity:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={formData?.minimumQuantity}
              // onChange={(e) =>
              //   handleInputChange("Data", "minimumQuantity", e.target.value)
              // }
              onChange={(e) =>
                [handleInputChange("minimumQuantity", e.target.value),
                setFormData({...formData?.minimumQuantity || ""})]
              }
            />
            <label className="block mb-2">Out Of Stock Status:</label>
            <select
              value={formData?.outOfStockStatus}
              // onChange={(e) =>
              //   handleInputChange("Data", "outOfStockStatus", e.target.value)
              // }
              onChange={(e) =>
                [handleInputChange( "outOfStockStatus", e.target.value),
                setFormData({...formData?.outOfStockStatus || ""})]
              }
            >
              <option>---None---</option>
              <option>2-3days</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
              <option>Pre-Order</option>
            </select>
            <label className="block mb-2">Date Available:</label>
            <input
              type="date"
              className="w-full border p-2 rounded mb-4"
              value={formData?.date}
              // onChange={(e) =>
              //   handleInputChange("Data", "date", e.target.value)
              // }
              onChange={(e) =>
                [handleInputChange( "date", e.target.value),
                setFormData({...formData?.date || ""})]
              }
            />
          </div>
        </div>
      )}

      {/* Specification Section */}
      {activeTab === 3 && (
        <div>
          <label className="block mb-2">Dimensions(L X W X H):</label>
          <div className="flex">
            {/* length */}
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={formData?.lengths}
              placeholder="length"
              // onChange={(e) =>
              //   handleInputChange("Specification", "lengths", e.target.value)
              // }
              onChange={(e) =>
                [handleInputChange( "lengths", e.target.value),
                setFormData({...formData?.lengths || ""})]
              }
            />
            {/* width */}
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={formData?.widths}
              placeholder="width"
              // onChange={(e) =>
              //   handleInputChange("Specification", "widths", e.target.value)
              // }
              onChange={(e) =>
                [handleInputChange("widths", e.target.value),
                setFormData({...formData?.widths || ""})]
              }
            />
            {/* height */}
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={formData?.heights}
              placeholder="height"
              // onChange={(e) =>
              //   handleInputChange("Specification", "heights", e.target.value)
              // }
              onChange={(e) =>
                [handleInputChange( "heights", e.target.value),
                setFormData({...formData?.heights || ""})]
              }
            />
          </div>

          <label className="block mb-2">Dimension Class:</label>
          <select
            value={formData?.dimensionClass}
            // onChange={(e) =>
            //   handleInputChange(
            //     "Specification",
            //     "dimensionClass",
            //     e.target.value
            //   )
            // }
            onChange={(e) =>
              [handleInputChange("dimensionClass", e.target.value),
              setFormData({...formData?.dimensionClass || ""})]
            }
          >
            <option>---None---</option>
            <option>Centimeter</option>
            <option>Milimeter</option>
            <option>Inch</option>
          </select>

          <label className="block mb-2">Weight:</label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-4"
            value={formData?.weight}
            // onChange={(e) =>
            //   handleInputChange("Specification", "weight", e.target.value)
            // }

            onChange={(e) =>
              [handleInputChange("weight", e.target.value),
              setFormData({...formData?.weight || ""})]
            }
          />
          <label className="block mb-2">Weight Class:</label>
          <select
            value={formData?.weightClass}
            // onChange={(e) =>
            //   handleInputChange(
            //     "Specification",
            //     "weightClass",
            //     e.target.value
            //   )
            // }
            onChange={(e) =>
              [handleInputChange( "weightClass", e.target.value),
              setFormData({...formData?.weightClass || ""})]
            }
          >
            <option>---None---</option>
            <option>Kilogram</option>
            <option>Gram</option>
            <option>Pound</option>
            <option>Ounce</option>
          </select>

          <label className="block mb-2">Status:</label>
          <select
            value={formData?.status}
            // onChange={(e) =>
            //   handleInputChange("Specification", "status", e.target.value)
            // }
            onChange={(e) =>
              [handleInputChange( "status", e.target.value),
              setFormData({...formData?.status || ""})]
            }
          >
            <option>---None---</option>
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>
      )}

      {/* Image Section */}
      {/* {activeTab === 4 && (
        <div className="container mx-auto my-8 p-8 bg-gray-100 rounded shadow-lg">
          <h2 className="text-2xl font-bold mt-8">Thumbnail Image</h2>
          <input
            type="file"
            value={formData?.thumbnail}
            onChange={handleThumbnailUpload}
            className="mb-4 border border-gray-300 p-2"
          />

          <div className="w-1/4 p-2">
            <img
              src={formData?.thumbnail}
              alt="Thumbnail"
              className="w-full h-32 object-cover rounded"
            />
          </div>

          <h1 className="text-3xl font-bold mb-4">
            Image Upload and Display
          </h1>
          <input
            type="file"
            onChange={handleUpload}
            multiple
            className="mb-4 border border-gray-300 p-2"
          />
          <div className="flex flex-wrap -mx-2">
            {formData.Image &&
              formData.Image.uploadedImages?.map((image, index) => (
                <div key={index} className="relative w-1/4 p-2">
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRemove(index)}
                    title="Remove Image"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
        </div>
      )} */}
    </div>
  </div>
  )
}

    </div>
  );
};

export default ProductList;
