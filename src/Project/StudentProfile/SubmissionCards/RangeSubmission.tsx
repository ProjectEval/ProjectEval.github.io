import "./RangeSubmission.css"

type RangeProps = {
    answer: string;
    max: number;
    comment?: string;
}

function RangeSubmissionCard({answer, comment, max}: RangeProps) {
  

  
  return (
    <>
      <div className='RangeSubmissionCard'>
        <h2>Answer: {answer} out of {max}</h2>
        <h3>Comment: {comment}</h3>
      </div>
      
    </>
  )
}

export default RangeSubmissionCard
