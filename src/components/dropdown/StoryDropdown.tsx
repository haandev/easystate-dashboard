import { FolderOpenSolid } from "@graywolfai/react-heroicons"
import { useNavigate } from "react-router-dom"
import Dropdown from "./Dropdown"
import threeDotsIcon from "@/assets/icons/threedots.svg"

const StoryDropdown: any = ({ item }: any) => {
  const navigate = useNavigate()

  return (
    <>
      <Dropdown
        title={<img className="pr-3 " src={threeDotsIcon} />}
        showChevron={false}
        groups={[
          [
            {
              title: "Open",
              onClick: () => navigate(`/app/story/${item.name}`),
              icon: FolderOpenSolid,
            },
          ],
        ]}
      />
    </>
  )
}

export default StoryDropdown
