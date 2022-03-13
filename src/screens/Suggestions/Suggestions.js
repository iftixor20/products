import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorImg from '../../assets/img/icon-404.svg';
import Radio from '../../components/Radio/Radio';
import Dropdown from '../../components/Dropdown/Dropdown';
import Button from '../../components/Button/Button';
import Feedback from '../../components/Feedback/Feedback';
import './Suggestions.css';

function Suggestions() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [category, setCategory] = useState('All');
  const [menuState, setMenuState] = useState(false);

  const sortRef = useRef();
  const [requestURL, setRequestURL] = useState('https://61c434b9f1af4a0017d993dc.mockapi.io/all/feedbacks?');

  useEffect(() => {
    document.title = 'Suggestions';
  }, []);

  useEffect(() => {
    fetch(requestURL)
      .then(response => response.json())
      .then(data => setFeedbacks(data));
  }, [requestURL]);

  useEffect(getRequestURL, [category]);

  function getRequestURL() {
    let URL = 'https://61c434b9f1af4a0017d993dc.mockapi.io/all/feedbacks?';

    switch (sortRef.current.value) {
      case 'Least Upvotes':
        URL += 'sortBy=upvotes';
        break;
      case 'Most Comments':
        URL += 'sortBy=comments&order=desc';
        break;
      case 'Least Comments':
        URL += 'sortBy=comments';
        break;
      default:
        URL += 'sortBy=upvotes&order=desc';
    }

    if (category !== 'All')
      URL += `&category=${category}`;

    setRequestURL(URL);
  }

  function handleMenuClick(e) {
    if ((window.innerWidth <= 600) && e.target.matches('.suggestions__menu'))
      setMenuState(false);
  }

  return (
    <main className="site-content">
      <h1 className="visually-hidden">firstTeam feedback board</h1>

      <section className="suggestions">
        <div className="suggestions__sidebar">
          <div className="suggestions__hero">
            <h2 className="suggestions__hero-title heading heading--secondary">firsTeam</h2>
            <p className="suggestions__hero-subtitle">Feedback Board</p>
          </div>

          <div onClick={handleMenuClick} className={"suggestions__menu " + (menuState ? "suggestions__menu--open" : '')}>
            <div className="suggestions__menu-inner">
              <div className="suggestions__filter">
                {
                  ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'].map((category, index) => (
                    <Radio onChange={(e) => setCategory(e.target.value)} label={category} name='feedback_category' value={category} defaultChecked={index === 0} key={index} />
                  ))
                }
              </div>
              <div className="suggestions__roadmap">
                <header className="suggestions__roadmap-top">
                  <h3 className="suggestions__roadmap-title heading heading--tertiary">Roadmap</h3>
                  <Link to="/roadmap" className="suggestions__roadmap-link">View</Link>
                </header>
                <ul className="suggestions__roadmap-list">
                  <li className="suggestions__roadmap-item">Planned <span>23</span></li>
                  <li className="suggestions__roadmap-item">In-Progress <span>2</span></li>
                  <li className="suggestions__roadmap-item">Live <span>12</span></li>
                </ul>
              </div>
            </div>
          </div>

          <button onClick={() => setMenuState(!menuState)} className={"suggestions__menu-toggle " + (menuState ? "suggestions__menu-toggle--active" : "")} type="button" aria-label="Toggle open menu"></button>
        </div>

        <div className="suggestions__content">
          <header className="suggestions__content-top">
            <h2 className="suggestions__content-heading heading heading--tertiary">{feedbacks.length} Suggestions</h2>
            <Dropdown onChange={getRequestURL} ref={sortRef} className="suggestions__content-dropdown" options={['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments']} aria-label="Sorting feedbacks" />
            <Link to="/feedback/new" className="suggestions__add-btn btn btn--blue-orchid">+ Add Feedback</Link>
          </header>

          {
            (feedbacks.length)
              ? (
                <ol className="suggestions__list">
                  {
                    feedbacks.map(feedback => (
                      <Feedback className="suggestions__item " {...feedback} key={feedback.id} />
                    ))
                  }
                </ol>
              )
              : (
                <div className="suggestions__empty">
                  <img className="suggestions__empty-icon" src={ErrorImg} width="131" height="137" alt="" aria-hidden />
                  <h2 className="suggestions__empty-heading heading heading--primary">There is no feedback yet.</h2>
                  <p className="suggestions__empty-text">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
                  <Link to="/feedback/new" className="suggestions__empty-btn btn btn--blue-orchid">+ Add Feedback</Link>
                </div>
              )
          }
        </div>
      </section>
    </main>
  )
}

export default Suggestions;