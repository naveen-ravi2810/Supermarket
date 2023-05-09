import React, { useEffect, useState } from 'react';

function ProductBox(props) {

  var product_id = props.id
  const [Product_data, setProductdata] = useState("");

  useEffect (()=>{
    fetch(`/product/${product_id}`)
    .then(response=>response.json())
    .then(Product_data => setProductdata(Product_data.product_data));
  },[]);

  return (
    <div className="flex w-1/3 border-2 m-5 rounded-2xl shadow-lg p-2" id={props.id}>  
        <div className='flex h-36 w-1/3' >
            <img src={Product_data.Product_url} alt="Product_Image" />
        </div>
        <div className="p-4">
          <p className='text-xl'></p>
            <p className='text-3xl'>{Product_data.Product_Name}</p>
            <p className=''>Rs.{Product_data.Product_Price}</p>
        </div>
    </div>
  )
}

export default ProductBox