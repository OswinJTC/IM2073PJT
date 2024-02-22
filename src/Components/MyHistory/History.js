import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axiosConfig';

const History = () => {

  const [purchase, setPurchase] = useState([]);
  const currentUser = localStorage?.getItem("loggedInUserName") || "";
  const products = JSON.parse(localStorage.getItem("products")) || [];

  useEffect(()=>{

    const getPurchase = async() =>{
        try{
          const response = await api.get(`/purchaseApi/allPurchases`);
          setPurchase(response.data);
        }catch(error){
          console.error(error);
        }
      }

      getPurchase();

  },[])
 
  

  let historySum = 0;
  let marker = 0;
  let productStr = "["
  let temp = "";

  for(let i=0; i<products.length;i++){
    if(i == products.length-1){
      temp = products[i].item + "]";
    }else{
      temp = products[i].item + ",";
    }
    productStr += temp;
  }

  for(let i=0; i<purchase.length;i++){
    if(currentUser === purchase[i].customer){
      historySum += purchase[i].total;
    }
  }

  

  

  


   
  return (
    <div>
        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div>
            <p><strong>"Checkout"</strong></p>
        </div>

        <div>

            <div className='Reciept'>
                    Hi {currentUser}, this is your past purchase(s):<br></br><br></br>
                    {productStr}<br></br><br></br>
            </div>

        

            {purchase?.map((item, index) => (

              item.customer === currentUser &&(
                  <div key={index}>
                      <p>({++marker}.) {item?.created} --- {item?.qty} ______ (${item?.total})  </p>    
                  </div>
              )
            ))}


            <div className='Reciept'>
                    Thanks!! You have spent ${historySum} in our shop!!
            </div>


            
        </div>

       



        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div className='to-Home'>
            <Link to = "/" >回首頁</Link>
        </div>
        
    </div>

    
  )
}

export default History