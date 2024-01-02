// import { useState } from 'react'
import { Answer, FreeResponseAnswer, Question } from "../../../CustomTypes/QuestionTypes";
import "./RangeElmt.css"
import Trash from '../../../assets/trash.png'

type FreeResponseProps = {
  handleRemoveElmt: () => void;
  element: Question<FreeResponseAnswer>;
  handleUpdateElmt: (element: Partial<Question<Answer>>) => void
}

function RangeElmt({handleRemoveElmt, element, handleUpdateElmt}: FreeResponseProps) {

  return (
    <>  
     <div className='RangeElmt EvalElmt'>
        <div className="ElmtTopBar">
          <h2 className="ElmtTitle">Range Question</h2>
          <img src={Trash} alt="Remove elmt" className="RemoveElmt" onClick={() => {handleRemoveElmt()}}/>
        </div>
        <div>
          <label htmlFor="ResQuestion">Question: </label>
          <input type="text" className='ResQuestion' placeholder='Question' defaultValue={element.Question} onChange={(e) => {
            handleUpdateElmt({Question: e.target.value})
          }}/>
        </div>
        <div className="MinMax">
          <div className="Extreme">
        
            <label htmlFor="min">Min: </label>
            <input type="number" className='min' placeholder='Min' defaultValue={element.Answer.Min} onChange={(e) => {
              handleUpdateElmt({Answer: {...element.Answer, Min: parseInt(e.target.value)}})
            }}/>
            <span> </span>
            <label htmlFor="">Min Title: </label>
            <input type="text" className='minTitle' placeholder='Min Title' defaultValue={element.Answer.MinTitle} onChange={(e) => {
              handleUpdateElmt({Answer: {...element.Answer, MinTitle: e.target.value}})
            }}/>
          </div>
          <div className="Extreme">
            <label htmlFor="max">Max: </label>
            <input type="number" className='max' placeholder='Max' defaultValue={element.Answer.Max} onChange={(e) => {
              handleUpdateElmt({Answer: {...element.Answer, Max: parseInt(e.target.value)}})
            }}/>
            <span> </span>
            <label htmlFor="">Max Title: </label>
            <input type="text" className='maxTitle' placeholder='Max Title' defaultValue={element.Answer.MaxTitle} onChange={(e) => {
              handleUpdateElmt({Answer: {...element.Answer, MaxTitle: e.target.value}})
            }}/>
          </div>
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

export default RangeElmt
