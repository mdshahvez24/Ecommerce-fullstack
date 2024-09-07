import React from 'react';
import Lay from './../components/Layout/Lay';
import { useSearch } from '../components/context/Search';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../components/context/cart"
import toast from 'react-hot-toast'
import "../style/Search.css";

const Search = () => {
  const navigate = useNavigate()
    const [values, setValues] = useSearch();
    const [cart,setCart] = useCart()
    
  return (
    <Lay title={"Search results"}>
      <div className="container-fluid ">
        <div className="text-center card-page">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap m-4">
            {values?.results.map((p) => (
              <div className="card m-2">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Lay>
  );
};

export default Search;
