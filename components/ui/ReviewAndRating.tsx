"use client"

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface Review {
  rating: number;
  text: string;
}

export default function RatingAndReview() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating && newReview) {
      setReviews([...reviews, { rating, text: newReview }]);
      setNewReview('');
      setRating(null);
    }
  };

  return (
    <div>
      <form onSubmit={submitReview} className="space-y-4 mt-10">
        <div className="flex">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;

            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className="hidden"
                />
                <FaStar
                  className="cursor-pointer"
                  size={24}
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        <textarea
          className="textarea textarea-bordered w-full h-full"
          placeholder="Write a review"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded ">
          Submit
        </button>
      </form>

      <div className="space-y-4 mt-8">
        
        {reviews.map((review, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <div className="flex space-x-1">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} size={24} color="#ffc107" />
              ))}
            </div>
            <p className="mt-2">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


