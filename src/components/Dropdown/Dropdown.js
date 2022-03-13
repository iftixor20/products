import { forwardRef } from 'react';
import './Dropdown.css';

function Dropdown({className, options, ...props}, ref) {
  return (
    <select className={"dropdown " + (className || '')} {...props} ref={ref}>
      {
        options.map((option, index) => <option value={option} key={index}>{option}</option>)
      }
    </select>
  )
}

export default forwardRef(Dropdown);