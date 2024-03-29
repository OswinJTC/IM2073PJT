import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';


const Home = ({handleLogout}) => {


  const [products, setProducts] = useState([]);
  const [localStorageData, setLocalStorageData] = useState([]);


  useEffect(()=>{

    const getProducts = async() =>{
      try{
        const response = await api.get(`/productApi/allProducts`);
        const initialProducts = response.data.map(product => ({ ...product, quantity: 0 }));
        setProducts(initialProducts);
      }catch(error){
        console.error(error);
      }
    }

    getProducts();

    const localStorageProducts = JSON.parse(localStorage.getItem('products')) || [];
    setLocalStorageData(localStorageProducts);

  },[]);

  const handleLogoutHome = () => {
    handleLogout();
    localStorage.removeItem('products');
  };

  const handleIncrement = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity:(product.quantity || 0)  + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
  };

  const handleDecrement = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId && product.quantity > 0) {
        return { ...product, quantity: (product.quantity || 0)  - 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
  };

  const handleManualKeyIn = (event, productId) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 0) {
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: value };
        }
        return product;
      });
      setProducts(updatedProducts);
      updateLocalStorage(updatedProducts);
    }
  };

  const updateLocalStorage = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setLocalStorageData(updatedProducts); // Update state with localStorage data
  };

  console.log("LocalStored Product: ",localStorage.getItem("products"));


  return (
    <div style={{ 
      backgroundImage: `url('https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-2458.jpg')`, 
      backgroundSize: 'cover',
      padding: '20px'
    }}>

        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div className='login-title d-flex justify-content-center align-items-center'style={{ fontSize: '42px' }}>
             <span style={{ fontFamily: 'Times New Roman' }}>The Ultimate Saunas</span>
        </div>

            
        <div className='pt-5'></div>

        <div className='merch-row row'>
        {products.map(product => (
          <div key={product.id} className='merch-item col'>
              
              <div style={{ fontSize: '24px'}}>{product?.item}</div>

              <img src={product.imagePath} alt={product.description} />

              <div className='pt-3'></div>

              <div>{product?.description}</div>

              <div className='pt-3'></div>
              <div> 
                  <Link to={`/Product/${product?.item}`}>Product Information</Link>
              </div>
              
              <div className='pt-4'></div>
              

              <div className='quatity-controller'>
                <button onClick={() => handleDecrement(product?.id)}>-</button>
                <input type='text' value={isNaN(product.quantity) ? '' : product.quantity} onChange={(e) => handleManualKeyIn(e, product.id)}/>
                <button onClick={() => handleIncrement(product?.id)}>+</button>
              </div>
              <div className='pt-5'></div>
          </div>
        ))}
        </div>

 
        <div className='pt-5'></div>

        
        

        <div className='to-check-out'>
            <Link to = "/checkout">Checkout</Link>
        </div>

        <div className='pt-5'></div>

        <button type="button" onClick={handleLogoutHome}>Logout</button>

        <div className='pt-5'></div>
        <div className='pt-5'></div>
        <div className='pt-5'></div>

        <div className='to-history'>
            <Link to = "/History">History</Link>
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

export default Home