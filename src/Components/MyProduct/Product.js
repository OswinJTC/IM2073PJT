import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Updated to include useEffect
import api from '../../api/axiosConfig';
import './Product.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = () => {

  const [reviewText, setReviewText] = useState('');
  const [allReviews, setAllReviews] = useState([]);
  const productName = useParams().item;
  const currentUser = localStorage?.getItem("loggedInUserName") || "";
  const navigate = useNavigate();

  const goBackHome = ()=>{
    navigate("/");
  }

  const getAllReviews = async () => {

    try {
      const response = await api.get("/reviewApi/allReviews")
      setAllReviews(response.data);

    } catch (error) {
      console.error("評論讀去失敗", error);
    }

  }

  useEffect(() => { // Changed from useState to useEffect

    getAllReviews();

  }, []);


  const handleChange = (e) => {
    setReviewText(e.target.value);
  };

  const reviewSubmit = async () => {

    const currentTime = new Date();

    try {

      const response = await api.post("/reviewApi/addReview", {
        author: currentUser,
        body: reviewText,
        product_id: productName,
        created: currentTime
      })

      getAllReviews();
      setReviewText("");

      console.log('留言發送成功！！！');

    } catch (error) {
      console.error('留言發送失敗...', error);

    }

  };

  return (
    <div>

    
      <div className="pt-3 backHome">
          <button type="button" onClick={goBackHome}>回首頁</button>
      </div>

      <div className='pt-5'></div>
      <div className='pt-5'></div>

      <div>
        <p><strong>"{productName}"</strong></p>
      </div>

      

      <div className='pt-5'></div>
      <div className='pt-5'></div>

      <div className='Reciept'>
        [         .============ ===<br></br>
        =======<br></br>
        ========= ==<br></br>
        ========= ==]<br></br><br></br><br></br>

      </div>

      <div>
        <input
          type="text"
          value={reviewText}
          onChange={handleChange}
          placeholder="Enter your review"
        />
        <button onClick={reviewSubmit}>Submit Review</button>
      </div>

      <div className='pt-5'></div>

      <div className='all-the-user-reviews'>
        {allReviews && allReviews.length === 0 ? (
          <div>No reviews available.</div>
        ) : (
          allReviews &&
          allReviews.map((r, index) => (
            r?.product_id === productName && (
              <div key={index} className="row review-container">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <div className='review-row'>
                    <h3 style={{ fontWeight: 'bold', marginRight: '10px', display: 'inline' }}>{r?.author}</h3>
                    <h6 style={{ fontSize: 'smaller', marginRight: '10px', display: 'inline', color: 'gray' }}>{r?.created}</h6>
                    <h4 style={{ display: 'inline' }}>{r?.body}</h4>
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className='row'>
                  <div className='col'>
                    <hr />
                  </div>
                </div>
              </div>
            )
          ))
        )}
      </div>

    </div>
  )
}

export default Product;
