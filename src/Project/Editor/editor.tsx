import { useEffect, useRef, useState } from 'react'
import "./editor.css"
import Plus from "../../assets/plus_circle.png"
import FreeResponseElmt from './Elements/FreeResponseElmt'
import { Answer, Question, Questions } from '../../CustomTypes/QuestionTypes'
import MultiChoiceElmt from './Elements/MultiChoiceElmt'
import { createProjectEvalTemplate, getProjectData } from '../../API/database'
import MultiSelectElmt from './Elements/MultiSelectElmt'
import CloseIcon from "../../assets/close.png"
import RangeElmt from './Elements/RangeElmt'
import BackArrow from "../../assets/back_arrow.png"


function Editor() {
  const [elements, setElmts] = useState<Questions>([])
  const modalRef = useRef<HTMLDialogElement>(null)
  const [classId, setClassId] = useState<string>("")
  const [projectId, setProjectId] = useState<string>("")
  const [background, setBackground] = useState<string>("")

  useEffect(()=>{
    (async () => {
      const url: string = window.location.search
      const params: URLSearchParams = new URLSearchParams(url)
      if(!params.has("projectId")){
          throw Error("missing project id!")
      }
      if(!params.has("classId")){
          throw Error("missing class id!")
      }
      const projectId = params.get("projectId")!
      const classId = params.get("classId")!
      const projectData = await getProjectData(classId, projectId)
      setElmts(projectData.eval_template)
      setBackground(projectData.background)
      setProjectId(projectId)
      setClassId(classId)
    })()
  }, [])

  // function handleRemoveElmt(index:number, element:Question<Answer>) {
  //       // const newElmts: Questions[] = elements.filter((value, i) => value.id != element.id)
  //       // setElmts(newElmts)
  // }

  const removeElement = (index: string) => () => {
    // setElmts(elements.splice(index, 1))
    const newElmts: Questions[] = elements.filter((value, i) => value.id != index)
    setElmts(newElmts)
  }

  // function handleUpdateElmt(index: number, element: Question<Answer>){
  //       setElmts((elements) => {
  //         elements[index] = element
  //         return elements
  //       })
  //       console.log(elements)
  // }

  function generateRandomId(){
        let time: number = new Date().getTime()
        time = Math.floor(time * Math.random() * 100)
        return time
  }

  function setAtIndex<T>(ts: T[], index: number, t: T) {
    const newTs = [...ts]
    newTs[index] = t
    return newTs
  }

  const updateQuestion = (index: number) => (newQ: Partial<Question<Answer>>) => {
    setElmts(setAtIndex(elements, index, {...elements[index], ...newQ}))
    // console.log(elements)
  }

  const handleSaveTemplate = async () => {
    await createProjectEvalTemplate(classId, projectId, elements)
    const oldUrl = new URL(window.location.href)
    window.location.href = oldUrl.origin + "/Project/" + oldUrl.search
  }

  return (
    <>
      <div className={'Center ' + background}>
        <h2 className='Title'>Evaluation Editor</h2>
        <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {
          const url = new URL(window.location.href)
          window.location.href = url.origin + "/Project/" + url.search
        }}/>
        {elements.map((element: Question<Answer>, index: number) => (
            element.Answer.Type == "FreeResponse" ? <FreeResponseElmt key={element.id} handleRemoveElmt={removeElement(element.id)} element={element} handleUpdateElmt={updateQuestion(index)}/>
            : element.Answer.Type == "MultiChoice" ? <MultiChoiceElmt key={element.id} handleRemoveElmt={removeElement(element.id)} element={element} handleUpdateElmt={updateQuestion(index)}/>
            : element.Answer.Type == "MultiSelect" ? <MultiSelectElmt key={element.id} handleRemoveElmt={removeElement(element.id)} element={element} handleUpdateElmt={updateQuestion(index)}/>
            : element.Answer.Type == "Range" ? <RangeElmt key={element.id} handleRemoveElmt={removeElement(element.id)} element={element} handleUpdateElmt={updateQuestion(index)}/>
            : null
        ))}
        <br />
        <img src={Plus} alt="Add element" id='AddElement' onClick={() => {
            modalRef.current!.showModal()
        }}/>
        <br />
        <button onClick={handleSaveTemplate}>Save Template</button>
        <br />
      </div>

      <dialog ref={modalRef}>
        <h2>Element to Add</h2>
        <img src={CloseIcon} alt="close" className="CloseIcon" onClick={() => {
          modalRef.current?.close()
        }}/>
        <button onClick={() => {
            setElmts([...elements, {Question: "", Answer: {Type:"FreeResponse"}, hasComment: false, id: `frq-${generateRandomId()}`}])
            modalRef.current!.close()
        }}>Free Response</button>
        <span> </span>
        <button  onClick={() => {
            setElmts([...elements, {Question: "", Answer: {Type:"MultiChoice", Choices: []}, hasComment: false, id: `mcq-${generateRandomId()}`}])
            modalRef.current!.close()
        }}>Multiple Choice</button>
        <span> </span>
        <button onClick={() => {
            setElmts([...elements, {Question: "", Answer: {Type:"MultiSelect", Choices: []}, hasComment: false, id: `msq-${generateRandomId()}`}])
            modalRef.current!.close()
        }}>Multiple Select</button>
        <span> </span>
        <button onClick={() => {
            setElmts([...elements, {Question: "", Answer: {Type:"Range", Min: 0, Max: 10, MinTitle: "", MaxTitle: ""}, hasComment: false, id: `rq-${generateRandomId()}`}])
            modalRef.current!.close()
        }}>Range</button>
      </dialog>
    </>
  )
}

export default Editor
