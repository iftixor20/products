import { Link } from "react-router-dom";
import { useState } from "react";
import Counter from "../Counter/Counter";
import Radio from "../Radio/Radio";
import './Feedback.css';

function Feedback({ className, title, desc, category, comments, upvotes, id }) {
  const [isUpvoted, setIsUpvoted] = useState(JSON.parse(window.localStorage.getItem('isUpvoted')) || false);
  const [upvotesCount, setUpvotesCount] = useState(upvotes);
  let liveUpvotesCount;
  const [upvoteLoading, setUpvoteLoading] = useState(false);

  function handleUpvote() {
    fetch(`https://61c434b9f1af4a0017d993dc.mockapi.io/all/feedbacks/${id}`)
      .then(response => response.json())
      .then(data => {
        liveUpvotesCount = data.upvotes;
      })
      .then(() => {
        if (!isUpvoted) {
          setUpvoteLoading(true);
          fetch(`https://61c434b9f1af4a0017d993dc.mockapi.io/all/feedbacks/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              upvotes: liveUpvotesCount + 1
            })
          })
            .then(() => {
              setUpvotesCount(upvotesCount + 1);
              setIsUpvoted(true);
              window.localStorage.setItem('isUpvoted', 'true');
              setUpvoteLoading(false);
            });
        } else {
          setUpvoteLoading(true);
          fetch(`https://61c434b9f1af4a0017d993dc.mockapi.io/all/feedbacks/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              upvotes: liveUpvotesCount - 1
            })
          })
            .then(() => {
              setUpvotesCount(upvotesCount - 1)
              setIsUpvoted(false);
              window.localStorage.setItem('isUpvoted', 'false');
              setUpvoteLoading(false);
            });
        }
      })
  }

  return (
    <li className={"feedback " + (className || '')}>
      <Counter onClick={handleUpvote} className={"feedback__upvotes " + (isUpvoted ? 'counter--active' : '')} count={upvotesCount} disabled={upvoteLoading} />
      <div className="feedback__inner">
        <h3 className="feedback__title heading heading--tertiary">
          <Link to={"/feedback/details/" + id} className="feedback__title-link">{title}</Link>
        </h3>
        <p className="feedback__desc">{desc}</p>
        <Radio className="feedback__category" label={category} />
      </div>
      <span className="feedback__comments">{comments}</span>
    </li>
  )
}

export default Feedback;