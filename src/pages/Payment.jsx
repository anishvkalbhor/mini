import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from '../contexts/CartContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

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
    const { id, value } = e.target;

    // Add specific logic for expiryDate and cvv
    if (id === 'expiryDate') {
      // Allow only numbers and '/'
      const formattedValue = value.replace(/[^0-9/]/g, '');
      setFormData({ ...formData, [id]: formattedValue });
    } else if (id === 'cvv') {
      // Allow only up to 3 digits
      if (value.length <= 3) {
        setFormData({ ...formData, [id]: value.replace(/[^0-9]/g, '') }); // Allow only digits
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    // Add regex validation for MM/YY format
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (formData.expiryDate && !expiryDatePattern.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format';
    }
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    if (!formData.billingAddress) newErrors.billingAddress = 'Billing address is required';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const docRef = await addDoc(collection(db, 'payments'), {
        cardholderName: formData.cardholderName,
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        billingAddress: formData.billingAddress,
      });
      console.log(`Document written with ID: ${docRef.id}`);
      handleClearCart();
      toast.success('Payment Successful');
    } catch (error) {
      console.error('Error writing document: ', error);
      toast.error('Failed to process payment. Please try again.');
    }
  };

  const handleClearCart = () => {
    clearCart();
    navigate('/Cart');
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
            type="number"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <p className="text-red-500 text-xs italic">{errors.cardNumber}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
            Expiry Date (MM/YY)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="expiryDate"
            type="text"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={handleChange}
            maxLength="5" // Limit input to 5 characters for MM/YY
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
            type="number"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            maxLength="3" // Limit to 3 digits
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
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
