import React, { FC, PropsWithChildren, useState } from "react"
import useEvent from "react-use-event-hook"
import { useViewer } from "@/contexts/viewer-context"
import Item from "@/components/file-manager/item"
import { ViewerProps } from "./Viewer.specs"
import { useNavigate } from "react-router-dom"
import storyIcon from "@/assets/icons/story.svg"
import folderIcon from "@/assets/icons/folder.svg"
const spacer = Array(20)
  .fill("0")
  .map((i, idx) => (
    <div
      key={idx}
      className="min-w-[230px] w-[230px]  box-border border-2 max-w-[500px] mx-2 flex-1 h-0  invisible"
    ></div>
  ))

const Viewer: FC<PropsWithChildren<ViewerProps>> = ({
  title,
  items,
  ...props
}) => {
  const viewer = useViewer()

  const handleItemClick = useEvent((id: string) => {
    viewer.dispatch({ type: "select", ids: [id] })
  })

  const handleAddClick = useEvent(() => {
    viewer.dispatch({ type: "deselect" })
    props.onAdd?.()
  })
  const navigate = useNavigate()
  return (
    <section className="mb-8">
      <h1 className="text-indigo-300 font-bold text-xl pl-2 mb-2">{title}</h1>
      <div className="file-manager-viewer flex flex-row flex-wrap viewer">
        {
          <Item
            onClick={handleAddClick}
            key="newcollection"
            title={props.addLabel}
            isSelected={false}
            icon={props.addIcon}
          />
        }
        {items &&
          Object.entries(items).map(([key, i], idx) => (
            <Item
              isSelected={viewer.state.selected.includes((i as StoryType).id)}
              onClick={handleItemClick}
              title={(i as StoryType).name}
              onDoubleClick={() => {
                return (i as StoryType).status
                  ? navigate(`/app/story/${(i as StoryType).name}`)
                  : navigate(`/app/home/${(i as StoryType).id}`)
              }}
              key={(i as StoryType).id}
              item={i}
              icon={
                (i as StoryType).status
                  ? storyIcon
                  : folderIcon
              }
              contextMenuStrip={<props.dropdown item={i} />}
            />
          ))}
        {spacer}
      </div>
    </section>
  )
}

export default Viewer
