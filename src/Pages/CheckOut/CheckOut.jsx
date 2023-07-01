import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";

const CheckOut = () => {
  const service = useLoaderData();
  const { title, _id, price, img } = service;
  const { user } = useContext(AuthContext);

  const handleCheckout = (e) => {
    e.preventDefault();
    const form = e.target;

    const date = form.date.value;
    const name = form.name.value;
    const email = user?.email;
    const orderData = {
      CustomarName: name,
      email,
      date,
      service_id: _id,
      service: title,
      price: price,
      img,
    };
    console.log(orderData);

    fetch("https://car-doctor-server-five-rose.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("Order complete");
        }
      });
  };
  return (
    <div>
      <h2>Book Services: {title} </h2>
      <div className="hero min-h-screen bg-base-200 p-20">
        <form onSubmit={handleCheckout} className="card-body w-full">
          <div className="grid grid-cols-2 gap-5">
            <div className="form-control">
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                name="Name"
                required
              />
            </div>
            <div className="form-control">
              <input
                type="date"
                className="input input-bordered"
                name="date"
                required
              />
            </div>
            <div className="form-control">
              <input
                type="email"
                readOnly
                className="input input-bordered"
                name="email"
                defaultValue={user?.email}
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                readOnly
                className="input input-bordered"
                name="price"
                defaultValue={price}
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Order Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
