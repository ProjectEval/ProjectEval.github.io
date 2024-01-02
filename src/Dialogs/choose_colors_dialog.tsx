import { useEffect, useRef, useState } from 'react';
import './choose_colors_dialog.css'
import { RgbaStringColorPicker } from 'react-colorful';






type ColorProps = {
   setBgColor: (color: string) => void;
   setTileColor?: (color: string) => void;
   setEvalBgColor?: (color: string) => void;
   colorRef: React.RefObject<HTMLDialogElement>;
   currentBgColor: string;
   currentTileColor?: string;
   currentEvalBgColor?: string;
   isProject: boolean;

}



function ChooseColorDialog({setBgColor, colorRef, currentBgColor, currentTileColor, isProject, setTileColor, setEvalBgColor, currentEvalBgColor}: ColorProps) {

  const [colorPickerVisibleBg, setVisibleBg] = useState(false);
  const [colorPickerVisibleEvalBg, setVisibleEvalBg] = useState(false);
  const [colorPickerVisibleCard, setVisibleCard] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <dialog className='chooseColor' ref={colorRef}>
        <h2>Choose Colors</h2>
        <div className='BGColor'>
          <label htmlFor="bgColorInput">Center Background Color: </label>
          <div className='colorPickerDiv'>
            <div onClick={()=>{
              setVisibleBg(!colorPickerVisibleBg)
              if(!colorPickerVisibleBg) {
                window.addEventListener('click', (e) => {
                  if(e.target.contains(document.querySelector('.colorPickerBg'))) {
                    setVisibleBg(false)
                  }
                })
              }
            }} style={{backgroundColor: currentBgColor}} className='colorPickerBtn'>
            


            </div>
            {colorPickerVisibleBg && <RgbaStringColorPicker className="colorPickerBg" color={currentBgColor} onChange={setBgColor} />}
          </div>
        </div>
        <br />

        {isProject && <>
          <div className='BGColor'>
          <label htmlFor="bgColorInput">Evaluation Background Color: </label>
          <div className='colorPickerDiv'>
            <div onClick={()=>{
              setVisibleEvalBg(!colorPickerVisibleEvalBg)
              if(!colorPickerVisibleEvalBg) {
                window.addEventListener('click', (e) => {
                  if(e.target.contains(document.querySelector('.colorPickerEvalBg'))) {
                    setVisibleEvalBg(false)
                  }
                })
              }
            }} style={{backgroundColor: currentEvalBgColor}} className='colorPickerBtn'>
            


            </div>
            {colorPickerVisibleEvalBg && <RgbaStringColorPicker className="colorPickerEvalBg" color={currentEvalBgColor} onChange={setEvalBgColor} />}
          </div>
        </div>
        </>}
        
        <br />
        {isProject && <>
          <div className='BGColor'>
          <label htmlFor="bgColorInput">Card Color: </label>
          <div className='colorPickerDiv'>
            <div onClick={()=>{
              setVisibleCard(!colorPickerVisibleCard)
              if(!colorPickerVisibleCard) {
                window.addEventListener('click', (e) => {
                  if(e.target.contains(document.querySelector('.colorPickerCard'))) {
                    setVisibleCard(false)
                  }
                })
              }
            }} style={{backgroundColor: currentTileColor}} className='colorPickerBtn'>
            


            </div>
            {colorPickerVisibleCard && <RgbaStringColorPicker className="colorPickerCard" color={currentTileColor} onChange={setTileColor} />}
          </div>
        </div>
          <label>Card Example: </label>
          <div className="TileExample" style={{backgroundColor: currentTileColor}}>
            <h2>Answer: </h2>
            <h3>Comment: </h3>
          </div>
        </>}
        <br />
        <button className='CloseColorChooser' onClick={() => {
          colorRef.current?.close()
          
        }}>Close</button>
      </dialog>
    </>
  )
}

export default ChooseColorDialog
