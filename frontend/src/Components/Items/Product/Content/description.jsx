import React from 'react'
import './description.css'

export default function description({description}) {
  return (
    <div className='set-description'>
        <h3>Description</h3>
      <span>{description}</span>
    </div>
  )
}
