import { useState } from 'react';
import './choose_background_dialog.css'
import BookBg from '../assets/backgrounds/book_background.png'
import BackgroundTile from '../Components/background_tile';
import SeaMapBg from '../assets/backgrounds/sea_map_background.jpeg'
import ShipMapBg from '../assets/backgrounds/ship_map_background.jpeg'
import EnglishBg from '../assets/backgrounds/english_background.jpeg'
import ScienceBg from '../assets/backgrounds/science_background.jpeg'
import AztecBg from '../assets/backgrounds/aztec_background.jpeg'
import IncaBg from '../assets/backgrounds/inca_background.jpeg'
import AztecPatternBg from '../assets/backgrounds/aztec_pattern_background.jpeg' 
import WaveBg from '../assets/backgrounds/wave_background.png'
import BlockyFadeBg from '../assets/backgrounds/blocky_fade_background.jpeg'
import HexMountainBg from '../assets/backgrounds/hex_mountain_background.jpeg'
import FieryPolygonBg from '../assets/backgrounds/fiery_polygon_background.jpeg'
import RedPolygonBg from '../assets/backgrounds/red_polygon_backgound.png'
import HistroyBg from '../assets/backgrounds/history_background.jpeg'
import SpaceBg from '../assets/backgrounds/space_background.jpeg'
import PlanetsBg from '../assets/backgrounds/planets_background.jpeg'
import MapBg from '../assets/backgrounds/map_background.jpeg'
import EgyptBg from '../assets/backgrounds/egypt_background.webp'
import IconBg from '../assets/backgrounds/icon_background.jpeg'

type BackgroundProps = {
   setBackground: (background: string) => void;
   backgroundRef: React.RefObject<HTMLDialogElement>;
   currentBackground: string;

}

function ChooseBackgroundDialog({setBackground, backgroundRef, currentBackground}: BackgroundProps) {
  const [chosenBackground, setChosenBackground] = useState<string>(currentBackground)
    
  return (
    <>
      <dialog className='chooseBackground' ref={backgroundRef}>
        <h2>Choose Background</h2>
        <div className='Backgrounds'>
          <BackgroundTile backgroundImg={BookBg} backgroundId='Book' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={SeaMapBg} backgroundId='SeaMap' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={ShipMapBg} backgroundId='ShipMap' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={EnglishBg} backgroundId='English' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={ScienceBg} backgroundId='Science' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={AztecBg} backgroundId='Aztec' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={IncaBg} backgroundId='Inca' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={AztecPatternBg} backgroundId='AztecPattern' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={WaveBg} backgroundId='Wave' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={BlockyFadeBg} backgroundId='BoxFade' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={HexMountainBg} backgroundId='Hex' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={FieryPolygonBg} backgroundId='FieryPolygon' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={RedPolygonBg} backgroundId='RedPolygon' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={HistroyBg} backgroundId='History' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={SpaceBg} backgroundId='Space' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={PlanetsBg} backgroundId='Planets' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={MapBg} backgroundId='Map' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={EgyptBg} backgroundId='Egypt' setBackground={setBackground}/>
          <BackgroundTile backgroundImg={IconBg} backgroundId='Icon' setBackground={setBackground}/>
        </div>
        <br />
        <button className='CloseBackgroundChooser' onClick={() => {
          backgroundRef.current?.close()
          
        }}>Close</button>
      </dialog>
    </>
  )
}

export default ChooseBackgroundDialog
