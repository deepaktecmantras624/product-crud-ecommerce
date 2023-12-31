import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddProduct = () => {
  const [productId, setProductId] = useState(uuidv4());
  const [productData, setProductData] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [fieldErrors, setFieldErrors] = useState({
    productName: "",
    description: "",
    metaTagTitle: "",
    modelName: "",
  });

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
    video: [],
  });

  useEffect(() => {
    const storedData = localStorage.getItem("productFormData");
    if (storedData) {
      setProductData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Load data based on the current product ID
    const currentProduct = productData.find(
      (product) => product.id === productId
    );
    if (currentProduct) {
      setFormData(currentProduct.data);
    }
  }, [productId, productData]);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };
  const handleSave = () => {
    // Validate Product Name
    if (!formData.productName.trim()) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        productName: "Product Name is required",
      }));
      return;
    }
    // Validate Description
    if (!formData.description.trim()) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description is required",
      }));
      return;
    }

    // Validate Meta Tag Title
    if (!formData.metaTagTitle.trim()) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        metaTagTitle: "Meta Tag Title is required",
      }));
      return;
    }

    // // Validate Model Name
    if (!formData.modelName.trim()) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        modelName: "Model Name is required",
      }));
      return;
    }

    const optionId = uuidv4();
    const newOption = {
      id: optionId,
      data: formData,
    };
    setProductData([...productData, newOption]);
    // reset the values
    setFormData({
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
      video: [],
    });

    const optionData =
      JSON.parse(localStorage.getItem("productFormData")) || [];
    // Reset the stored data in localStorage
    localStorage.setItem(
      "productFormData",
      JSON.stringify([...productData, newOption])
    );

    // Clear stored images and thumbnails
    localStorage.removeItem("image");
    localStorage.removeItem("thumbnail");
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
    }));
    // newMedia.find((media) => media.type === "video")?.url || "",
    setFormData((prevData) => ({
      ...prevData,
      uploadedImages: [
        ...(prevData.uploadedImages || []),
        ...newMedia.filter((media) => media.type === "image"),
      ],
      video: [
        ...(prevData.video || []),
        ...newMedia.filter((media) => media.type === "video"),
      ],
    }));

    const storedMedia = JSON.parse(localStorage.getItem("productMedia")) || [];
    localStorage.setItem(
      "productMedia",
      JSON.stringify([...storedMedia, ...newMedia])
    );
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    const thumbnailURL = URL.createObjectURL(file);
    setFormData((prevData) => ({
      ...prevData,
      thumbnail: thumbnailURL,
    }));

    localStorage.setItem("thumbnail", JSON.stringify(thumbnailURL));
  };

  const handleImageRemove = (index) => {
    const updatedMedia = [...formData.uploadedImages];
    updatedMedia.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      uploadedImages: updatedMedia,
    }));
    localStorage.setItem("productMedia", JSON.stringify(updatedMedia));
  };

  const handleVideoRemove = (index) => {
    const updatedVideoMedia = [...formData.video];
    updatedVideoMedia.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      video: updatedVideoMedia,
    }));
    localStorage.setItem("productMedia", JSON.stringify(updatedVideoMedia));
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-gray-100 rounded-md shadow-md text-gray-800">
      <Link
        className="text-blue-500 hover:underline block text-center mb-6"
        href="/productlist"
      >
        Go to Product List
      </Link>

      <div className="flex justify-between items-center mb-4">
        <p className="text-4xl text-blue-700 font-bold">Add Product</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={handleSave}
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
      </div>

      <div>
        {activeTab === 1 && (
          <div>
            <label className="block mb-2">Product Name:</label>
            <input
              type="text"
              className={`w-full border p-2 rounded ${
                fieldErrors.productName ? "border-red-500" : ""
              }`}
              value={formData.productName}
              onChange={(e) => handleInputChange("productName", e.target.value)}
            />
            {fieldErrors.productName && (
              <p className="text-red-500 text-sm">{fieldErrors.productName}</p>
            )}

            <label className="block mb-2">Description:</label>
            <input
              type="text"
              className={`w-full border p-2 rounded ${
                fieldErrors.description ? "border-red-500" : ""
              }`}
              value={formData.description}
              required
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
            {fieldErrors.description && (
              <p className="text-red-500 text-sm">{fieldErrors.description}</p>
            )}

            <label className="block mb-2">Meta Tag Title:</label>
            <input
              type="text"
              className={`w-full border p-2 rounded ${
                fieldErrors.metaTagTitle ? "border-red-500" : ""
              }`}
              value={formData.metaTagTitle}
              required
              onChange={(e) =>
                handleInputChange("metaTagTitle", e.target.value)
              }
            />
            {fieldErrors.metaTagTitle && (
              <p className="text-red-500 text-sm">{fieldErrors.metaTagTitle}</p>
            )}

            <label className="block mb-2">Meta Tag Description:</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData.metaTagDescription}
              onChange={(e) =>
                handleInputChange("metaTagDescription", e.target.value)
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
                className={`w-full border p-2 rounded ${
                  fieldErrors.modelName ? "border-red-500" : ""
                }`}
                required
                value={formData.modelName}
                onChange={(e) => handleInputChange("modelName", e.target.value)}
              />
              {fieldErrors.metaTagTitle && (
                <p className="text-red-500 text-sm">{fieldErrors.modelName}</p>
              )}
              <label className="block mb-2">Stock Keeping Unit(SKU):</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
              />{" "}
              <label className="block mb-2">
                Manufacture Part Number(MPN):
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.mpn}
                onChange={(e) => handleInputChange("mpn", e.target.value)}
              />
              <label className="block mb-2">Universal Product Code(UPC):</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={formData.upc}
                onChange={(e) => handleInputChange("upc", e.target.value)}
              />
            </div>

            {/* Price Section */}
            <div>
              <h1 className="text-3xl underline text-gray-700">Price</h1>

              <label className="block mb-2">Price:</label>
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>
            {/* Stock Section */}
            <div>
              <h1 className="text-3xl underline text-gray-700">Stock</h1>

              <label className="block mb-2">Quantity:</label>
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
              />
              <label className="block mb-2">Minimum Quantity:</label>
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.minimumQuantity}
                onChange={(e) =>
                  handleInputChange("minimumQuantity", e.target.value)
                }
              />
              <label className="block mb-2">Out Of Stock Status:</label>
              <select
                value={formData.outOfStockStatus}
                onChange={(e) =>
                  handleInputChange("outOfStockStatus", e.target.value)
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
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
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
                value={formData.lengths}
                placeholder="length"
                onChange={(e) => handleInputChange("lengths", e.target.value)}
              />
              {/* width */}
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.widths}
                placeholder="width"
                onChange={(e) => handleInputChange("widths", e.target.value)}
              />
              {/* height */}
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                value={formData.heights}
                placeholder="height"
                onChange={(e) => handleInputChange("heights", e.target.value)}
              />
            </div>

            <label className="block mb-2">Dimension Class:</label>
            <select
              value={formData.dimensionClass}
              onChange={(e) =>
                handleInputChange("dimensionClass", e.target.value)
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
              value={formData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
            />
            <label className="block mb-2">Weight Class:</label>
            <select
              value={formData.weightClass}
              onChange={(e) => handleInputChange("weightClass", e.target.value)}
            >
              <option>---None---</option>
              <option>Kilogram</option>
              <option>Gram</option>
              <option>Pound</option>
              <option>Ounce</option>
            </select>

            <label className="block mb-2">Status:</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            >
              <option>---None---</option>
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
        )}

        {/* Image Section */}
        {activeTab === 4 && (
          <div className="container mx-auto my-8 p-8 bg-gray-100 rounded shadow-lg">
            <h2 className="text-2xl font-bold mt-8">Thumbnail Image</h2>
            <input
              type="file"
              onChange={handleThumbnailUpload}
              className="mb-4 border border-gray-300 p-2"
            />

            <div className="w-1/4 p-2">
              {formData.thumbnail && (
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-32 object-cover rounded"
                />
              )}
            </div>

            <h1 className="text-3xl font-bold mb-4">
              Image And Video Upload and Display
            </h1>
            <input
              type="file"
              onChange={handleUpload}
              multiple
              className="mb-4 border border-gray-300 p-2"
            />
            <div className="flex flex-wrap -mx-2">
              {/* Display Images from uploadedImages */}
              {formData.uploadedImages?.map((image, index) => (
                <div key={index} className="relative w-1/4 p-2">
                  <img
                    src={image.url}
                    alt={`Uploaded ${index}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleImageRemove(index)}
                    title="Remove Image"
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Display Video from video */}
              {formData.video?.map((data, index) => (
                <div key={index} className="relative w-1/4 p-2">
                  <video controls width="100%" autoPlay height="20%">
                    <source src={data.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleVideoRemove(index)}
                    title="Remove Video"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
