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
      const formattedValue = value.replace(/[^0-9/]/g, '');
      setFormData({ ...formData, [id]: formattedValue });
    } else if (id === 'cvv') {
      if (value.length <= 3) {
        setFormData({ ...formData, [id]: value.replace(/[^0-9]/g, '') });
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
    <div className="container mx-auto p-6 md:p-12 max-w-xl">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Secure Payment</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700" htmlFor="cardholderName">
            Cardholder Name
          </label>
          <input
            className="mt-2 shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 focus:ring-blue-500 focus:border-blue-500"
            id="cardholderName"
            type="text"
            placeholder="John Doe"
            value={formData.cardholderName}
            onChange={handleChange}
          />
          {errors.cardholderName && <p className="text-red-600 text-sm mt-2">{errors.cardholderName}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            className="mt-2 shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 focus:ring-blue-500 focus:border-blue-500"
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <p className="text-red-600 text-sm mt-2">{errors.cardNumber}</p>}
        </div>
        <div className="flex space-x-4 mb-6">
          <div className="w-1/2">
            <label className="block text-lg font-medium text-gray-700" htmlFor="expiryDate">
              Expiry Date (MM/YY)
            </label>
            <input
              className="mt-2 shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 focus:ring-blue-500 focus:border-blue-500"
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              maxLength="5"
            />
            {errors.expiryDate && <p className="text-red-600 text-sm mt-2">{errors.expiryDate}</p>}
          </div>
          <div className="w-1/2">
            <label className="block text-lg font-medium text-gray-700" htmlFor="cvv">
              CVV
            </label>
            <input
              className="mt-2 shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 focus:ring-blue-500 focus:border-blue-500"
              id="cvv"
              type="password"
              placeholder="123"
              value={formData.cvv}
              onChange={handleChange}
              maxLength="3"
            />
            {errors.cvv && <p className="text-red-600 text-sm mt-2">{errors.cvv}</p>}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700" htmlFor="billingAddress">
            Billing Address
          </label>
          <input
            className="mt-2 shadow-sm border border-gray-300 rounded-md w-full py-3 px-4 focus:ring-blue-500 focus:border-blue-500"
            id="billingAddress"
            type="text"
            placeholder="123 Main Street, City, ZIP"
            value={formData.billingAddress}
            onChange={handleChange}
          />
          {errors.billingAddress && <p className="text-red-600 text-sm mt-2">{errors.billingAddress}</p>}
        </div>
        <button
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md w-full hover:bg-blue-700 transition duration-300"
          type="submit"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
