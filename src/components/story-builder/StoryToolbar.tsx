import { useStory } from "@/queries/useStory"
import {
  ViewColumnsOutline,
  ViewColumnsSolid,
  MagnifyingGlassMinusSolid,
  MagnifyingGlassPlusSolid,
  MagnifyingGlassOutline,
  Squares2x2Outline,
} from "@graywolfai/react-heroicons"
import { useNavigate } from "react-router-dom"

export const StoryToolbar: any = (props: any) => {
  const story = useStory()
  const navigate = useNavigate()
  return (
    <div className="px-4 justify-center rounded-lg absolute z-40 left-96 top-16 h-16 w-[48rem] bg-white shadow flex flex-col">
      <div className="text-sm text-indigo-600 font-bold">
        {story.find?.name}
      </div>
      <div className="flex  flex-row w-full justify-between">
        <span className="text-sm">Status: {story.find?.status}</span>
        <div className="text-sm flex flex-row">
          <MagnifyingGlassPlusSolid
            className="w-5 h-5 hover:text-indigo-600 cursor-pointer"
            onClick={props.onZoomIn}
          />
          <MagnifyingGlassMinusSolid
            className="w-5 h-5 hover:text-indigo-600 cursor-pointer"
            onClick={props.onZoomOut}
          />
          <MagnifyingGlassOutline
            className="w-5 h-5 hover:text-indigo-600 cursor-pointer"
            onClick={props.onZoomReset}
          />
          <Squares2x2Outline
            className="w-5 h-5 hover:text-indigo-600 cursor-pointer"
            onClick={props.onAutoLayout}
          />
        </div>
        <div className="flex flex-row items-center ">
          {story.find?.status === "RUN" && (
            <button
              type="button"
              onClick={() => story.undeploy.mutate()}
              className="ml-1 flex justify-center py-0 px-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-gray-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Undeploy
            </button>
          )}
          {story.find?.status === "DEV" && (
            <button
              type="button"
              onClick={() => story.deploy.mutate()}
              className="ml-1 flex justify-center py-0 px-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-gray-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Deploy
            </button>
          )}
          {story.find?.status === "DEPLOYED" && (
            <button
              type="button"
              onClick={() => story.run.mutate()}
              className="ml-1 flex justify-center py-0 px-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-gray-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Run
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate(`/app/logs/${story.storyName}`)}
            className="ml-1 flex justify-center py-0 px-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-gray-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to logs
          </button>
        </div>
      </div>
    </div>
  )
}
