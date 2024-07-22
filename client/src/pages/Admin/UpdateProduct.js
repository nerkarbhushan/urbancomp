import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      // setQuantity(data.product.quantity);
      setLatitude(data.product.latitude);
      setLatitude(data.product.longitude);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      setPhoto(data.product.photo);
      // console.log("cate1",data.product)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => {
      if (!id) {
        getSingleProduct();
        // getSinglePhoto();
      }
    },
    // eslint-disable-next-line
    [id]
  );
  // get all category
  const getAllCategory = async () => {
    try {
      // const { data } = await axios.get("/api/v1/category/get-category");
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      // productData.append("quantity", quantity);
      productData.append("latitude", latitude);
      productData.append("longitude", longitude);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      // console.log("cate", category);
      const { data } = axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  // delete product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure, want to delete this product?");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard_CreateProduct"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-2 w-75">
              <Select
                variant={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className=" mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputDescription" className="form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  value={description}
                  placeholder="write description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPrice" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  placeholder="Enter the price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
                <label htmlFor="exampleInputQauntity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div> */}
              <div className="mb-3">
                <label htmlFor="exampleInputLatitude" className="form-label">
                  Latitude
                </label>
                <input
                  type="text"
                  value={latitude}
                  placeholder="Enter latitude"
                  className="form-control"
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputLongitude" className="form-label">
                  Longitude
                </label>
                <input
                  type="text"
                  value={longitude}
                  placeholder="Enter longitude"
                  className="form-control"
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputShipping" className="form-label">
                  Shipping
                </label>
                <div className="mb-3">
                  <Select
                    variant={false}
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping ? "Yes" : "No"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    UPDATE PRODUCT
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn btn-danger" onClick={handleDelete}>
                    DELETE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
