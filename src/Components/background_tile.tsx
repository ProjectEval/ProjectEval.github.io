import { useState } from 'react';
import './background_tile.css'
type BackgroundTileProps = {
     backgroundImg: string;
     backgroundId: string;
    setBackground: (background: string) => void;

}

function BackgroundTile({backgroundImg, setBackground, backgroundId}: BackgroundTileProps) {

    
  return (
    <>
      <div className='BackgroundTile' onClick={() => {
          setBackground(backgroundId)
        }}>
        <img src={backgroundImg} />
      </div>
    </>
  )
}

export default BackgroundTile
