import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const MovieReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/products')
      .then((res) => {
        setReviews(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigateToReviewForm = (movieId, movieName) => {
    navigate(`/product/${movieId}?movieName=${movieName}`);
  };

  const navigateToReviewDetails = (movieId, movieName) => {
    navigate(`/review/${movieId}?movieName=${movieName}`);
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
      <h2 className="mb-4">Movie List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Average Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'table-light' : 'table-secondary'}
            >
              <td>{review.movieName}</td>
              <td>{review.rating}</td>
              <td>
                <div className="d-flex">
                  <button
                    className="btn btn-info me-2"
                    type="button"
                    onClick={() => navigateToReviewDetails(review.id, review.movieName)}
                  >
                    Read Reviews
                  </button>
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => navigateToReviewForm(review.id, review.movieName)}
                  >
                    Write a Review
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieReviewList;
