import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [auth, setAuth] = useAuth();

  //initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      if (data && data.product && data.product._id) {
        nearService(data?.product._id);
        getSimilarProduct(data?.product._id, data?.product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get nearest service
  const nearService = async (pid) => {
    // try {
    axios
      .post(`${process.env.REACT_APP_API}/api/v1/auth/nearest-service`, {
        latitude: auth.user.latitude,
        longitude: auth.user.longitude,
        pid: pid,
      })
      .then((res) => {
        console.log("DATA ====>", res);
        setProduct(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h2 className="text-center mt-4"> Product Details</h2>
      <div className="row container mt-4">
        <div className="col-md-5">
          {product && product._id && (
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height={"300px"}
              width={"200px"}
            />
          )}
        </div>
        <div className="col-md-5 ">
          <h3 className="mb-4">
            <b>Service : </b>
            {product && product.description}
          </h3>
          <h5>
            <b>Name : </b>
            {product && product.name}
          </h5>
          <h5>
            <b>Price : </b>
            {product && product.price}
          </h5>
          <h5>
            <b>Category : </b>
            {product && product?.category?.name}
          </h5>
          <h5>
            <b>Latitude : </b>
            {product && product?.latitude}
          </h5>
          <h5>
            <b>Longitude : </b>
            {product && product?.longitude}
          </h5>
          <h5>
            <b>Distance : </b>
            {product.dist.calculated.toFixed(2)} km
          </h5>

          <button
            className="btn btn-secondary mt-2 ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem(
                "cart",
                JSON.stringify([{ ...cart, product }])
              );
              toast.success("Item added to cart");
            }}
          >
            ADD TO CART
          </button>
          {/* <button className="btn btn-secondary ms-1">Add to Cart</button> */}
        </div>
      </div>
      <hr />
      <div className="row container">
        <h3>Similar products</h3>
        {relatedProducts.length < 1 && (
          <p className=" text-center">No similar products found</p>
        )}
      </div>
      <div className="d-flex flex-wrap">
        {relatedProducts?.map((p) => (
          <div className="card m-2" style={{ width: "18rem" }}>
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
              className="card-img-top"
              alt={p.name}
            />
            <div className="card-body">
              <h4 className="card-title mb-2">
                {p.description.substring(0, 10)}...
              </h4>
              <p className="card-text m-1">
                <b>Name : </b>
                {p.name}
              </p>
              <p className="card-text m-1">
                <b>Price : </b> ${p.price}
              </p>
              <p className="card-text m-1">
                <b>Latitude : </b> {p.latitude}
              </p>
              <p className="card-text m-1">
                <b>Longitude : </b> {p.longitude}
              </p>
              <button
                className="btn btn-primary ms-1 mt-2"
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                MORE
              </button>
              <button
                className="btn btn-secondary ms-1 mt-2"
                onClick={() => {
                  setCart([...cart, p]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([{ ...cart, p }])
                  );
                  toast.success("Item added to cart");
                }}
              >
                ADD TO CART
              </button>

              {/* <button className="btn btn-secondary ms-1">Add to Cart</button> */}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
