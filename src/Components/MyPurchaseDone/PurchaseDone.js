import React from 'react'
import { Link } from 'react-router-dom'

const PurchaseDone = () => {
  return (
    <div style={{ 
      backgroundImage: `url('https://www.ipadwallpaper.org/wp-content/uploads/2021/01/Pink-gradient-background-iPad-Wallpaper-2732x2732.jpg')`,
      backgroundSize: 'cover', 
      height: '100vh',
      weight: '100wh',
      padding: '20px'
    }}>
        <div className='pt-5'></div>
        <div className='pt-5'></div>
        
        <div className='login-title d-flex justify-content-center align-items-center'style={{ fontSize: '36px' }}>
             Thanks for Shopping with The Ultimate Saunas!
        </div>

        <div className='pt-5'></div>

        <div className='to-Home'>
            <Link to = "/">Return to Home</Link>

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

export default PurchaseDone