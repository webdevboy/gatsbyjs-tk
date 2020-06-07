import React from "react"

export default function Logo(props) {
  return (
    <svg {...props} viewBox="0 0 60 42" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h55.438v39.694H0z" />
        <path
          d="M37.562 17.23L53.204 0h-3.881l-16.12 17.752V7.35L32.909 0H.294L0 7.939h1.823c.353-3.823.823-5.587 5.41-5.587h5.388v37.342h4.998V2.352h5.315c3.71 0 4.732.985 5.177 3.423.025.304.093.626.093.98v32.939h4.999V19.7h.125l15.936 19.994h6.175L37.562 17.23z"
          fill={props.fill || "#B3A97E"}
        />
      </g>
    </svg>
  )
}
