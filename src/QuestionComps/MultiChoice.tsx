import Choice from './Choice'
import './MultiChoice.css'
import { MultiChoiceAnswer, QuestionProps } from './QuestionTypes'


function MultiChoice({question, updateEval, submission} :QuestionProps<MultiChoiceAnswer>) {
    function handleChangeChoice(choice: string){
        // document.getElementById(question.id)!.dataset.value = choice
        updateEval(choice)
    }
  return (
    <>
      <div className='Question' id={question.id}>
        <h3>{question.Question}</h3>
        <div className='Options'>
            {question.Answer.Choices.map(text => (
                <Choice text={text} handleChangeChoice={handleChangeChoice} selectedValue={submission.value as string}/>
            ))}
        </div>
      </div>
      
    </>
  )
}

export default MultiChoice
