

import './Choice.css'

type ChoiceProp = {
    text: string
    handleChangeChoice: (choice: string) => void
    selectedValue: string
}

function Choice({text, handleChangeChoice, selectedValue}: ChoiceProp) {

    function handleSelect(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
       
        handleChangeChoice(text)
    }

  return (
    <>
        <div className='Choice' data-value={text} onClick={handleSelect}>
            <div className={'ChoiceIcon ' + (selectedValue == text ? "Selected" : "")} >
            
            </div>
            <label htmlFor="Choice" className='ChoiceText'>{text}</label>
        </div>
    </>
  )
}

export default Choice
