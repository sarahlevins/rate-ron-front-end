import { useState, useEffect } from 'react';
import './Ratings.css';
import { Link } from 'react-router-dom';

export default function Ratings() {
    const [sortedRatings, setSortedRatings] = useState([]);

    const fetchRatings = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/ratings`)
                .then(response => response.json())
                .then(data => setSortedRatings(data.sort((a, b) => b.rating - a.rating)))
                .catch(error => {
                    console.error('Error fetching ratings:', error);
                    return { props: { ratings: [] } };
                });
    }

    useEffect(() => {
        fetchRatings();
    }, []);

    return (
        <div className={"ratings-container"}>
            <h1 className={"title"}>Ron's Ratings</h1>
            <Link to='/'>
                <button className={"button"}>Go rate some more</button>
            </Link>
            <table className={"table"}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRatings.map((rating) => (
                        <tr key={rating.image_name}>
                            <td>      
                                <div className={"imageContainer"}>
                                    <img src={`/images/${rating.image_name}`} className={"image"} />
                                </div>
                            </td>
                            <td>{rating.rating.toFixed(1)} / 5</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
