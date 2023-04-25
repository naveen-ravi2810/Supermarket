import React from 'react';

function ProductBox() {
  return (
    <div className="flex w-1/2">
        <div className='flex h-36 w-1/2' >
            <img src="https://cdn.shopify.com/s/files/1/1875/5023/products/81aVEokflXL._SL1500_1024x1024.jpg?v=1608287904" alt="Product_Image" />
        </div>
        <div className="p-4">
            <h3>Chinthol Soap</h3>
            <p>Description: The brand new Soap with good flavour . Recommanded from Every Doctors and the new is in offer</p>
            <h4>$0.54</h4>
        </div>
    </div>
  )
}

export default ProductBox