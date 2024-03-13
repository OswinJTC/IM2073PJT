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
    <div style={{ 
      backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/011/835/071/original/sales-printed-blank-receipt-png.png')`,
      backgroundSize: 'cover', 
      height: '100vh',
      weight: '100wh',
      padding: '20px'
    }}>
        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div style={{ fontSize: '30px' }}>
            <p><strong>"History"</strong></p>
        </div>
        <div className='pt-5'></div>
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
            <Link to = "/" >Back to Home</Link>
        </div>
        <footer style={{ 
        position: 'fixed',
        bottom: '0',
        right: '0',
        textAlign: 'right', 
        marginTop: '20px', 
        color: 'gray' 
        }}>
        IM2073 Web Programming
        </footer>
    </div>

    
  )
}

export default History