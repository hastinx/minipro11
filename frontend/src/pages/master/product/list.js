import React, { useState } from 'react';
import Navbar from '../../../components/navbar';
import axios from 'axios';
import { useEffect } from 'react';

const List = () => {
  const [products, setProducts] = useState([]);
  const [records, setRecords] = useState(0);
  const [paging, setPaging] = useState([]);
  const [pageNumber, setPN] = useState(1);
  const [number, setNumber] = useState(0);

  const getProducts = async () => {
    try {
      const data = await axios.get(
        'http://localhost:1234/api/product?page=' + pageNumber + '&id=1'
      );
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
      setRecords(data.data.values.count_data)
      setPN(parseInt(data.data.values.page));
    } catch (error) { }
  };

  useEffect(() => {
    getProducts();
    setNumber(pageNumber - 1)
  }, [pageNumber]);
  return (
    <Navbar title="Product List">
      Page {pageNumber} of {records} data
      <table class="table">
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((i, idx) => (

            <tr key={i.id}>
              <th scope="row">{((pageNumber - 1) * 9) + (idx + 1)}</th>
              <td>{i.nama}</td>
              <td>{i.deskripsi}</td>
              <td>{i.category_id}</td>
              <td>{i.qty}</td>
              <td>{i.price}</td>
              <td>
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
          <button className="btn btn-outline-primary"><i className="bi bi-chevron-left"></i></button>
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
