import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../../../components/navbar';

const ProductInsertForm = () => {
  const [cat_name, setCatName] = useState('');

  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [category_id, setCategoryId] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleInsert = async () => {
    try {
      const data = await axios.post(
        'http://localhost:1234/api/master/category/insert',
        {
          category_name: cat_name,
        }
      );
      Swal.fire(data.data.message);
      document.getElementById('category').value = '';
      navigate('/master/category');
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar title="Insert Form">
        <div className="container">
          <div class="mb-3 row">
            <div className="col-md-6">
              <label class="form-label">Category Name</label>
              <input
                type="email"
                className="form-control border-dark "
                id="category"
                placeholder="Category name"
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>
          </div>
          <div class="mb-3">
            <div className="d-flex gap-3">
              <button
                className="btn btn-success"
                onClick={() => handleInsert()}
              >
                Save
              </button>
              <button
                className="btn btn-dark"
                onClick={() => navigate('/master/product')}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default ProductInsertForm;
