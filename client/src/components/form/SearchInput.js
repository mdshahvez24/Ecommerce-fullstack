
import React, { useState } from "react";
import { useSearch } from "../../components/context/Search";
// import axios from "../../axiosInstance";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNoResults(false);
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/product/search/${values.keyword}`);
      if (data.length === 0) {
        setNoResults(true);
      }
      setValues({ ...values, results: data, keyword: "" });
      navigate("/search");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {loading && <div className="mt-2">Loading...</div>}
      {error && <div className="mt-2 text-danger">{error}</div>}
      {noResults && <div className="mt-2 text-warning">No results found.</div>}
    </div>
  );
};

export default SearchInput;
