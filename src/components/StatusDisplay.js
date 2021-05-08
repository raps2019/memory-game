import React from 'react'

function StatusDisplay(props) {
  const { statusMessage, statusClass } = props
  return (
    <div className='container__status'>
      <p className={`text__status ${statusClass}`}>{statusMessage}</p>
    </div>
  )
}

export default StatusDisplay
