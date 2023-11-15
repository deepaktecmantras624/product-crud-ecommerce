// pages/edit/[id].js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EditProduct = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  const [editedProduct, setEditedProduct]=useState(null)
  console.log("🚀 ~ file: [id].js:15 ~ EditProduct ~ editedProduct:", editedProduct)
 
  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  
  useEffect(() => {
    const productDetails = JSON.parse(localStorage.getItem('productFormData')) || [];
    const selectedProduct = productDetails.find((product) => product.id === id);
    setProduct(selectedProduct);
    
    // Initialize editedProduct state with the product data
    setEditedProduct(selectedProduct ? { ...selectedProduct.data } : null);
  }, [id]);


// ------------------------3.1

console.log("🚀 ~ file: [id].js:42 ~ handleSaveEdit ~ product:", product)
const handleSaveEdit = () => {
    if (editedProduct) {
      // Update the product in the localStorage
      const storedProducts = JSON.parse(localStorage.getItem('productFormData')) || [];

      const updatedProducts = storedProducts.map((storedProduct) =>
        storedProduct.id === id ? { ...storedProduct, data: { ...storedProduct.data, ...editedProduct } } : storedProduct
      );

      localStorage.setItem('productFormData', JSON.stringify(updatedProducts));

      // Update the product in the state
      setProduct((prevProduct) => ({
        ...prevProduct,
        data: { ...prevProduct.data, ...editedProduct },
      }));

      // Redirect to the product list page
      router.push('/productlist');
    }
  };
  
//   --------------------
  if (!product) {
    return <div>Loading...</div>;
  }

  // Render the edit form using the product details
  return (
    <div>
      <h1>Edit Product - {id}</h1>

      <Link
        className="text-blue-500 hover:underline block text-center mb-6"
        href="/productlist"
      >
        Go to Product List
      </Link>
      <Link
        className="text-blue-500 hover:underline block text-center mb-6"
        href="/addproduct"
      >
        Go to Add Product
      </Link>

      {
  product && (
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
            value={editedProduct?.productName || ""}
            // onChange={(e) => setEditedProduct({ ...editedProduct, productName: e.target.value })}
            onChange={(e) => setEditedProduct({
                ...editedProduct,
                productName: e.target.value,
              })} 
          />
          <label className="block mb-2">Description:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={editedProduct?.description || ""}
           
            onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
          />
          <label className="block mb-2">Meta Tag Title:</label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-4"
            value={editedProduct?.metaTagTitle || ""}
            
            onChange={(e) => setEditedProduct({ ...editedProduct, metaTagTitle: e.target.value })}

          />
          <label className="block mb-2">Meta Tag Description:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={ editedProduct?.metaTagDescription || ""}
          
            onChange={(e) => setEditedProduct({ ...editedProduct, metaTagDescription: e.target.value })}
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
              value={ editedProduct?.modelName || ""}
              
              onChange={(e) => setEditedProduct({ ...editedProduct, modelName: e.target.value })}

            />
            <label className="block mb-2">Stock Keeping Unit(SKU):</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={ editedProduct?.sku || ""}
            
              onChange={(e) => setEditedProduct({ ...editedProduct, sku: e.target.value })}

            />{" "}
            <label className="block mb-2">
              Manufacture Part Number(MPN):
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={editedProduct?.mpn || ""}
              
              onChange={(e) => setEditedProduct({ ...editedProduct, mpn: e.target.value })}

            />
            <label className="block mb-2">Universal Product Code(UPC):</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={ editedProduct?.upc || ""}
              
              onChange={(e) => setEditedProduct({ ...editedProduct, upc: e.target.value })}

            />
          </div>

          {/* Price Section */}
          <div>
            <h1 className="text-3xl underline text-gray-700">Price</h1>

            <label className="block mb-2">Price:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={ editedProduct?.price || ""}
             
              onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}

            />
          </div>
          {/* Stock Section */}
          <div>
            <h1 className="text-3xl underline text-gray-700">Stock</h1>

            <label className="block mb-2">Quantity:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={ editedProduct?.quantity || ""}
             
              onChange={(e) => setEditedProduct({ ...editedProduct, quantity: e.target.value })}

            />
            <label className="block mb-2">Minimum Quantity:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={ editedProduct?.minimumQuantity || ""}
            
              onChange={(e) => setEditedProduct({ ...editedProduct, minimumQuantity: e.target.value })}

            />
            <label className="block mb-2">Out Of Stock Status:</label>
            <select
              value={ editedProduct?.outOfStockStatus || ""}
             
              onChange={(e) => setEditedProduct({ ...editedProduct, outOfStockStatus: e.target.value })}

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
              value={ editedProduct?.date || ""}
           
              onChange={(e) => setEditedProduct({ ...editedProduct, date: e.target.value })}

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
              value={ editedProduct?.lengths || ""}
              placeholder="length"
              
              onChange={(e) => setEditedProduct({ ...editedProduct, lengths: e.target.value })}

            />
            {/* width */}
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={ editedProduct?.widths || ""}
              placeholder="width"
             
              onChange={(e) => setEditedProduct({ ...editedProduct, widths: e.target.value })}

            />
            {/* height */}
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={ editedProduct?.heights || ""}
              placeholder="height"
           
              onChange={(e) => setEditedProduct({ ...editedProduct, heights: e.target.value })}

            />
          </div>

          <label className="block mb-2">Dimension Class:</label>
          <select
            value={editedProduct?.dimensionClass || ""}
          
            onChange={(e) => setEditedProduct({ ...editedProduct, dimensionClass: e.target.value })}

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
            value={editedProduct?.weight || ""}
            

            onChange={(e) => setEditedProduct({ ...editedProduct, weight: e.target.value })}

          />
          <label className="block mb-2">Weight Class:</label>
          <select
            value={editedProduct?.weightClass || ""}
          
            onChange={(e) => setEditedProduct({ ...editedProduct, weightClass: e.target.value })}

          >
            <option>---None---</option>
            <option>Kilogram</option>
            <option>Gram</option>
            <option>Pound</option>
            <option>Ounce</option>
          </select>

          <label className="block mb-2">Status:</label>
          <select
            value={editedProduct?.status || ""}
           
            onChange={(e) => setEditedProduct({ ...editedProduct, status: e.target.value })}

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
            value={product?.thumbnail}
            onChange={handleThumbnailUpload}
            className="mb-4 border border-gray-300 p-2"
          />

          <div className="w-1/4 p-2">
            <img
              src={product?.thumbnail}
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
            {product.Image &&
              product.Image.uploadedImages?.map((image, index) => (
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
      )}  */}
    </div>
  </div>
  )
}
    </div>
  );
};

export default EditProduct;