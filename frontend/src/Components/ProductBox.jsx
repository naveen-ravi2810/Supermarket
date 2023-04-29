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
    <div className="flex w-1/2">
        <div className='flex h-36 w-1/2' >
            <img src="{Product_data.Product_Url}" alt="Product_Image" />
        </div>
        <div className="p-4">
          <h4 className='text-xl'>{props.id}</h4>
            <h2 className='text-3xl'>{Product_data.Product_Name}</h2>
        </div>
    </div>
  )
}

export default ProductBox