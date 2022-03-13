import './Textarea.css';

function Textarea({ className, ...props }) {
  return (
    <label className={'textarea ' + (className || '')}>
      <textarea className="textarea__field" type="text" {...props} />
      <span className="textarea__msg">Can't be empty</span>
    </label>
  )
}

export default Textarea;