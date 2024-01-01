

import './Select.css'

type SelectProp = {
    text: string;
    handleAddChoice: (choice: string) => void
    handleRemoveChoice: (choice: string) => void
    selectedValue: string
}

function Select({text, handleAddChoice, handleRemoveChoice, selectedValue}: SelectProp) {

    function handleSelect(){
        console.log(selectedValue)
        if(selectedValue.split(",").includes(text)){
           handleRemoveChoice(text)
        } else {
            handleAddChoice(text)
        }
        
    }

  return (
    <>
        <div className='Select' data-value={text} onClick={handleSelect}>
            <div className={'SelectIcon ' + (selectedValue.split(",").includes(text) ? "Selected" : "") }>
            
            </div>
            <label htmlFor="Select" className='SelectText'>{text}</label>
        </div>
    </>
  )
}

export default Select
