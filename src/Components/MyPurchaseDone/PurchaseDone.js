import React from 'react'
import { Link } from 'react-router-dom'

const PurchaseDone = () => {
  return (
    <div>
        <div className='pt-5'></div>
        <div className='pt-5'></div>
        
        <div>
            <p><strong>"PurchaseDone"</strong></p>
        </div>

        <div className='pt-5'></div>

        <div className='to-Home'>
            <Link to = "/">返回首頁</Link>

        </div>
    </div>

    
  )
}

export default PurchaseDone