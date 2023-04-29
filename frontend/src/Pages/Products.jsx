import React, { useState, useEffect } from 'react';
import ProductBox from '../Components/ProductBox';
import Navbar from '../Components/Navbar';

function Products() {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(()=>{
    fetch('/products')
    .then(response => response.json())
    .then((data)=>{
      setProducts(data.products);
    });
  },[]);

  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleCancelAddProduct = () => {
    setShowAddProduct(false);
  };

  const handleSaveProduct = (product) => {
    fetch('/add_product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then((data)=>{
      alert(data.message);
  
      
      if (data.success) {
        setShowAddProduct(false);
        
        fetch('/products')
        .then(response => response.json())
        .then((data)=>{
          setProducts(data.products);
        });
      }
    });
  };

  
  

  return (
    <div>
      <Navbar/>
      <h1 className="bg-red-600 w-auto text-center text-3xl m-auto">Products</h1>
      <button onClick={handleAddProduct}>Add Product</button>
      {showAddProduct && <AddProduct onSave={handleSaveProduct} onCancel={handleCancelAddProduct} />}
      {products && products.length > 0 ? (
  products.map(product => (
    <ProductBox id={product.Product_Id}/>
  ))
) : (
  <h3>There are no products. Kindly add some.</h3>
)}

    </div>
  );
}

function AddProduct({ onSave, onCancel }) {
  const [product_name, setName] = useState('');
  const [product_price, setPrice] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSave = () => {
    const new_product = { product_name, product_price };
    onSave(new_product);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <h2 className="caret-yellow-400">Add Product</h2>
      <label>
        Name:
        <input type="text" value={product_name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Price:
        <input type="text" value={product_price} onChange={handlePriceChange} />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default Products;
