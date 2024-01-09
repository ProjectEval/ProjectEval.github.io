import "./RangeSubmission.css"

type RangeProps = {
    answer: string;
    max: number;
    comment?: string;
    cardColor: string;
    userName?: string;
}

function RangeSubmissionCard({answer, comment, max, cardColor, userName}: RangeProps) {
  

  
  return (
    <>
      <div className='RangeSubmissionCard'  style={{backgroundColor: cardColor}}>
        <h2>Answer: {answer} out of {max} {userName != undefined && 'By: ' + userName}</h2>
        <h3>Comment: {comment}</h3>
      </div>
      
    </>
  )
}

export default RangeSubmissionCard
