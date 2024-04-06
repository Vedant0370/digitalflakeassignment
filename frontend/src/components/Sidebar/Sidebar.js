import React, { useState, useEffect } from 'react';
import './Sidebar.css'; 
import { FaBars, FaTimes } from 'react-icons/fa'; 
import { FaUser, FaHome, FaClipboardList, FaShoppingBag } from 'react-icons/fa';
import { AiOutlineUserAdd} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
const logo = require('../../assects/logo.jpeg');

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [logoutVisible, setLogoutVisible] = useState(false);

  const toggleLogout = () => {
    setLogoutVisible(!logoutVisible);
  };

  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [productsDropdownVisible, setProductsDropdownVisible] = useState(false);

  const toggleCategoryDropdown = () => {
    setCategoryDropdownVisible(!categoryDropdownVisible);
    setProductsDropdownVisible(false); 
  };

  const toggleProductsDropdown = () => {
    setProductsDropdownVisible(!productsDropdownVisible);
    setCategoryDropdownVisible(false); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <>
           <div className='navbar'>
        <h1 className='text-white fw-bold fs-4'>digital<span className='flake'>flake</span></h1>
        <div className="profile-icon-container" onClick={toggleLogout}>
        <FaUser className="profile-icon text-white fs-3" style={{ cursor: 'pointer' }} />
        {logoutVisible && (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
      </div>

      <div className='sidebar'>
        <div className={`sidebar ${isOpen ? 'active' : ''}`}>
          {(isOpen || window.innerWidth > 768) && (
            <>
              <Link to={"/home"}>
                <a><FaHome />Home</a>
              </Link>

              <div className="btn-group">
                <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaClipboardList className='user-icon' /> Category
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">
                    <Link to={'/addcategory'}>
                      Add Category
                    </Link>
                  </a></li><hr />
                  <li><a className="dropdown-item" href="#">
                    <Link to={'/viewcategory'}>
                      View Category
                    </Link>
                  </a></li>
                </ul>
              </div>

              <div className="btn-group">
                <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaShoppingBag className='user-icon' /> Product
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">
                    <Link to={'/addproduct'}>
                      Add Product
                    </Link>
                  </a></li><hr />
                  <li><a className="dropdown-item" href="#">
                    <Link to={'/viewproduct'}>
                      View Product
                    </Link>
                  </a></li>
                </ul>
              </div>
            </>
          )}
          <button onClick={toggleSidebar} className="toggle-btn">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
