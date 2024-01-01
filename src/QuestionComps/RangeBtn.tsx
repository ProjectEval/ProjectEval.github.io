

import './RangeBtn.css'

type RangeBtnProp = {
    text: string;
    value: number;
    handleChangeChoice: (choice: number) => void
    selectedValue: number
}

function RangeBtn({text, value, handleChangeChoice, selectedValue}: RangeBtnProp) {

    function handleSelect(){
        
       
        handleChangeChoice(value)
        
    }

  return (
    <>
        <div className='RangeBtn' data-value={value}>
            <label htmlFor="RangeBtn">{value}</label>
            <div className={'RangeIcon ' + (selectedValue == value ? 'Selected' : '')} onClick={handleSelect}>
            
            </div>
            <label htmlFor="RangeBtn" className='RangeHint'>{text}</label>
        </div>
    </>
  )
}

export default RangeBtn
