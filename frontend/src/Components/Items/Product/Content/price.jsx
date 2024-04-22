import React from 'react'
import './price.css'
export default function price({price}) {
  return (
    <>
    <div className='set-price'>
     <span>RS. {price}</span>
    </div>
    </>
  )
}
