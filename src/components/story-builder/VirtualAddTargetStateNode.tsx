import { FC } from "react"
import useEvent from "react-use-event-hook"
import { Handle, Position, Node } from "reactflow"
import { VirtualAddTargetStateNodeProps } from "./story-builder.types"

const absoluteStyle = {
  width: 18,
  height: 18,
}

export const VirtualAddTargetStateNode: FC<VirtualAddTargetStateNodeProps> = (
  props
) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = useEvent((e) => {
    e.stopPropagation()
    props.data.events.onClick(props)
  })
  return (
    <>
      <div style={absoluteStyle} className="cursor-pointer" onClick={handleClick}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="9" cy="9" r="8" fill="#F3F4F6" stroke="black" />
          <g clipPath="url(#clip0_303_241)">
            <path
              d="M12.0305 8.54353L9.45704 8.54353L9.45704 5.98342C9.45886 5.92505 9.44887 5.86691 9.42768 5.81249C9.40648 5.75808 9.37452 5.7085 9.3337 5.66674C9.24529 5.57833 9.12538 5.52866 9.00035 5.52866C8.87532 5.52866 8.75541 5.57833 8.667 5.66674C8.62535 5.70683 8.59234 5.75501 8.56998 5.80832C8.54763 5.86163 8.5364 5.91895 8.537 5.97675L8.55366 8.55353L5.96021 8.55353C5.85152 8.55234 5.74652 8.59291 5.66687 8.66687C5.57846 8.75528 5.52879 8.87519 5.52879 9.00022C5.52879 9.12525 5.57846 9.24516 5.66687 9.33357C5.70759 9.37782 5.75706 9.41311 5.81215 9.43721C5.86725 9.46132 5.92675 9.4737 5.98688 9.47358L8.54366 9.45691L8.54366 12.0237C8.54274 12.0809 8.55316 12.1378 8.57433 12.191C8.5955 12.2442 8.62699 12.2927 8.667 12.3337C8.75541 12.4221 8.87532 12.4718 9.00035 12.4718C9.12538 12.4718 9.24529 12.4221 9.3337 12.3337C9.37534 12.2936 9.40836 12.2454 9.43071 12.1921C9.45307 12.1388 9.4643 12.0815 9.4637 12.0237L9.44704 9.44691L12.0405 9.44691C12.1492 9.4481 12.2542 9.40753 12.3338 9.33357C12.4222 9.24516 12.4719 9.12525 12.4719 9.00022C12.4719 8.87519 12.4222 8.75528 12.3338 8.66687C12.2528 8.58787 12.1438 8.54353 12.0305 8.54353Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_303_241">
              <rect
                width="7.07139"
                height="7.07139"
                fill="white"
                transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 14.0005 9.00021)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <Handle type="target" position={Position.Left} />
    </>
  )
}
