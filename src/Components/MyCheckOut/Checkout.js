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
        console.error('Failed to send data', error);
    }
  }

  console.log("In cart:", products);
 
 

  return (
    <div style={{ 
      backgroundImage: `url('https://images.unsplash.com/photo-1605184861755-8f190fea96a5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGluayUyMGdyYWRpZW50fGVufDB8fDB8fHww')`,
      backgroundSize: 'cover', 
      height: '100vh',
      weight: '100wh',
      padding: '20px'
    }}>
        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div className='login-title d-flex justify-content-center align-items-center'style={{ fontSize: '36px' }}>
             Cart
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
            <Link to = "/PurchaseDone" onClick={handlePassPurchase}>Confirm Payment</Link>
        </div>
        <footer style={{ 
        position: 'fixed',
        bottom: '0',
        right: '0',
        textAlign: 'right', 
        marginTop: '20px', 
        color: '#fff' 
        }}>
        IM2073 Web Programming
        </footer>
    </div>

    
  )
}

export default Checkout