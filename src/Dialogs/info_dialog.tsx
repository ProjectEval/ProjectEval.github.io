
type ErrorDialogProps = {
    info: string
    Title: string
    infoModalRef: React.RefObject<HTMLDialogElement>
    onClose?: () => void
}

function InfoDialog({info, Title, infoModalRef, onClose}: ErrorDialogProps) {
    
  return (
    <>
      <dialog className='infoDialog' ref={infoModalRef}>
        <h2>{Title}</h2>
        <p>{info}</p>
        <button onClick={() => {
          infoModalRef.current?.close()

          if(onClose != undefined){
              onClose()
          }
        }}>Close</button>
      </dialog>
    </>
  )
}

export default InfoDialog
