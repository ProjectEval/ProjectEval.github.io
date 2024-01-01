import './FreeResponse.css'
import { FreeResponseAnswer, QuestionProps } from './QuestionTypes'


function FreeResponse({question, updateEval, submission} :QuestionProps<FreeResponseAnswer>) {

  return (
    <>
      <div className='Question' id={question.id}>
        <h3>{question.Question}</h3>
        <textarea name="response" id={question.Question + "-value"} className='ResInput' value={submission.value} onChange={(e) => updateEval(e.target.value)}/>
      </div>
      
    </>
  )
}

export default FreeResponse
