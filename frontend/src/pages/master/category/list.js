import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar';

const MasterCategoryList = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const getCategory = async () => {
    try {
      const data = await axios.get(
        'http://localhost:1234/api/master/category/list'
      );
      console.log(data.data.values);
      setCategory(data.data.values);
    } catch (error) {}
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div>
      <Navbar title="Category List">
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-3"></div>
          <div className="d-flex gap-3 align-items-center">
            <button
              className="btn btn-success"
              onClick={() => navigate('/master/category/insert')}
            >
              <i className="bi bi-plus" />
              Tambah
            </button>
          </div>
        </div>
        <hr />
        <table class="table table-bordered table-hover align-middle">
          <thead>
            <tr>
              <th className="text-center" scope="col">
                No
              </th>
              <th className="text-center" scope="col">
                Name
              </th>
              <th className="text-center" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {category.map((i, idx) => (
              <tr key={i.id}>
                <th className="text-center" scope="row">
                  {idx + 1}
                </th>
                <td className="text-wrap" style={{ width: '55rem' }}>
                  {i.category_name}
                </td>
                <td className="text-center">
                  <button className="btn btn-primary">
                    <i className="bi bi-pencil" />
                  </button>
                  &nbsp;
                  <button className="btn btn-danger">
                    <i className="bi bi-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Navbar>
    </div>
  );
};

export default MasterCategoryList;
