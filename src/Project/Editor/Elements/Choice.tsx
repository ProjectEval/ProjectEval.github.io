import './Choice.css'
import Trash from '../../../assets/trash.png'

type ChoiceProp = {
    index: number;
    handleChangeChoice: (choice: string) => void
    value: string;
    removeChoice: () => void
}

function Choice({handleChangeChoice, index, value, removeChoice}: ChoiceProp) {

  return (
    <>
        <div className='Choice'>
            <label htmlFor="Choice" className='ChoiceText'>Choice #{index + 1}</label>
            <input type="text" name="Choice" value={value} onChange={(e) =>  {
                handleChangeChoice(e.target.value)
            }} />
            <img src={Trash} alt="delete" className='RemoveChoice' onClick={removeChoice}/>
        </div>
    </>
  )
}

export default Choice
