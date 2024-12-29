import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useFetch from '../../hooks/useFetch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '../common/Button';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const OrderPopup = ({ cartItems, price, onClose }) => {
const apiUrl = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    region:'',
    shippingMethod: '',
    shippingAddress: '',
  });

  const [errorx, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, loading, error } = useFetch(`${apiUrl}/api/region/getRegions`);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-red-600">
        Error: {error.message}
      </div>
    );
  }

  const regions = data?.regions || [];
  
  const selectedRegion = regions.find(region => region.name === formData.region);
  const selectedShippingRate = selectedRegion?.shippingRate.find(rate => rate.type === formData.shippingMethod);

  const totalPrice = price + (selectedShippingRate?.price || 0);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/api/order/addOrder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Origin': 'https://kl-collection-2bfskr00f-dina-mechraouis-projects.vercel.app' },
        body: JSON.stringify({
          ...formData,
          totalPrice
        }),
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        onClose(); 
        window.location.reload();
      } else {
        setError(data.message || 'An error occurred');
        console.log(data.message)
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-3 max-h-[95%] overflow-scroll sm:p-6 w-5/6 sm:w-2/3 xl:w-1/3 flex flex-col items-center rounded-md shadow-md relative">
        <button className="absolute top-3 right-3" onClick={onClose}><CloseIcon /> </button>
        <form onSubmit={handleSubmit} className='flex flex-col w-5/6 gap-4'>
          <h2 className="text-lg font-semibold border-b-2 border-[#FF8A3E] self-center">Confirm Your Order</h2>
          <span className='flex flex-col gap-2'>
            <h2 className="text-sm">Personal Information</h2>
            <TextField
              required
              id="outlined-required"
              label="Full Name"
              placeholder='Full Name'
              value={formData.fullName}
              onChange={handleInputChange}
              name='fullName'
              type='text'
            />
            <TextField
              required
              id="outlined-required"
              label="Phone Number"
              placeholder='Phone Number'
              value={formData.phone}
              onChange={handleInputChange}
              name='phone'
              type='tel'
            />
          </span>

          <span className='flex flex-col gap-2'>
            <h2 className="text-sm">Shipping Information</h2>
            <TextField
              required={formData.shippingMethod === 'home'}
              label="Shipping Address"
              placeholder='Shipping Address'
              value={formData.shippingAddress}
              onChange={handleInputChange}
              name='shippingAddress'
              type='text'
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Wilaya"
              value={formData.region}
              onChange={handleInputChange}
              name="region"
              placeholder="Wilaya"
            >
              {regions.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </span>

          <span className='flex items-center gap-3'>
            <h2 className="text-sm">Livraison:</h2>
            <RadioGroup
              row
              value={formData.shippingMethod}
              onChange={handleInputChange}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="shippingMethod"
            >
              <FormControlLabel value="home" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />} label={<Typography sx={{ fontSize: '14px' }}>Home</Typography>} />
              <FormControlLabel value="desk" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />} label={<Typography sx={{ fontSize: '14px' }}>Desk</Typography>} />
            </RadioGroup>
          </span>

          <div>
            <p className="text-sm flex justify-between">
              <span>Product Price:</span>
              <span>{price} DA</span>
            </p>
            <p className="text-sm flex justify-between">
              <span>Delivery Price:</span>
              <span>{selectedShippingRate?.price || 0} DA</span>
            </p>
            <p className="text-sm font-semibold flex justify-between mt-2">
              <span>Total Price:</span>
              <span>{totalPrice} DA</span>
            </p>
          </div>
          <Button text={isSubmitting ? 'Processing...' : 'Place Order'} type="submit" disabled={isSubmitting} py='py-2' px='px-3' />
        </form>
      </div>
    </div>
  );
};

export default OrderPopup;
