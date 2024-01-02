import { useState } from 'react';
import './color_picker.css'


type ColorProps = {
   setColor: (color: string) => void;
   currentColor: string;

}

function ColorPicker({setColor, currentColor}: ColorProps) {

    
  return (
    <>
        <div className='ColorPicker'>

        </div>

    </>
  )
}

export default ColorPicker
