import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './FeedbackDetails.css';
import Feedback from '../../components/Feedback/Feedback';
import Comment from '../../components/Comment/Comment';

function FeedbackDetails() {
  const { id: feedbackId } = useParams();
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    document.title = 'Feedback Details';

    fetch(`https://61c434b9f1af4a0017d993dc.mockapi.io/all/feedbacks/${feedbackId}`)
      .then(response => response.json())
      .then(data => setFeedback(data));
  }, []);

  return (
    <main className="feedback-details site-content">
      <header className="feedback-details__header">
        <Link to="/" className="feedback-details__back-btn btn btn--back btn--back--light">Go Back</Link>
        <Link to={"/feedback/edit/" + feedbackId} className="feedback-details__edit-btn btn btn--blue-orchid">Edit Feedback</Link>
      </header>

      <section className="feedback-details__comments comments">
        <Feedback className="feedback-details__feedback feedback--freezed" {...feedback} />

        <div className="comments__wrapper">
          <h2 className="comments__heading heading heading--tertiary">4 Comments</h2>

          <div className="comments__list">
            <Comment className="comments__item" />
            <Comment className="comments__item" />
            <Comment className="comments__item" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default FeedbackDetails;