import React from 'react'

function StatusDisplay(props) {
  const { statusMessage, statusClass, backgroundFlashColor } = props
  return (
    <div className={`container__status ${backgroundFlashColor}`}>
      <p className={`text__status ${statusClass}`}>{statusMessage}</p>
    </div>
  )
}

export default StatusDisplay
