import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({ car, token }) => {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/car/${car._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Data Deleted Successfully");
        setIsDeleted(true);
      } else {
        toast.error(data.message || 'Failed to delete data')
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Failed to delete data')
    }
  };

  const handleUpdate = () => {
    toast("Please Change What you want to update")
    navigate("/update", { state: { car, token: token } })
  };


  if (isDeleted) {
    return null;
  }

  return (
    <div className="car-item">
      <div className="car-image">
        <img src={car.image} alt={car.title} />
      </div>
      <div className="car-details">
        <h3>{car.title}</h3>
        <p>Brand: {car.brand}</p>
        <p>Color: {car.color}</p>
        <p>Mileage: {car.mileage}</p>
        <p>Price: {car.price}</p>
        <p>Registration Place: {car.registrationPlace}</p>
        <p>Accidents: {car.accidents}</p>
        <p>Previous Buyers: {car.previousBuyers}</p>
        <p>Year: {car.year}</p>
      </div>
      <div className="buttons">
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
        <button className="update-button" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Product;

