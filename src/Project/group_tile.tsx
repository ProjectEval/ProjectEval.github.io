import "./group_tile.css"
import { useEffect, useState } from "react"
import { getUserId } from "../API/auth"

type GroupTileProps = {
    name: string
    groupId: string
    projectId: string
    classId: string
}

function GroupTile({name, projectId, classId, groupId}: GroupTileProps) {


 
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
       
      </div>
      
    </>
  )
}

export default GroupTile
