import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import CardBox from "../components/CardBox";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAPIData = async (query = "nature") => {
    const API_KEY = "4LNA6IrDAIJbvOI0ZaVasSgi2zyNKcsLVXcyCMtWDTHFh3gF6868NYn9";
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://api.pexels.com/v1/search", {
        headers: {
          Authorization: API_KEY,
        },
        params: {
          query,
          per_page: 6,
        },
      });
      setData(res.data.photos || []);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPIData();
  }, []);
  console.log(data);
  return (
    <div className="w-full h-full flex justify-center items-center flex-col overflow-x-hidden">
      <div className="mt-32 mb-10">
        <Search onSearch={fetchAPIData} />
      </div>
      <div className="mt-20">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <CardBox data={data} />
        )}
      </div>
    </div>
  );
};

export default Home;
