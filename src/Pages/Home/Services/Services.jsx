import React, { useEffect, useRef, useState } from "react";
import ServicesCard from "./ServicesCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [asc, setAsc] = useState(true);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");

  if (loading === true) {
    return (
      <div className="flex justify-center">
        <div>
          <button className="btn loading">Loading</button>
        </div>
      </div>
    );
  }
  useEffect(() => {
    fetch(
      `http://localhost:5000/services?search=${search}&sort=${
        asc ? "asc" : "desc"
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      });
  }, [asc, search]);

  const handleSearch = (event) => {
    console.log(searchRef.current.value);
    setSearch(searchRef.current.value);
  };
  return (
    <div>
      <div className="text-center">
        <h3 className="text-3xl text-range-600 font-bold">Services</h3>
        <h2 className="text-5xl font-bold">Our Services Area</h2>
        <p>
          the majority have suffered alteration in some form, by injected
          humour, <br /> or randomised words which don't look even slightly
          believable.
        </p>
        <div className="form-control">
          <div className="input-group">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search…"
              className="input input-bordered"
            />
            <button onClick={handleSearch} className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setAsc(!asc)}>
          {asc ? "Price: High to low" : "Price: Low to high"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service) => (
          <ServicesCard key={service._id} service={service}></ServicesCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
