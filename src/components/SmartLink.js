import React from 'react'

import { Link as RouterLink } from 'react-router-dom'

export default function SmartLink({ to, children, className, ...props }) {
  return /^https?:\/\//.test(to) ? (
    <a href={to} className>
      {children}
    </a>
  ) : (
    <RouterLink to className>
      {children}
    </RouterLink>
  )
  return null
}
