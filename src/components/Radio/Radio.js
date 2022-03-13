import './Radio.css';

function Radio({ className, label, ...props }) {
  return (
    <label className={"radio " + (className || '')}>
      <input className="radio__field" type="radio" {...props} />
      <span className="radio__label">{label}</span>
    </label>
  )
}

export default Radio;