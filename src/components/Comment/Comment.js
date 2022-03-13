import './Comment.css';
import Avatar from '../../assets/img/avatar.png';

function Comment({className, ...props}) {
  return (
    <div className={"comment " + (className || '')} {...props}> 
      <header className="comment__top">
        <img className="comment__avatar" src={Avatar} width="40" height="40" alt="Avatar" />
        <div className="comment__author">
          <h3 className="comment__author-name heading heading--quaternary">Elijah Moss</h3>
          <p className="comment__author-email">@hexagon.bestagon</p>
        </div>
        <button className="comment__reply">Reply</button>
      </header>

      <div className="comment__body">
        <p className="comment__text">Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.</p>
      </div>
    </div>
  )
}

export default Comment;