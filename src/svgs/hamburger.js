import React from "react"

export default function Hamburger(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg">
      <g fillRule="evenodd">
        <rect width="25" height="2" rx="1" />
        <rect y="7" width="25" height="2" rx="1" />
        <rect y="14" width="25" height="2" rx="1" />
      </g>
    </svg>
  )
}
