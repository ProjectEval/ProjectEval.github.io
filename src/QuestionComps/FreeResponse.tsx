import './FreeResponse.css'
import { FreeResponseAnswer, QuestionProps } from '../CustomTypes/QuestionTypes'


function FreeResponse({question, updateEval, submission, updateEvalComment} :QuestionProps<FreeResponseAnswer>) {

  return (
    <>
      <div className='Question' id={question.id}>
        <h3>{question.Question}</h3>
        <textarea name="response" id={question.Question + "-value"} className='ResInput' value={submission.value} onChange={(e) => updateEval(e.target.value)}/>
        <br />
        {question.hasComment && <><label htmlFor="">Comment: </label>

                <textarea name="" className="CommentElmt" value={submission.comment} onChange={(e) => {
                    updateEvalComment(e.target.value)
                }} ></textarea></>}
      </div>
      
    </>
  )
}

export default FreeResponse
