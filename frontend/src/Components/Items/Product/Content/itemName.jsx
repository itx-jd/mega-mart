import React from 'react'
import './itemName.css'

export default function itemName({itemName}) {
  return (
    <div className='set-name'>
      <span>{itemName}</span>
    </div>
  )
}
