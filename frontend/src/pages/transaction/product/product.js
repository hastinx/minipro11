import React, { useEffect, useState } from 'react';
import PublicNavbar from '../../../components/publicNavbar';
import axios from 'axios';
import { formatRupiah } from '../../../helper/format';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/navbar';

const ProductToSell = () => {
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState(0);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        'http://localhost:1234/api/transaction/product'
      );

      console.log(res);
      setProduct(res.data.values);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="bg-light">
      <Navbar title="Our Product">
        <div className="container d-flex flex-wrap">
          {product.map((i) => (
            <div
              class="card m-2"
              style={{ width: '18rem' }}
              key={i.id}
              onMouseEnter={() => {
                setShow(true);
                setPosition(i.id);
              }}
              onMouseLeave={() => {
                setShow(false);
                setPosition(0);
              }}
            >
              <img src={i.image} class="card-img-top" alt="..." />
              <div class="card-body">
                <div className="d-flex justify-content-center my-2">
                  <Link
                    to="/product/detail"
                    state={i}
                    className={`btn btn-outline-dark ${
                      show && position === i.id ? '' : 'd-none'
                    }`}
                  >
                    View Product
                  </Link>
                </div>

                <p class="card-text fw-bold">{i.nama}</p>
                <span className="text-primary fw-semibold">
                  {formatRupiah(i.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Navbar>
    </div>
  );
};

export default ProductToSell;
