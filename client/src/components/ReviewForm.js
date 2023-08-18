import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import queryString from 'query-string';

const ReviewForm = () => {
  const [reviewerName, setReviewerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [errorMessages, setErrorMessages] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const params = queryString.parse(location.search);
  const movieName = params.movieName || '';

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setErrorMessages({}); // Clear previous error messages

      // Validations
      const newErrorMessages = {};
      if (!reviewerName.trim()) {
        newErrorMessages.reviewerName = 'Reviewer Name is required';
      }
      
      if (!reviewText.trim()) {
        newErrorMessages.reviewText = 'Review Text is required';
      }

      if (Object.keys(newErrorMessages).length > 0) {
        setErrorMessages(newErrorMessages);
        return;
      }

      const response = await axios.patch(`http://localhost:8000/api/products/:id${id}`, {
        reviewerName: reviewerName,
        reviewText: reviewText,
        rating: rating,
      });
      console.log(response.data);

      // Redirect to ReviewDetails after successful submission
      navigate(`/review/${id}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessages(error.response.data.errors);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <div className="card mb-5">
            <div className="card-body border rounded-0 border-2 border-black p-sm-5" style={{ background: 'var(--bs-body-bg)' }}>
              <h5 className="text-start d-flex justify-content-between mb-4" style={{ padding: '12px' }}>
                Moldy Tomatoes
                <button className="btn btn-warning btn-sm fw-bold" type="button" style={{ backgroundColor: '#8a7e58', borderColor: 'rgb(0,0,0)', margin: '1px 10px', color: 'rgb(253,253,253)' }}>
                  Logout
                </button>
              </h5>
              <div className="col text-start d-flex justify-content-between" style={{ padding: '5px 12px' }}>
                <span className="fw-bolder border-dark">Add a Review for {movieName}</span>
              </div>
              <div className="col text-start d-flex justify-content-between" style={{ padding: '5px 12px' }}>
                <span>Your Name</span>
                <input className="form-control" type="text" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} />
                {errorMessages.reviewerName && <div className="text-danger">{errorMessages.reviewerName}</div>}
              </div>
              <div className="col d-flex justify-content-between" style={{ padding: '5px 12px' }}>
                <span>Rating</span>
                <select className="form-select" value={rating} onChange={(e) => setRating(e.target.value)}>
                  {[...Array(10)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col d-flex justify-content-between" style={{ padding: '5px 12px' }}>
                <span>Your Review</span>
                <textarea className="form-control" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                {errorMessages.reviewText && <div className="text-danger">{errorMessages.reviewText}</div>}
              </div>
              <div className="col d-flex justify-content-start align-items-start" style={{ padding: '5px 12px' }}>
                <button className="btn btn-primary" type="submit" style={{ borderStyle: 'solid', borderColor: 'var(--bs-btn-color)', borderTopLeftRadius: '0', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderBottomLeftRadius: '0', boxShadow: '2px 2px', margin: '5px 10px' }} onClick={onSubmitHandler}>
                  Submit
                </button>
                <Link
                  to={`/`}
                  className="btn btn-secondary"
                  style={{ borderStyle: 'solid', borderColor: 'var(--bs-btn-color)', borderTopLeftRadius: '0', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderBottomLeftRadius: '0', boxShadow: '2px 2px', margin: '5px 10px' }}
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    </div>
  );
};

export default ReviewForm;
