import "./class_tile.css"
import TrashIcon from "../assets/trash.png"

type ClassProps = {
    name: string
    id: string
    isTeacher: boolean
    deleteClass?: () => void
}

function ClassTile({name, id, isTeacher, deleteClass}: ClassProps) {

  return (
    <>
      <div className='ClassTile' onClick={() => {
        //Create url with params
        const url = new URL(window.location.origin)
        url.searchParams.set("classId", id)
        window.location.href = url.origin + "/Projects/" + url.search

      }}>
        <h2 className="ClassName">{name}</h2>
        {isTeacher && <img className="ClassTrashIcon" src={TrashIcon} alt="Trash Icon" onClick={(e) => {
          e.stopPropagation()
          deleteClass!()
        }}/>}
      </div>
      
    </>
  )
}

export default ClassTile
