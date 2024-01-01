import "./project_tile.css"
import TrashIcon from "../assets/trash.png"

type ProjectTileProps = {
    name: string
    id: string
    classId: string
    isTeahcer: boolean
    deleteProject?: () => void
}

function ProjectTile({name, id, classId, isTeahcer, deleteProject}: ProjectTileProps) {
  return (
    <>
      <div className='ProjectTile' onClick={() => {
        //Create url with params
        const url = new URL(window.location.origin)

        url.searchParams.set("classId", classId)
        url.searchParams.set("projectId", id)
        window.location.href = url.origin + "/Project/" + url.search

      }}>
        <h2 className="ProjectName">{name}</h2>
        {isTeahcer && <img className="ProjectTrashIcon" src={TrashIcon} alt="Trash Icon" onClick={(e) => {
          e.stopPropagation()
          deleteProject!()
        }}/>}
      </div>
      
    </>
  )
}

export default ProjectTile
