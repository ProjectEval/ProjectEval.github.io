
type ErrorDialogProps = {
    error: string
    errorTitle: string
    errorModalRef: React.RefObject<HTMLDialogElement>
    onClose?: () => void
}

function ErrorDialog({error, errorTitle, errorModalRef, onClose}: ErrorDialogProps) {
    
  return (
    <>
      <dialog className='errorSignUp' ref={errorModalRef}>
        <h2>{errorTitle}</h2>
        <p>{error}</p>
        <button onClick={() => {
          errorModalRef.current?.close()

          if(onClose != undefined){
              onClose()
          }
        }}>Close</button>
      </dialog>
    </>
  )
}

export default ErrorDialog
