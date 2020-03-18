import React from 'react'

import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

export default function SmartLink({ to, children, className, ...props }) {
  return /^https?:\/\//.test(to) ? (
    <Link href={to} {...props} className>
      {children}
    </Link>
  ) : (
    <RouterLink to {...props} className>
      {children}
    </RouterLink>
  )
  return null
}
