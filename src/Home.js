import './Home.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import images from './imageLoader';

export default function Home() {
    const [imageUrl, setImageUrl] = useState(getRandomImageUrl());
    const [hoverRating, setHoverRating] = useState(0);
    const [averageRating, setAverageRating] = useState(null);
    const [submitted, setSubmitted] = useState(false);
  
    useEffect(() => {
      async function fetchAverageRating() {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rating?image=${imageUrl}`, {mode: 'cors'});
          if (response.ok) {
            const data = await response.json();
            setAverageRating(data.average_rating);
          } else {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          console.error('Error fetching average rating:', error);
        }
      }
  
      if (submitted) {
        fetchAverageRating();
      }
    }, [submitted]);
  
    function getRandomImageUrl() {
      const index = Math.floor(Math.random() * images.length);
      return images[index];
    }
  
    function handleNewPicture() {
      setImageUrl(getRandomImageUrl());
      setAverageRating(null);
      setHoverRating(0);
      setSubmitted(false);
    }
  
    async function handleRating(value) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rating`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageUrl, rating: value }),
          mode: 'cors'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          setSubmitted(true);
        }
      } catch (error) {
        console.error('Error submitting rating:', error);
        alert('Error submitting rating');
      }
    }
  
    return (
      <div className={"home-container"}>
        <h1 className={"title"}>Ron</h1>
        <div className={"imageContainer"}>
          <img src={`/images/${imageUrl}`} className={"image"} />
        </div>
        {!submitted ? (
          <div>
            <div className={"ratingContainer"}>
              Rate this picture: {[1, 2, 3, 4, 5].map((value) => (
                <div
                  key={value}
                  className={`${"star"} ${value <= hoverRating ? "selected" : ''}`}
                  onClick={() => handleRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className={"ratingContainer"}>
              Average rating: {averageRating != null ? `${averageRating.toFixed(1)} / 5` : 'loading...'}
            </div>
          </div>
        )}
        <button className={"button"} onClick={handleNewPicture}>Show me a different pic of Ron</button>
        <Link to='/ratings'>
            <button className={"button"}>View all ratings</button>
        </Link>
      </div>
    );
  }