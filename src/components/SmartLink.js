import React from 'react'

import { Link as RouterLink } from 'react-router-dom'

export default function SmartLink({ to, children, ...props }) {
  console.log(to, children, props)
  return /^https?:\/\//.test(to) ? (
    <a href={to} {...props}>
      {children}
    </a>
  ) : (
    <RouterLink to {...props}>
      {children}
    </RouterLink>
  )
}
