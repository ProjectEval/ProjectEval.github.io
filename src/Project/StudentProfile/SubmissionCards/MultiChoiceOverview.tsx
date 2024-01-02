import "./MultiChoiceOverview.css"

type MultiChoiceCard = {
   choices: ChoiceOverview[];
   cardColor: string
}

export type ChoiceOverview = {
  choice: string;
  count: number;
}


function MultiChoiceOverview({choices,cardColor}: MultiChoiceCard) {
  

  
  return (
    <>
      <div className='MultiChoiceOverview'  style={{backgroundColor: cardColor}}>
        <h2>Answers Overview</h2>
        <h2>Choices:</h2>
        <ul>
          {choices.map((choice) => {
            return <li>{choice.choice}: {choice.count}</li>
          })}
        </ul>
      </div>
      
    </>
  )
}

export default MultiChoiceOverview
