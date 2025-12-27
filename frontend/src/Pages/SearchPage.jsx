
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cards from "../components/Cards";

function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("q");

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get("/search/collection", {
        params: { query, page },
      });

      setData((prev) => [...prev, ...response.data.results]);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    if (page > 1) fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-16">
      <div className="lg:hidden my-2 mx-2 mt-4 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="Search here..."
          value={query || ""}
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className="px-4 py-1 w-full bg-white h-10 text-black rounded-full"
        />
      </div>

      <div className="container mx-auto">
        <h3 className="text-lg lg:text-xl font-bold my-3 text-red-600 ml-3">
          Search Result
        </h3>

        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
          {data.map((item) => (
            <Cards
              key={item.id}
              data={item}
              media_type="collection"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
