import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Button } from 'react-bootstrap';
import '../Category/Category.css';

const AddProduct = () => {

    const [selectedFile , setSelectedFile] = useState(null)
    const [category, setCategory] = useState('')
    const [product, setProduct] = useState('')
    const [packSize, setPackSize] = useState('')
    const [mrp, setMrp] = useState('')
    const [status, setStatus] = useState('')

    const handleSelectCategory = (event) => {
        setCategory(event.target.value)
    }
    const handleProductName = (event) => {
        setProduct(event.target.value)
    }


    const handleuploadImage = (event) => {
        setSelectedFile(event.target.files[0])
    }


    const handlePackSize= (event) => {
        setPackSize(event.target.value)
    }

    const handleMrp = (event) => {
        setMrp(event.target.value)
    }

    const handleStatus = (event) => {
        setStatus(event.target.value)
    }

    const handleUpload = () => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('image', selectedFile);
          formData.append('category', category);
          formData.append('product', product);
          formData.append('packSize', packSize);
          formData.append('mrp', mrp);
          formData.append('status', status);
          
                // local server api ----> http://localhost:8000
                
          fetch('https://digitalflakeassignment-backend.onrender.com/api/products', {
            method: 'POST',
            body: formData,
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log('Image uploaded Successfully:');
              alert('Product Added Successfully');
            })
            .catch(error => {
              console.error('Error uploading image:', error);
            });
        }
      };
      
      const resetFormFields = () => {
        setSelectedFile(null);
        setCategory('');
        setProduct('');
        setPackSize('');
        setMrp('');
        setStatus('');
    };

    return (
        <>
            <Sidebar />
            <h2 className="text-2xl text-center font-bold mt-5">Add Product</h2>
            <div className="container">
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <div className="custom-select">
                        <select
                            className="form-control"
                            name="category"
                            onChange={handleSelectCategory}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Active">Milk</option>
                            <option value="Inactive">Fruits</option>
                        </select>
                        <div className="select-arrow"></div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="product">Product Name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="product"
                        onChange={handleProductName}
                        placeholder="Product Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="packSize">Pack Size</label>
                    <input
                        className="form-control"
                        type="text"
                        name="packSize"
                        onChange={handlePackSize}
                        placeholder="Pack Size"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mrp">MRP</label>
                    <input
                        className="form-control"
                        type="number"
                        name="mrp"
                        onChange={handleMrp}
                        placeholder="MRP"
                        required
                    />
                </div>

               

                <div className="form-group">
                    <label htmlFor="description">Product Image</label>
                    <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleuploadImage}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <div className="custom-select">
                        <select
                            className="form-control"
                            name="status"
                            onChange={handleStatus}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <div className="select-arrow"></div>
                    </div>
                </div>
            </div>
            <div className="btn-container">
                <div className="button-group">
                    <Button variant="light" className="cancel-button" onClick={resetFormFields}>
                        Cancel
                    </Button>
                    <Button variant="purple" className="save-button" onClick={handleUpload}>
                        Save
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
