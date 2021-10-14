import { Helmet } from 'react-helmet'
import React from 'react'

const Meta = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to ProShop'
}

export default Meta
