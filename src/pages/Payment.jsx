import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from '../contexts/CartContext';

const Payment = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    if (!formData.billingAddress) newErrors.billingAddress = 'Billing address is required';
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Payment Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardholderName">
            Cardholder Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cardholderName"
            type="text"
            placeholder="Cardholder Name"
            value={formData.cardholderName}
            onChange={handleChange}
          />
          {errors.cardholderName && <p className="text-red-500 text-xs italic">{errors.cardholderName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cardNumber"
            type="text"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <p className="text-red-500 text-xs italic">{errors.cardNumber}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
            Expiry Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="expiryDate"
            type="text"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={handleChange}
          />
          {errors.expiryDate && <p className="text-red-500 text-xs italic">{errors.expiryDate}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
            CVV
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cvv"
            type="text"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
          />
          {errors.cvv && <p className="text-red-500 text-xs italic">{errors.cvv}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="billingAddress">
            Billing Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="billingAddress"
            type="text"
            placeholder="Billing Address"
            value={formData.billingAddress}
            onChange={handleChange}
          />
          {errors.billingAddress && <p className="text-red-500 text-xs italic">{errors.billingAddress}</p>}
        </div>
        <button
          className="bg-blue-600/80 text-white px-6 py-2 rounded-lg hover:bg-blue-700/90 transition"
          type="submit"
          onClick={() => {
            
            navigate('/Cart');
            handleClearCart();
            toast.success('Payment Successful');
          }}
          >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
