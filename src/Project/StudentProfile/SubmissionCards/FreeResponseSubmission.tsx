import "./FreeResponseSubmission.css"

type FreeResponseProps = {
    answer: string;
    comment?: string;
}

function FreeResponseSubmissionCard({answer, comment}: FreeResponseProps) {
  

  
  return (
    <>
      <div className='FreeResponseSubmissionCard'>
        <h2>Answer: {answer}</h2>
        <h3>Comment: {comment}</h3>
      </div>
      
    </>
  )
}

export default FreeResponseSubmissionCard
