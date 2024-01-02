import "./RangeOverview.css"

type AverageRangeCard = {
    average: number;
    cardColor: string
}

function RangeOverviewCard({average, cardColor}: AverageRangeCard) {
  

  
  return (
    <>
      <div className='RangeOverviewCard'  style={{backgroundColor: cardColor}}>
        <h2>Answers Overview</h2>
        <h2>Average: <span className="Average">{average}</span></h2>
      </div>
      
    </>
  )
}

export default RangeOverviewCard
