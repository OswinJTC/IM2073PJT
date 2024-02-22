import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axiosConfig';

const Checkout = () => {

  const products = JSON.parse(localStorage.getItem("products")) || [];
  const currentUser = localStorage?.getItem("loggedInUserName") || "";

  let sum = 0;

  for(let i=0; i<products.length;i++){
    sum +=  products[i].price * products[i].quantity;
  }

  

  const handlePassPurchase = async () =>{
    try{

        let qty_str = "[";
        let temp = ""

        for(let i=0; i<products.length;i++){
          if(i == products.length-1){
            temp =  products[i].quantity.toString() + "]";
          }else{
            temp =  products[i].quantity.toString() + ",";
          }
          qty_str = qty_str + temp;
        }

        const currentTime = new Date();
    
        const response = await api.post("/purchaseApi/addPurchase", {
            customer: currentUser,
            qty: qty_str,
            total: sum,
            created: currentTime.toISOString()
        })

    }catch(error){
        console.error('資料傳送失敗', error);
    }
  }

  console.log("In cart:", products);
 
 

  return (
    <div>
        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div>
            <p><strong>"Cart"</strong></p>
        </div>

        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div className='Reciept'>
            Hi {currentUser}, this is your order:<br></br><br></br>

        </div>

        <div>
            {products.map((item, index) => (
                <div key={index}>
                    <p>{item?.item}(${item?.price}) : {item?.quantity}</p>
                    
                </div>
            ))}

            <div className='pt-5'></div>

            ---------- Total = ${sum} ----------
            

        </div>



        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div className='to-PurchaseDone'>
            <Link to = "/PurchaseDone" onClick={handlePassPurchase}>確認購買</Link>
        </div>
        
    </div>

    
  )
}

export default Checkout