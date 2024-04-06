import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Button } from 'react-bootstrap';
import './Category.css';

const AddCategory = () => {
    const initialFormData = {
        category: '',
        description: '',
        status: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category_Name: formData.category,
                    category_Des: formData.description,
                    category_Status: formData.status
                })
            });
            if (response.ok) {
                alert('Category added successfully');
                setFormData(initialFormData);
            } else {
                console.error('Failed to add category');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        setFormData(initialFormData);
    };

    return (
        <>
            <Sidebar />
            <h2 className="text-2xl text-center font-bold mt-5">Add Category</h2>
            <div className="container">
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        className="form-control"
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        className="form-control"
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <div className="custom-select">
                        <select
                            className="form-control"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
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
                    <Button variant="light" className="cancel-button" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="purple" className="save-button" onClick={handleSubmit}>
                        Save
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AddCategory;
