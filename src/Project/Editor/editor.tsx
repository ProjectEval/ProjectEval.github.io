import { useEffect, useRef, useState } from 'react'
import "./editor.css"
import Plus from "../../assets/plus_circle.png"
import FreeResponseElmt from './Elements/FreeResponseElmt'
import { Answer, Question, Questions } from '../../CustomTypes/QuestionTypes'
import MultiChoiceElmt from './Elements/MultiChoiceElmt'
import { createProjectEvalTemplate, getProjectData, getTeacherData, saveDefaultTemplate } from '../../API/database'
import MultiSelectElmt from './Elements/MultiSelectElmt'
import CloseIcon from "../../assets/close.png"
import RangeElmt from './Elements/RangeElmt'
import BackArrow from "../../assets/back_arrow.png"
import { getUserId } from '../../API/auth'
import InfoDialog from '../../Dialogs/info_dialog'


function Editor() {
  const [elements, setElmts] = useState<Questions>([])
  const modalRef = useRef<HTMLDialogElement>(null)
  const [classId, setClassId] = useState<string>("")
  const [projectId, setProjectId] = useState<string>("")
  const [background, setBackground] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  const [edittingDefault, setEdittingDefault] = useState<boolean>(false)
  const [info, setInfo] = useState<string>("")
  const [infoTitle, setInfoTitle] = useState<string>("")
  const infoModalRef = useRef<HTMLDialogElement>(null)

  useEffect(()=>{
    (async () => {
      const url: string = window.location.search
      const params: URLSearchParams = new URLSearchParams(url)
      if(params.has("userId")){
        setEdittingDefault(true)
        const userId = params.get("userId")!
        setUserId(userId)
        const teacherData = await getTeacherData(userId)
        setElmts(teacherData.default_eval_template)
        if(!params.has("background")){
          throw Error("missing background")
        }
        setBackground(params.get("background")!)
        return
      }
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
      const userId = await getUserId()
      setUserId(userId as string)
    })()
  }, [])

  // function handleRemoveElmt(index:number, element:Question<Answer>) {
  //       // const newElmts: Questions[] = elements.filter((value, i) => value.id != element.id)
  //       // setElmts(newElmts)
  // }

  const removeElement = (index: string) => () => {
    // setElmts(elements.splice(index, 1))
    const newElmts: Questions = elements.filter((value, i) => value.id != index)
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

  const handleSaveDefaultTemplate = async () => {
    await saveDefaultTemplate(userId, elements)
    setInfoTitle("Saved as Default Template")
    setInfo("Successfully saved template as default")
    infoModalRef.current?.showModal()
  }

  const handleLoadDefaultTemplate = async () => {
    const teacherData = await getTeacherData(userId)
    setElmts([...teacherData.default_eval_template])
    setInfoTitle("Loaded Default Template")
    setInfo("Successfully loaded default teemplate")
    infoModalRef.current?.showModal()
  }

  return (
    <>
      <div className={'Center ' + background}>
        <h2 className='Title'>Evaluation Editor</h2>
        <img src={BackArrow} alt="back" className="BackArrow" onClick={() => {
          const url = new URL(window.location.href)
          if(edittingDefault){
            url.searchParams.delete("userId")
            window.location.href = url.origin + "/Dashboard/"
          } else {
            window.location.href = url.origin + "/Project/" + url.search
          }
         
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
        {!edittingDefault && <><button onClick={handleLoadDefaultTemplate}>Load Default Template</button>
        <br />
        <button onClick={handleSaveTemplate}>Save Template</button>
        <br /></>}
        <button onClick={handleSaveDefaultTemplate}>Save as Default Template</button>
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
      <InfoDialog Title={infoTitle} info={info} infoModalRef={infoModalRef}/>
    </>
  )
}

export default Editor
