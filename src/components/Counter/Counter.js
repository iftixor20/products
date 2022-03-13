import './Counter.css';

function Counter({ className, count, ...props}) {
  return (
    <button className={'counter ' + (className || '')} type="button" {...props}>{count}</button>
  )
}

export default Counter;