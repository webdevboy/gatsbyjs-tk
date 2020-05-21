import React from "react"

export default function Plus(props) {
  return (
    <svg {...props} width="47" height="47" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(1 1)" fill="none" fillRule="evenodd">
        <circle stroke="#B3A97E" strokeWidth="2" cx="22.5" cy="22.5" r="22.5" />
        <g fill="#B3A97E">
          <path d="M6.5 23.5v-1h32v1z" />
          <path d="M23 7h-1v32h1z" />
        </g>
      </g>
    </svg>
  )
}
