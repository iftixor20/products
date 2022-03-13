import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Dropdown from '../../components/Dropdown/Dropdown';
import './EditFeedback.css';
import Textarea from '../../components/Textarea/Textarea';

function EditFeedback() {
  const history = useHistory();
  const { id: feedbackId } = useParams();
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    document.title = 'Edit Feedback';
    setLoading(true);

    fetch(`https://61c434b9f1af4a0017d993dc.mockapi.io/all/feedbacks/${feedbackId}`)
      .then(response => response.json())
      .then(data => {
        setFeedback(data);
        setLoading(false);
      });
  }, []);

  function handleDelete() {
    if (window.confirm('Are you sure to delete the feedback?')) {
      setDeleteLoading(true)

      fetch(`https://61c434b9f1af4a0017d993dc.mockapi.io/all/feedbacks/${feedbackId}`, {
        method: 'DELETE'
      })
        .then(() => {
          setDeleteLoading(false);
          history.push('/');
        });
    }
  }

  function handleEdit(e) {
    e.preventDefault();

    setEditLoading(true);
    const feedbackData = new FormData(e.target);

    fetch(`https://61c434b9f1af4a0017d993dc.mockapi.io/all/feedbacks/${feedbackId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: feedbackData.get('title'),
        category: feedbackData.get('category'),
        desc: feedbackData.get('desc')
      })
    })
      .then(() => {
        setEditLoading(false);
        history.push('/feedback/details/' + feedbackId);
      })
  }

  return (
    <main className="site-content">
      <h1 className="visually-hidden">Editing feedback</h1>

      {
        (loading)
          ? ''
          : (
            <section className="edit-feedback">
              <Link to={"/feedback/details/" + feedbackId} className="edit-feedback__cancel-btn btn btn--back btn--back--light">Go Back</Link>

              <form onSubmit={handleEdit} className="edit-feedback__form form form--edit" action="https://echo.htmlacademy.ru" method="POST">
                <fieldset className="form__inner">
                  <legend className="form__heading heading heading--primary">Editing ‘{feedback.title}’</legend>

                  <div className="form__item">
                    <p className="form__item-title heading heading--quaternary">Feedback Title</p>
                    <p className="form__item-subtitle">Add a short, descriptive headline</p>
                    <Input className="form__item-field" placeholder=" " minLength="5" name="title" defaultValue={feedback.title} required />
                  </div>

                  <div className="form__item">
                    <p className="form__item-title heading heading--quaternary">Category</p>
                    <p className="form__item-subtitle">Choose a category for your feedback</p>
                    <Dropdown className="form__item-field" defaultValue={feedback.category} options={['Feature', 'UI', 'UX', 'Enhancement', 'Bug']} name="category" required />
                  </div>

                  <div className="form__item">
                    <p className="form__item-title heading heading--quaternary">Update Status</p>
                    <p className="form__item-subtitle">Change feedback state</p>
                    <Dropdown className="form__item-field" options={['Suggestion', 'Planned', 'In-Progress', 'Live']} required />
                  </div>

                  <div className="form__item">
                    <p className="form__item-title heading heading--quaternary">Feedback Detail</p>
                    <p className="form__item-subtitle">Include any specific comments on what should be improved, added, etc.</p>
                    <Textarea className="form__item-field form__item-field--textarea" placeholder=" " minLength="3" name="desc" defaultValue={feedback.desc} required />
                  </div>
                </fieldset>

                <div className="form__end">
                  <Button onClick={handleDelete} className={"form__delete-btn btn--red " + (deleteLoading ? "btn--disabled" : "")}>{deleteLoading ? 'Deleting...' : 'Delete'}</Button>
                  <Link to={"/feedback/details/" + feedbackId} className="form__cancel-btn btn btn--dark">Cancel</Link>
                  <Button className={"form__submit-btn btn--blue-orchid " + (editLoading ? "btn--disabled" : "")} type="submit">{editLoading ? 'Saving...' : 'Save changes'}</Button>
                </div>
              </form>
            </section>
          )
      }
    </main>
  )
}

export default EditFeedback;