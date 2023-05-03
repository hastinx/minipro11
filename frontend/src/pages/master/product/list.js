import React, { useState } from 'react';
import Navbar from '../../../components/navbar';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatRupiah } from '../../../helper/format';
import { useNavigate } from 'react-router-dom';
const List = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [dropdownCategory, setDropdownCategory] = useState([]);
  const [records, setRecords] = useState(0);
  const [paging, setPaging] = useState([]);
  const [pageNumber, setPN] = useState(1);
  const [number, setNumber] = useState(0);
  const [sort, setSort] = useState(0);
  const [category, setCategory] = useState(0);
  const [product_name, setProductName] = useState('');
  const user = useSelector((state) => state.user);

  const getProducts = async () => {
    console.log(parseInt(sort));
    let uri;
    switch (parseInt(sort)) {
      case 1:
        uri =
          'http://localhost:1234/api/product?page=' +
          pageNumber +
          '&id=' +
          user.id +
          '&order=nama&category=' +
          parseInt(category) +
          '&product_name=' +
          product_name;
        break;
      case 2:
        uri =
          'http://localhost:1234/api/product?page=' +
          pageNumber +
          '&id=' +
          user.id +
          '&order=nama&sort=DESC&category=' +
          parseInt(category) +
          '&product_name=' +
          product_name;
        break;
      case 3:
        uri =
          'http://localhost:1234/api/product?page=' +
          pageNumber +
          '&id=' +
          user.id +
          '&order=price&sort=DESC&category=' +
          parseInt(category) +
          '&product_name=' +
          product_name;
        break;
      case 4:
        uri =
          'http://localhost:1234/api/product?page=' +
          pageNumber +
          '&id=' +
          user.id +
          '&order=price&category=' +
          parseInt(category) +
          '&product_name=' +
          product_name;
        break;
      default:
        uri =
          'http://localhost:1234/api/product?page=' +
          pageNumber +
          '&id=' +
          user.id +
          '&category=' +
          parseInt(category) +
          '&product_name=' +
          product_name;
    }

    console.log(uri);
    try {
      const data = await axios.get(uri);
      console.log(data.data.values);
      setProducts(data.data.values.result);

      let page = Math.ceil(data.data.values.count_data / 9);
      //   console.log(page);
      //   setRecords(page);

      let paginate = [];
      for (let i = 0; i < page; i++) {
        paginate.push({ no: i + 1 });
      }
      console.log(paginate);
      setPaging(paginate);
      setRecords(data.data.values.count_data);
      setPN(parseInt(data.data.values.page));
    } catch (error) {}
  };

  const getCategory = async () => {
    try {
      const result = await axios.get(
        'http://localhost:1234/api/master/category/list'
      );
      setDropdownCategory(result.data.values);
      console.log(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (user.username === '') navigate('/product/list');
    getProducts();
    getCategory();
    setNumber(pageNumber - 1);
  }, [pageNumber, sort, category, product_name, user]);
  return (
    <Navbar title="Product List">
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-3">
          <div className="row">
            <div className="col-md-12">
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="0" selected>
                  Sort
                </option>
                <option value="1">Sort by name a-z</option>
                <option value="2">Sort by name z-a</option>
                <option value="3">Sort by price high-low</option>
                <option value="4">Sort by price low-high</option>
              </select>{' '}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="0" selected>
                  Category
                </option>
                {dropdownCategory.map((i) => (
                  <option value={i.id} key={i.id}>
                    {i.category_name}
                  </option>
                ))}
              </select>{' '}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <input
                type="text"
                class="form-control"
                placeholder="Product Name"
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <span className="fw-bold">
            Page {pageNumber} of {records} data
          </span>
          <button className="btn btn-success">
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
              NO
            </th>
            <th className="text-center" scope="col">
              Name
            </th>
            <th className="text-center" scope="col">
              Description
            </th>
            <th className="text-center" scope="col">
              Category
            </th>
            <th className="text-center" scope="col">
              Quantity
            </th>
            <th className="text-center" scope="col">
              Price
            </th>
            <th className="text-center" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((i, idx) => (
            <tr key={i.id}>
              <th className="text-center" scope="row">
                {(pageNumber - 1) * 9 + (idx + 1)}
              </th>
              <td className="text-wrap" style={{ width: '12rem' }}>
                {i.nama}
              </td>
              <td className="text-wrap" style={{ width: '14rem' }}>
                {i.deskripsi}
              </td>
              <td>{i.category_name}</td>
              <td>{i.qty}</td>
              <td>{formatRupiah(i.price)}</td>
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
      <div id="paginate">
        {pageNumber === 1 ? (
          <button className="btn btn-outline-primary">
            <i className="bi bi-chevron-left"></i>
          </button>
        ) : (
          <button
            className="btn btn-outline-primary"
            onClick={() => setPN(pageNumber - 1)}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        )}
        &nbsp;
        {paging.map((i) =>
          i.no === pageNumber ? (
            <button
              className="btn btn-primary"
              key={i.no}
              onClick={() => setPN(i.no)}
            >
              {i.no}
            </button>
          ) : (
            <button
              className="btn btn-outline-primary"
              key={i.no}
              onClick={() => setPN(i.no)}
            >
              {i.no}
            </button>
          )
        )}
        &nbsp;
        <button
          className="btn btn-outline-primary"
          onClick={() => setPN(pageNumber + 1)}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </Navbar>
  );
};

export default List;
