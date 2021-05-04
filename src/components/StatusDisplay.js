import React from 'react'

function StatusDisplay(props) {
  const { statusMessage, displayStatus } = props
  return (
    <div className={ displayStatus === true ? 'container__status container__status--show' : 'container__status container__status--hide'}>
      <p className="text__status">{statusMessage}</p>
    </div>
  )
}

export default StatusDisplay
