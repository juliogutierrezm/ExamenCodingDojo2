import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';

const MovieForm = () => {
  const [reviewerName, setReviewerName] = useState('');
  const [movieName, setMovieName] = useState('');
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState(null); // Agregamos un estado para manejar errores
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validamos que todos los campos estén llenos
    if (!reviewerName || !movieName || !rating || !reviewText) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/products', {
        reviewerName: reviewerName,
        movieName: movieName,
        rating: rating,
        reviewText: reviewText,
      });

      console.log(response.data);
      setReviewerName('');
      setMovieName('');
      setRating('');
      setReviewText('');
      setError(null);
      navigate('/');
    } catch (err) {
      console.error(err.response.data); // Verificar la estructura del error en la respuesta
      setError(err.response.data.message || 'An error occurred. Please try again.');
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
              {error && <div className="text-danger mb-3">{error}</div>}
              <div className="col text-start d-flex justify-content-between" style={{ padding: '5px 12px' }}>
                <span className="fw-bolder border-dark">Submit a Movie and Review</span>
              </div>
              <div className="col text-start d-flex justify-content-between" style={{ padding: '5px 12px' }}>
                <span>Your Name</span>
                <input className="form-control" type="text" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} />
              </div>
              <div className="col text-start d-flex justify-content-between" style={{ padding: '5px 12px' }}>
                <span>Movie Name</span>
                <input className="form-control" type="text" value={movieName} onChange={(e) => setMovieName(e.target.value)} />
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
              </div>
              <div className="col d-flex justify-content-start align-items-start" style={{ padding: '5px 12px' }}>
                <button className="btn btn-primary" type="submit" style={{ borderStyle: 'solid', borderColor: 'var(--bs-btn-color)', borderTopLeftRadius: '0', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderBottomLeftRadius: '0', boxShadow: '2px 2px', margin: '5px 10px' }} onClick={onSubmitHandler}>
                  Submit
                </button>
                <Link
                  to="/"
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

export default MovieForm;
