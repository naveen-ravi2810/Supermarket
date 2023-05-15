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
        'token':localStorage.getItem('Token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then((data)=>{
      console.log("New Product Added",data.message);
    });
  };
  

  
  

  return (
    <div className=''>
      <Navbar/>
      <h1 className="bg-red-600 w-auto text-center text-3xl m-auto">Products</h1>
      <button className='border-2 bg-green-200 p-2' onClick={handleAddProduct}>Add Product</button>
      {showAddProduct && <AddProduct onSave={handleSaveProduct} onCancel={handleCancelAddProduct} />}
      <hr className='my-4' />
      {products && products.length > 0 ? (
  products.map(product => (
    <div className='flex justify-center'>
      <ProductBox id={product.Product_Id}/>
    </div>
  ))
) : (
  <h3>There are no products. Kindly add some.</h3>
)}

    </div>
  );
}

function AddProduct({ onSave, onCancel }) {
  const [product_name, setProductName] = useState('');
  const [product_price, setProductPrice] = useState('');
  const [product_url, setProductURL] = useState('');
  const [product_mrp, setProductMRP] = useState('');
  const [product_seller, setProductSeller] = useState('');
  const [product_description, setProductDescription] = useState('');
  const [product_quantity, setProductQuantity] = useState('');
 
  const handleSave = () => {
    const new_product = { product_name, product_price, product_url, product_mrp,product_seller,product_description, product_quantity };
    onSave(new_product);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className='flex justify-center'>
      <div className='fixed'>
      <div className='flex  bg-gray-200  items-center justify-between p-7 rounded-2xl  z-10'>
      <div>
        <form className=''>
          <div className='flex gap-32'>
            <div>
              Enter Product Details Here
            </div>
            <div>
              <button className='border-2 bg-red-500 ' onClick={handleCancel}>Cancel</button>
            </div> 
          </div>
          <div className='py-3 my-3'>
            Product Name:
            <div>
              <input className='w-full p-2 rounded-2xl' type="text" value={product_name} onChange={e => setProductName(e.target.value)} required/>
            </div>
          </div>
          <div className='py-3 my-3'>
            Product Price:
            <div>
              <input className='w-full p-2 rounded-2xl' type="text" value={product_price} onChange={e => setProductPrice(e.target.value)} required/>
            </div>
          </div>
          <div className='py-3 my-3'>
            Image URL:
            <div>
              <input className='w-full p-2 rounded-2xl' type="text" value={product_url} onChange={e => setProductURL(e.target.value)} required/>
            </div>
          </div>
          <div className='py-3 my-3'>
            Product MRP:
            <div>
              <input className='w-full p-2 rounded-2xl' type="text" value={product_mrp} onChange={e => setProductMRP(e.target.value)} required/>
            </div>
          </div>
          <div className='py-3 my-3'>
            Product Seller:
            <div>
            <input className='w-full p-2 rounded-2xl' type="text" value={product_seller} onChange={e => setProductSeller(e.target.value)} required/>
            </div>
          </div>
          <div className='py-3 my-3'>
            Product Description:
            <div>
            <input className='w-full p-2 rounded-2xl' type="text" value={product_description} onChange={e => setProductDescription(e.target.value)} required/>
            </div>
          </div>
          <div className='py-3 my-3'>
            Product Quantity:
            <div>
            <input className='w-full p-2 rounded-2xl' type="text" value={product_quantity} onChange={e => setProductQuantity(e.target.value)} required/>
            </div>
          </div>
          <button className='border-2 bg-green-500 p-2' onClick={handleSave}>Save</button>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Products;

// <div className='items-center justify-between'>
//       <label>
//         Name:
//         <input type="text" className='border-2 w-full rounded-xl p-2 outline-none' value={product_name} onChange={handleNameChange} />
//       </label>
//       <br />
//       <label>
//         Price:
//         <input type="text" className='border-2 w-full rounded-xl p-2 outline-none' value={product_price} onChange={handlePriceChange} />
//       </label>
//       <br />
//       
//       
//       </div>