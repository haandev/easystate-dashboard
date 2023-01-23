import { usePrompt } from "@/contexts/prompt-context"
import { useFolder } from "@/queries/useFolder"
import { PencilSquareSolid, FolderOpenSolid } from "@graywolfai/react-heroicons"
import { useNavigate } from "react-router-dom"
import useEvent from "react-use-event-hook"
import { PromptModalEvent } from "../modals/prompt-modal/PromptModal.specs"
import Dropdown from "./Dropdown"
import threeDotsIcon from "@/assets/icons/threedots.svg"
const FolderDropdown: any = ({ item }: any) => {
  const navigate = useNavigate()
  const prompt = usePrompt()
  const folder = useFolder()

  //add folder event handler
  const handleRenameFolder = useEvent((e?: PromptModalEvent) => {
    item.id &&
      e?.form.handleSubmit(async (values) => {
        folder.rename.mutate({
          name: values.input,
          id: item?.id,
        })
      })()
  })

  const handleRenameClick = useEvent(() => {
    prompt
      .asyncAppear({
        okTitle: "Rename",
        cancelTitle: "Cancel",
        key: "rename-folder-modal",
        title: "Rename collection",
        id: "rename-folder-modal",
        fields: {
          input: {
            initialValue: item?.name,
            requiredMessage: "You need to provide a new name to save",
          },
        },
      })
      .then((event) => {
        if (event) handleRenameFolder(event)
      })
  })

  return (
    <>
      <Dropdown
        title={<img className="pr-3 " src={threeDotsIcon} />}
        showChevron={false}
        groups={[
          [
            {
              title: "Open",
              onClick: () => navigate(`/app/home/${item.id}`),
              icon: FolderOpenSolid,
            },
            {
              title: "Rename",
              onClick: handleRenameClick,
              icon: PencilSquareSolid,
            },
          ],
        ]}
      />
    </>
  )
}

export default FolderDropdown
