import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ViewCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://digitalflakeassignment-backend.onrender.com/api/category')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter(category =>
    category.category_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleDelete = (categoryId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete');
    if (isConfirmed) {
      fetch(`https://digitalflakeassignment-backend.onrender.com/api/category/${categoryId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            alert("Category Deleted Successfully")
          } else {
            console.error('Failed to delete category');
          }
        })
        .catch(error => {
          console.error('Error deleting category:', error);
        });
    }
  };


  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleEdit = (category) => {
    setEditCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditCategory(null);
  };


  const handleSaveEdit = () => {
    fetch(`https://digitalflakeassignment-backend.onrender.com/api/category/${editCategory._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editCategory)
    })
      .then(response => {
        if (response.ok) {
          alert('Category updated successfully');
          setShowModal(false);
          setEditCategory(null);
        } else {
          console.error('Failed to update category');
        }
      })
      .catch(error => {
        console.error('Error updating category:', error);
      });
  };
  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <div className="form-group">
          <h1 className="view-category fw-bold">Category</h1>
        </div>
        <div className="form-group">
          <input
            className="form-control text-black"
            type="search"
            name="category"
            placeholder="Search By Category Name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="form-group view-cat">
          <Link to={"/addcategory"}>

            <Button variant="purple" className="save-button">
              Add New
            </Button>
          </Link>
        </div>


        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr className='bg-warning'>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center font-bold fs-4">Category Not found</td>
                </tr>
              ) : (
                filteredCategories.map(category => (
                  <tr key={category._id} className='all-data'>
                    <td>{category._id}</td>
                    <td>{category.category_Name}</td>
                    <td>{category.category_Des}</td>
                    <td className={category.category_Status === 'Active' ? 'text-success' : 'text-danger'}>
                      {category.category_Status}
                    </td>
                    <td className='edit-delete fs-5 text-secondary'>
                      <FaEdit className="edit-icon" onClick={() => handleEdit(category)} />
                    </td>
                    <td className='edit-delete fs-5 text-secondary'>
                      <FaTrash className="delete-icon" onClick={() => handleDelete(category._id)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>



      </div>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              className="form-control"
              id="categoryName"
              value={editCategory ? editCategory.category_Name : ''}
              onChange={(e) => setEditCategory({ ...editCategory, category_Name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryDescription">Category Description</label>
            <input
              type="text"
              className="form-control"
              id="categoryDescription"
              value={editCategory ? editCategory.category_Des : ''}
              onChange={(e) => setEditCategory({ ...editCategory, category_Des: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryStatus">Category Status</label>
            <select
              className="form-control"
              id="categoryStatus"
              value={editCategory ? editCategory.category_Status : ''}
              onChange={(e) => setEditCategory({ ...editCategory, category_Status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" className="cancel-button" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="purple" className="save-button" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default ViewCategory;
