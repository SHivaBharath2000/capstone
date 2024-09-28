import React, { useState } from 'react';
import { addEquipment } from '../../API/auth';
import { useNavigate} from 'react-router-dom';

const Addequipment = () => {
  const [formData, setFormData] = useState({
    src: '',
    equipmentName: '',
    description: '',
    rentRates: ''
  });
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const data = await addEquipment(formData);
      if (data.code === 1) {
        alert("Equipment added successfully");
        navigate("/Equipment")
      } else {
        alert("Not added");
      }
    } catch (error) {
      console.error("Error adding equipment:", error);
      alert("An error occurred while adding the equipment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label className='addequip-label'>
        Equipment Name:
        <input type="text" name="equipmentName" value={formData.equipmentName} onChange={handleChange} />
      </label>
      <label className='addequip-label'>
        Equipment Image:
        <input type="text" name="src" value={formData.src} onChange={handleChange} />
      </label>
      <label className='addequip-label'>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <label className='addequip-label'>
        Amount:
        <input type="text" name="rentRates" value={formData.rentRates} onChange={handleChange} />
      </label>
      <button className='save-button' type="submit">Add</button>
    </form>
  );
};

export default Addequipment;
