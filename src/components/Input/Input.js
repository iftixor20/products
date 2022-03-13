import './Input.css';

function Input({ className, ...props }) {
  return (
    <label className={'input ' + (className || '')}>
      <input className="input__field" type="text" {...props} />
      <span className="input__msg">Can't be empty</span>
    </label>
  )
}

export default Input;