import React from 'react'

const Button = ({style,text}) => {
  return (
    <div>
      <button className={style}>{text}</button>
    </div>
  )
}

export default Button
