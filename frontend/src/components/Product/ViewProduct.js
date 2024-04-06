import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Button, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (productId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    if (isConfirmed) {
      fetch(`http://localhost:8000/api/products/${productId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            alert('Product Deleted Successfully');
            setProducts(products.filter(product => product._id !== productId));
          } else {
            console.error('Failed to delete product');
          }
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditProduct(null);
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:8000/api/products/${editProduct._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editProduct)
    })
      .then(response => {
        if (response.ok) {
          alert('Product updated successfully');
          setShowModal(false);
          setEditProduct(null);
        } else {
          console.error('Failed to update product');
        }
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <div className="form-group">
          <h1 className="view-category fw-bold">Products</h1>
        </div>
        <div className="form-group">
          <input
            className="form-control text-black"
            type="search"
            name="product"
            placeholder="Search By Product Name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="form-group view-cat">
          <Link to="/addproduct">
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
                <th>Pack Size</th>
                <th>Category</th>
                <th>MRP</th>
                <th>Image</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center font-bold">Products Not found</td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product._id} className='all-data'>
                    <td>{product._id}</td>
                    <td>{product.product}</td>
                    <td>{product.packSize}</td>
                    <td>{product.category}</td>
                    <td>{product.mrp}</td>
                    <td><img src={product.product_img} style={{height:"5vh"}}/></td>
                    <td className={product.status === 'Active' ? 'text-success' : 'text-danger'}>
                      {product.status}
                    </td>
                    <td className='edit-delete fs-5 text-secondary'>
                      <FaEdit className="edit-icon" onClick={() => handleEdit(product)} />
                    </td>
                    <td className='edit-delete fs-5 text-secondary'>
                      <FaTrash className="delete-icon" onClick={() => handleDelete(product._id)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={editProduct ? editProduct.product : ''}
                onChange={(e) => setEditProduct({ ...editProduct, product: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productDescription">Pack Size</label>
              <input
                type="text"
                className="form-control"
                id="productDescription"
                value={editProduct ? editProduct.packSize : ''}
                onChange={(e) => setEditProduct({ ...editProduct, packSize: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                value={editProduct ? editProduct.category : ''}
                onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mrp">MRP</label>
              <input
                type="text"
                className="form-control"
                id="mrp"
                value={editProduct ? editProduct.mrp : ''}
                onChange={(e) => setEditProduct({ ...editProduct, mrp: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="productStatus">Product Status</label>
              <select
                className="form-control"
                id="productStatus"
                value={editProduct ? editProduct.status : ''}
                onChange={(e) => setEditProduct({ ...editProduct, status: e.target.value })}
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
      </div>
    </>
  );
};

export default ViewProduct;
