import "./group_tile.css"
import TrashIcon from '../assets/trash.png'

type GroupTileProps = {
    name: string
    groupId: string
    projectId: string
    classId: string
    deleteGroup: (groupId: string) => void
}

function GroupTile({name, projectId, classId, groupId, deleteGroup}: GroupTileProps) {


 
  return (
    <>
      <div className='GroupTile' onClick={() => {
                //Create url with params
                const url = new URL(window.location.origin)

                url.searchParams.set("classId", classId)
                url.searchParams.set("projectId", projectId)
                url.searchParams.set("groupId", groupId)
                window.location.href = url.origin + "/Group/" + url.search
      }}>
        <h2 className="GroupName">{name}</h2>
       <img src={TrashIcon} alt="delete group" className="GroupTrashIcon" onClick={(e) => {
        e.stopPropagation()
        deleteGroup(groupId)
       }}/>
      </div>
      
    </>
  )
}

export default GroupTile
