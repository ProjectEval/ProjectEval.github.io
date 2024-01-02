import "./FreeResponseSubmission.css"

type FreeResponseProps = {
    answer: string;
    comment?: string;
    cardColor: string
}

function FreeResponseSubmissionCard({answer, comment, cardColor}: FreeResponseProps) {
  

  
  return (
    <>
      <div className='FreeResponseSubmissionCard'  style={{backgroundColor: cardColor}}>
        <h2>Answer: {answer}</h2>
        <h3>Comment: {comment}</h3>
      </div>
      
    </>
  )
}

export default FreeResponseSubmissionCard
