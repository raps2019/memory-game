import React from 'react'

function StatusDisplay(props) {
  const { statusMessage, displayStatus } = props
  return (
    <div className='container__status'>
      <p className="text__status">{statusMessage}</p>
    </div>
  )
}

export default StatusDisplay
