import "./FreeResponseSubmission.css"

type FreeResponseProps = {
    answer: string;
    comment?: string;
    cardColor: string;
    userName?: string;
}

function FreeResponseSubmissionCard({answer, comment, cardColor, userName}: FreeResponseProps) {
  

  
  return (
    <>
      <div className='FreeResponseSubmissionCard'  style={{backgroundColor: cardColor}}>
        <h2>Answer: {answer} {userName != undefined && 'By: ' + userName}</h2>
        <h3>Comment: {comment}</h3>
      </div>
      
    </>
  )
}

export default FreeResponseSubmissionCard
