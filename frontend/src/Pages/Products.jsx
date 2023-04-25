import React, { useState, useEffect } from 'react';
import ProductBox from '../Components/ProductBox';

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

  const handleDeleteProduct = (productId) => {
    
    fetch(`/delete_product/${productId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then((data)=>{
      alert(data.message);
  

      if (data.success) {
        setProducts(prevProducts => prevProducts.filter(product => product.Product_Id !== productId));
      }
    });
  };
  
  

  return (
    <div>
      <h1 className="bg-red-600 w-auto text-center text-3xl m-auto">Products</h1>
      <button onClick={handleAddProduct}>Add Product</button>
      {showAddProduct && <AddProduct onSave={handleSaveProduct} onCancel={handleCancelAddProduct} />}
      {products && products.length > 0 ? (
        // <ul>
        //   {products.map((product) => (
        //     <li key={product.Product_Id}>
        //       {product.Product_Name} - {product.Product_Price} - <button onClick={() => handleDeleteProduct(product.Product_Id)}>Delete</button>
        //     </li>
        //   ))}
        // </ul>
        <div>
          <table className="w-full text-center border-red-600">
            <tr>
              <th>Product Name</th> 
              <th>Product Price</th>
              <th>Add to cart</th>
            </tr>
            {products.map(product => (
            <tr key={product.id}>
              <td className="bg-orange-600">{product.Product_Name}</td>
              <td className="bg-blue-800">{product.Product_Price}</td>
            </tr>
            ))}
          </table>
        </div>
      ) : (
        <h3>There are no products. Kindly add some.</h3>
      )}
      <ProductBox/>
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
