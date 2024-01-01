// import { useState } from 'react'
import { Answer, MultiChoiceAnswer, Question } from "../../../QuestionComps/QuestionTypes";
import "./MultiChoiceElmt.css"
import Trash from '../../../assets/trash.png'
import Plus from '../../../assets/plus_circle.png'
import Choice from "./Choice";
// import { useEffect, useState } from "react";

type MultiChoiceProps = {
  handleRemoveElmt: () => void;
  // index: number;
  element: Question<MultiChoiceAnswer>;
  handleUpdateElmt: (element: Partial<Question<Answer>>) => void
}

function MultiChoiceElmt({handleRemoveElmt, element, handleUpdateElmt}: MultiChoiceProps) {

  // console.log({element})

  // const [cElmt, setElmt] = useState<Question<MultiChoiceAnswer>>(element)

  // useEffect(() => {
  //   setElmt(element)
  //   console.log(element)
  // }, [element])

  function generateRandomId(){
    let time: number = new Date().getTime()
    time = Math.floor(time * Math.random() * 100)
    return time
}

  const handleChangeChoice = (cIndex: number) => (value: string) => {
    const choices = [...element.Answer.Choices]
    choices[cIndex] = value
    handleUpdateElmt({Answer: {...element.Answer, Choices: choices}})
  }

  const removeChoice = (cIndex: number) => () => {
    const choices = [...element.Answer.Choices]
    choices.splice(cIndex, 1)
    handleUpdateElmt({Answer: {...element.Answer, Choices: choices}})
  }

  return (
    <>  
     <div className='MultiChoiceElmt EvalElmt'>
        <div className="ElmtTopBar">
          <h2 className="ElmtTitle">Multiple Choice Question</h2>
          <img src={Trash} alt="Remove elmt" className="RemoveElmt" onClick={() => {handleRemoveElmt()}}/>
        </div>
        <div>
          <label>Question: </label>
          <input type="text" className='ResQuestion' placeholder='Question' defaultValue={element.Question} onChange={(e) => {
            
            //setElmt(cElmt)
            handleUpdateElmt({Question: e.target.value})
          }}/>
        </div>
        <br />
        <div className="ElmtChoicesTitle">
          <label>Choices:</label>
          <img src={Plus} alt="Add Choice" className="AddChoice" onClick={() => {
            
            // const newElmt = cElmt
            // element.Answer.Choices.push("")
            // setElmt(newElmt)
            handleUpdateElmt({Answer: {...element.Answer, Choices: [...element.Answer.Choices, ""]}})
          }}/>
        </div>
        <div className="ElmtChoices"> 
          {element.Answer.Choices.map((value: string, index: number) => (
            <Choice key={index} index={index} value={value} handleChangeChoice={handleChangeChoice(index)} removeChoice={removeChoice(index)}/>
          ))}
        </div>
        <div className="ElmtHasComment">
          <label htmlFor="">Has Comment: </label>
          <input type="checkbox" checked={element.hasComment} onChange={(e) => {
            handleUpdateElmt({hasComment: e.target.checked})
          }}/>
        </div>
     </div>
    </>
  )
}

export default MultiChoiceElmt
