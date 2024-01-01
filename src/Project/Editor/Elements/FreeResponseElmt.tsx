// import { useState } from 'react'
import { Answer, FreeResponseAnswer, Question } from "../../../QuestionComps/QuestionTypes";
import "./FreeResponseElmt.css"
import Trash from '../../../assets/trash.png'

type FreeResponseProps = {
  handleRemoveElmt: () => void;
  element: Question<FreeResponseAnswer>;
  handleUpdateElmt: (element: Partial<Question<Answer>>) => void
}

function FreeResponseElmt({handleRemoveElmt, element, handleUpdateElmt}: FreeResponseProps) {

  return (
    <>  
     <div className='FreeResponseElmt EvalElmt'>
        <div className="ElmtTopBar">
          <h2 className="ElmtTitle">Free Response Question</h2>
          <img src={Trash} alt="Remove elmt" className="RemoveElmt" onClick={() => {handleRemoveElmt()}}/>
        </div>
        <div>
          <label htmlFor="ResQuestion">Question: </label>
          <input type="text" className='ResQuestion' placeholder='Question' defaultValue={element.Question} onChange={(e) => {
            handleUpdateElmt({Question: e.target.value})
          }}/>
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

export default FreeResponseElmt
