import "./RangeSubmission.css"

type RangeProps = {
    answer: string;
    max: number;
    comment?: string;
    cardColor: string
}

function RangeSubmissionCard({answer, comment, max, cardColor}: RangeProps) {
  

  
  return (
    <>
      <div className='RangeSubmissionCard'  style={{backgroundColor: cardColor}}>
        <h2>Answer: {answer} out of {max}</h2>
        <h3>Comment: {comment}</h3>
      </div>
      
    </>
  )
}

export default RangeSubmissionCard
