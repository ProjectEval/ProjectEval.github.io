import Select from './Select'
import './MultiSelect.css'
import { MultiSelectAnswer, QuestionProps } from '../CustomTypes/QuestionTypes'


function MultiSelect({question, updateEval, getEval, submission, updateEvalComment} :QuestionProps<MultiSelectAnswer>) {
  function handleAddChoice(choice: string){
    if(getEval!().value == ""){
      updateEval(choice)
    } else {
      updateEval(getEval!().value + ","+ choice)
    }
  }

  function handleRemoveChoice(choice: string){
    // document.getElementById(question.id)!.dataset.value = document.getElementById(question.id)!.dataset.value?.replace(`${choice},`, "").replace(`,${choice}`, "").replace(`${choice}`, "")
    const choices = getEval!().value.split(",")
    choices.splice(choices.indexOf(choice), 1)
    updateEval(choices.join(","))
  }
  return (
    <>
      <div className='Question' id={question.id}>
        <h3>{question.Question}</h3>
        <div className='Options'>
            {question.Answer.Choices.map(text => (
                <Select text={text} handleAddChoice={handleAddChoice} handleRemoveChoice={handleRemoveChoice} selectedValue={submission.value as string}/>
            ))}
        </div>
        <br />
        {question.hasComment && <><label htmlFor="">Comment: </label>

                <textarea name="" className="CommentElmt" value={submission.comment} onChange={(e) => {
                    updateEvalComment(e.target.value)
                }} ></textarea></>}
      </div>
      
    </>
  )
}

export default MultiSelect
