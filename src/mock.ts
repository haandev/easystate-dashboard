import { v4 as uuid } from "uuid"
import Chance from "chance"
const chance = new Chance()
export const flowsResponse: Array<dojo.ViewerItemType> = [
  //seeder for folders
  ...(Array(11)
    .fill(".")
    .map(() => ({
      id: uuid(),
      kind: "collection",
      title: "Folder Name",
    })) as Array<dojo.ViewerItemType>),

  ...(Array(25)
    .fill(".")
    .map(() => ({
      id: uuid(),
      kind: "collection",
      title: "Flow Name",
      subicon: "https://picsum.photos/640/400?" + Math.random(),
      isReserved: Boolean(Math.round(Math.random())), //this seeds random boolean
      reservedBy: "haandev", //username
    })) as Array<dojo.ViewerItemType>),
]

export const mockCollections = Array(11)
  .fill(".")
  .map(() => ({
    id: uuid(),
    kind: "collection",
    lastUpdate: "Oct 02, 2022",
    title: "Folder Name",
    subtext: "5 files",
  })) as Array<dojo.ViewerItemType>

export const mockStories = Array(25)
  .fill(".")
  .map(() => ({
    id: uuid(),
    kind: "story",
    title: "Flow Name",
    subicon: "/assets/images/flow.png",
    isReserved: Boolean(Math.round(Math.random())), //this seeds random boolean
    reservedBy: "haandev", //username
  })) as Array<dojo.ViewerItemType>
