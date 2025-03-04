import React from 'react'
import '../../styles.scss'

const Loading: React.FC = () => {
  return (
    <div data-testid="loading-spinner" className="loadingSpinner">
      <div className="spinner"></div>
    </div>
  )
}

export default Loading