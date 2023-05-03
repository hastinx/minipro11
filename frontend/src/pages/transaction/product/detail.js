import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../../components/navbar';
import PublicNavbar from '../../../components/publicNavbar';
import { formatRupiah } from '../../../helper/format';

const ProductDetail = () => {
  const [image, setImage] = useState('');
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState([]);
  const data = useLocation();

  useEffect(() => {
    console.log(data);
    setImage(data.state.image);
    setId(data.state.id);
    setName(data.state.nama);
    setPrice(data.state.price);
    setQty(data.state.qty);
    if (data.state.deskripsi !== null)
      setDescription(data.state.deskripsi.split(','));
  }, []);
  return (
    <div className="bg-light vh-100">
      <Navbar title="Product Detail">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <img src={image} alt="" style={{ width: '350px' }} />
                </div>
                <div className="col-md-7">
                  <p className="fs-3 uppercase fw-semibold">{name}</p>
                  <span className="fs-3 text-primary fw-semibold my-2">
                    {formatRupiah(price)}
                  </span>

                  <div className="d-flex mt-4 mb-2">
                    <span className="fw-bold">Quantity : </span>
                  </div>
                  <div className="d-inline mb-3">
                    <button
                      className="btn btn-sm "
                      style={{ boxShadow: '0px 0px 3px 0px #c9c9c0' }}
                    >
                      <i className="bi bi-dash" />
                    </button>
                    <span
                      className="btn btn-sm px-3"
                      style={{ boxShadow: '0px 0px 3px 0px #c9c9c0' }}
                    >
                      0
                    </span>
                    <button
                      className="btn btn-sm "
                      style={{ boxShadow: '0px 0px 3px 0px #c9c9c0' }}
                    >
                      <i className="bi bi-plus" />
                    </button>
                  </div>
                  <div className="d-flex my-3">
                    <span className="fw-bold">
                      Stock : <span className="text-success">{qty}</span>
                    </span>
                  </div>
                  <div className="d-flex gap-3 mt-4">
                    <button className="btn btn-dark">Buy Now</button>
                    <button className="btn btn-outline-dark">
                      Add to wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <span className="text-primary fs-4"> Specification</span>
              <hr />
              {description.length > 0
                ? description.map((i) => (
                    <span>
                      {i}
                      <br />
                    </span>
                  ))
                : "Sorry, this product haven't specification yet ..."}
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default ProductDetail;
