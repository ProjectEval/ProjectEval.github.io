import './close_warning_dialog.css'
type CloseWarningDialogProps = {
   closeWarningRef: React.RefObject<HTMLDialogElement>
   connectedRef: React.RefObject<HTMLDialogElement>
   onYes?: () => void
   onNo?: () => void
}

function CloseWarningDialog({closeWarningRef, connectedRef, onYes, onNo}: CloseWarningDialogProps) {
    
  return (
    <>
      <dialog ref={closeWarningRef} className="CloseWarning">
        <h2>Changes aren't saved!</h2>
        <label>Are you sure you want to close without saving? The background will return back to what it was before it was changed if it was changed</label>
        <br />
        <br />
        <button onClick={() => {
          if (onYes) {
            onYes()
          }
          closeWarningRef.current?.close()
          connectedRef.current?.close()
        }}>Yes</button>
        <span> </span>
        <button onClick={() => {
          if (onNo) {
            onNo()
          }
          closeWarningRef.current?.close()
        }}>No</button>
      </dialog>
    </>
  )
}

export default CloseWarningDialog
