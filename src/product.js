import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Form, Button } from 'react-bootstrap';

function Product() {
  let navigate = useNavigate();
  const [tempProducts, setTempProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  if (!localStorage.getItem('token')) {
    navigate('/');
  }
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    const input = value.toLowerCase();
    let res = [];
    res = products.filter((d) => {
      return d.name.toLowerCase().search(input) !== -1;
    });
    setTempProducts(res);
  };
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/products', {
        headers: headers
      })
      .then((response) => {
        setProducts(response.data.data);
        setTempProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const logout = () => {
    localStorage.setItem('token', '');
    navigate('/');
  };
  return (
    <>
      <h3>Product List</h3>
      <Button type="button" onClick={() => logout()}>
        Logout
      </Button>
      <Form.Group className="mb-3" controlId="search">
        <Form.Control
          type="text"
          placeholder="Search Products"
          onChange={(e) => handleInputChange(e)}
        />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {tempProducts &&
            tempProducts.map((d, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{d.name}</td>
                  <td>{d.description}</td>
                  <td>{d.price}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <h1>Product page</h1>
    </>
  );
}
export default Product;
