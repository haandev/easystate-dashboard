import React from "react"
import { Handle, Position } from "reactflow"

const absoluteStyle = {
  width: 69,
  height: 69,
}
export const EndNode = () => {
  return (
    <>
      <div style={absoluteStyle}>
        <svg
          width="69"
          height="69"
          viewBox="0 0 69 69"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_222_63)">
            <circle
              cx="34.5356"
              cy="34.5334"
              r="15.7205"
              transform="rotate(-180 34.5356 34.5334)"
              fill="#4338CA"
            />
            <circle
              cx="34.5356"
              cy="34.5334"
              r="14.2205"
              transform="rotate(-180 34.5356 34.5334)"
              stroke="white"
              strokeWidth="3"
            />
          </g>
          <g filter="url(#filter1_d_222_63)">
            <circle
              cx="34.5354"
              cy="34.5332"
              r="24.7009"
              transform="rotate(-180 34.5354 34.5332)"
              stroke="white"
              strokeWidth="3"
              shapeRendering="crispEdges"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_222_63"
              x="9.81494"
              y="9.81274"
              width="49.4412"
              height="49.4412"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="2"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_222_63"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="3.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.262745 0 0 0 0 0.219608 0 0 0 0 0.792157 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_222_63"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_222_63"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d_222_63"
              x="0.334473"
              y="0.332275"
              width="68.4019"
              height="68.4019"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="4"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_222_63"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.647059 0 0 0 0 0.705882 0 0 0 0 0.988235 0 0 0 0.2 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_222_63"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_222_63"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <Handle type="target" position={Position.Left} />
    </>
  )
}


