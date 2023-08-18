import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';

const ReviewDetails = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products`)
      .then((res) => {
        setReviews(res.data.data); // Set the list of reviews
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteReview = (reviewId) => {
    axios
      .delete(`http://localhost:8000/api/products/${reviewId}`)
      .then((res) => {
        console.log('Review deleted successfully');
        // Refresh the reviews list after successful deletion
        setReviews(reviews.filter((review) => review._id !== reviewId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col d-flex justify-content-between">
          <span className="fw-bolder">Moldy Tomatoes&nbsp;</span>
          <button
            className="btn btn-success"
            type="button"
            style={{ color: 'rgb(248, 248, 248)', background: '#aa6635' }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col d-flex justify-content-between">
          <span className="fw-bolder">&nbsp;</span>
          <Link
            to="/form"
            className="btn btn-primary"
            style={{
              textAlign: 'right',
              boxShadow: '0px 0px',
              borderBottomRightRadius: '50px',
              borderTopRightRadius: '50px',
              background: 'rgb(86, 147, 236)',
              color: 'rgb(0, 0, 0)',
            }}
          >
            Add a New Movie
          </Link>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div className="mb-3">
            <h4>Reviews</h4>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Reviewer Name</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr className="table-light" key={review._id}>
                    <td>{review.reviewerName}</td>
                    <td>{review.rating}</td>
                    <td>{review.reviewText}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => deleteReview(review._id)}
                        style={{ boxShadow: '2px 2px', borderRadius: '20px' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
