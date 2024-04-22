"use client"

import { createComment } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface Review {
  rating: number;
  text: string;
}

interface RatingAndReview {
  comments?: any,
  homeId: string,
  userId: any
}

export default function RatingAndReview({ comments, homeId, userId }: RatingAndReview) {
  const [hydration, setHydration] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState<number | any>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const reversedComments = [...comments].reverse();
  const router = useRouter();

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating && newReview) {

      const formData = new FormData();
      formData.append('homeId', homeId);
      formData.append('userId', userId);
      formData.append('comment', newReview);
      formData.append('rating', rating);

      setLoading(true)
      await createComment(formData)
      setNewReview('');
      setRating(null);
      setLoading(false);
      router.refresh();
    }
  };

  useEffect(() => {
    if (!hydration) {
      setHydration(true)
    }
  }, [])

  if (!hydration) return null;

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
          className="textarea textarea-bordered w-full h-full p-3 ring-1 rounded-md resize-none ring-gray-400"
          placeholder="Write a review"
          value={newReview}
          disabled={loading}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <button disabled={loading} type="submit" className="px-4 py-2 bg-purple-600 text-white rounded ">
          Submit
        </button>
      </form>

      <div className="space-y-4 mt-8">

        {reversedComments.map((review, index) => (
          <div key={review.id} className="border p-4 rounded-lg">
            <div className="flex space-x-1">
              <div>
                <span>{`${review.User.firstName} ${review.User.lastName}`}</span>
              </div>
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} size={24} color="#ffc107" />
              ))}
            </div>
            <p className="mt-2">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


