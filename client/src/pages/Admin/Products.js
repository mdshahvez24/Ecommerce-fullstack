import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Link } from 'react-router-dom';
import Lay from '../../components/Layout/Lay';

import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Page state
  const [hasMore, setHasMore] = useState(true); // more products available
  const limit = 30; // products per request

  // Fetch products
  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/product/get-product?page=${page}&limit=${limit}`);
      setProducts(prevProducts => [...prevProducts, ...data.products]); // Append new products
      if (data.products.length < limit) {
        setHasMore(false); // If fewer products were returned, no more products are left
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching products.");
    }
    setLoading(false);
  };

 
  useEffect(() => {
    getProducts();
  }, [page]);

  // Load more products when clicked
  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Lay>
      <div className="row dashboard container-fluid m-3 p-3 dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${baseUrl}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <button className='btn btn-primary'>UPDATE PRODUCT</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Show loader while fetching */}
          {loading && <p>Loading...</p>}

          {/* Load More Button */}
          {hasMore && !loading && (
            <button className="btn btn-primary mt-3" onClick={loadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
    </Lay>
  );
};

export default Products;

