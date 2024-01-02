import { useEffect, useRef, useState } from 'react'
import "./search_bar.css"

import TrashIcon from '../assets/trash.png'
import { getStudentData, getTeacherData, checkIfTeacher } from '../API/database';
import { Student, Teacher } from '../CustomTypes/firebase_types';


type SearchBarProps<T> = {
   name: string;
   content: T[];
   updateContent: (content: T[]) => void;
   defaultAddedContent?: T[]
   currentUserId: string
}


function SearchBar<T>({name, content, updateContent, defaultAddedContent, currentUserId}: SearchBarProps<T>) {
  
  const [search, setSearch] = useState<string>("")
  const [searchResults, setSearchResults] = useState<T[]>([])
  
  const [searchSelected, setSearchSelected] = useState<boolean>(false)
  const [mouseOverRes, setMouseOverRes] = useState<boolean>(false)
  const [addedContent, setAddedContent] = useState<T[]>([])
  const [currentUserName, setCurrentUserName] = useState<string>("")

  useEffect(() => {
    const getData = async () => {
      // console.log(currentUserId)
      if(currentUserId == ""){
        return
      }
      const teacher = await checkIfTeacher(currentUserId)


      if (teacher){
        const teacher: Teacher = await getTeacherData(currentUserId)
        setCurrentUserName(teacher.name)
      } else {
        const student: Student = await getStudentData(currentUserId)
        setCurrentUserName(student.name)
      }
     
    }
    getData()
  }, [currentUserId])

  useEffect(() => {
    if(defaultAddedContent != undefined){
      setAddedContent(defaultAddedContent)
      // console.log("Set added content")
    }
  },[defaultAddedContent])
  

  useEffect(() => {
    // console.log(search)
    // console.log(addedContent)
    const addedContentNames: string[] = addedContent.map((content) => content.name)
    //Filter out any object that has name in addedContent that includes search
    let searchResults: T[] = content.filter(
      (searchRes) =>
      searchRes.name.toLowerCase().includes(search.toLowerCase()) && !addedContentNames.includes(searchRes.name) && searchRes.name.toLowerCase() != currentUserName.toLowerCase()
        
    )
    if(searchResults.length == 1){
      if(searchResults[0].name.toLowerCase() == search.toLowerCase()){
        searchResults = []
      }
    }
      
    // console.log(searchResults)
    setSearchResults(searchResults)
  }, [search, content, addedContent])


  return (
    <>
        <div className='addedContents'>
                {addedContent.map((content) => (
                <div key={content.id} className='addedContent'>
                    <span>{content.name}</span>
                    <img src={TrashIcon} alt={`remove ${name}`} className='TrashIcon' onClick={() => {
                        setAddedContent(addedContent.filter((t) => t.id != content.id))
                        updateContent(addedContent.filter((t) => t.id != content.id))
                    }}/>
                    </div>
                ))}

        </div>
        <div className='AddContentQ'>
        
        
        <div className='ContentsSearchBar' onMouseEnter={() => {
            setMouseOverRes(true)
        }} onMouseLeave={() => {
            setMouseOverRes(false)
        }}>
            <input type="text" value={search} onBlur={() => {
            //Check if mouse is over search results
            
            if(!mouseOverRes){
                setSearchSelected(false)
            }
            
            }}onSelect={() => {
            setSearchSelected(true)
            }} onChange={(e) => {
            setSearch(e.target.value)
            }}/>
            {searchSelected && searchResults.length > 0 ? <div className='SearchResults'>
            {searchResults.map((res) => (
                <div key={res.id} className='SearchResult' onClick={() => {
                setSearch(res.name)

                }}>
                
                <span> {res.name}</span>
                {/* <img src={PlusCircleIcon} alt="add teacher" className='PlusCircleIcon'/> */}
                </div>
            ))}
            </div> : null}
        </div>
        <button className='addContentBtn' type='button' onClick={() => {
            if(search == ""){
                return
            }
            setAddedContent([...addedContent, content.filter((res) => res.name == search)[0]])
            updateContent([...addedContent, content.filter((res) => res.name == search)[0]])

            setSearch("")
            // setMouseOverRes(false)
            setSearchSelected(false)
        }}>Add {name}</button>
        </div>
         
    </>
  )
}

export default SearchBar
