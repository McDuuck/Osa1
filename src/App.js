import { useState } from 'react'

const Header = () => (
  <div>
    <h2>Feedback</h2>
  </div>
)

const Stats = (props) => (
  <div>
    <p>
    {props.text}
    {props.stats}
    {props.percent}
    </p>
    
  </div>
)




const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [selectedAnecdote, setSelectedAnecdote] = useState('')
  const [randomIndex, setRandomIndex] = useState(null);

  const goodValue = 1 * good
  const neutralValue = 0 * neutral
  const badValue = -1 * bad
  const voteValue = goodValue + neutralValue + badValue
  const averageValue = voteValue / total
  const avgGood = goodValue / total * 100

  const goodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }
  const neutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const badClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }
    
  const Nofeed = () => {
    if (total === 0) {
      return (
        <div>
          No feedback given
        </div>
      );
    } else {
      return (
        <table>
          <tbody>
            <tr>
              <td>
                <Stats text={'Good: '} stats={good}/>
              </td>
            </tr>
            <tr>
              <td>
                <Stats text={'Neutral: '} stats={neutral}/>
              </td>
            </tr>  
            <tr>
              <td>
                <Stats text={'Bad: '} stats={bad}/>
              </td>
            </tr>
            <tr>
              <td><Stats text={'All: '} stats={total}/></td>
            </tr>
            <tr>
              <td><Stats text={'Average: '} stats={averageValue}/></td>
            </tr>
            <tr>
              <td><Stats text={'Positive: '} stats={avgGood} percent={'%'}/></td>
            </tr>
          </tbody>
        </table>
      );
    }
  };
  
  
  const randomAnecdote = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length);
    const selectedAnecdote = anecdotes[newIndex];
    setRandomIndex(newIndex); 
    setSelectedAnecdote(selectedAnecdote);
  };
  
  const voteResult = () => {
    const pointsCopy = JSON.parse(JSON.stringify(points)); 
    pointsCopy[randomIndex] += 1;
    setPoints(pointsCopy); 
  };
  const mostVoted = Math.max(...points);
  const mostVotedIndex = points.indexOf(mostVoted);
  console.log(points)

  return (
    <div>
      <Header />
      <div>
        <button onClick={goodClick}>Good</button>
        <button onClick={neutralClick}>Neutral</button>
        <button onClick={badClick}>Bad</button>
        
      </div>
      <p>Statistics:</p>
      <Nofeed />
      <h2>Anecdote of the day</h2>
      <p>{selectedAnecdote}</p>
      <button onClick={randomAnecdote}>Next anecdote</button>
      <button onClick={voteResult}>Vote</button>
      <p>Has {points[randomIndex]} votes</p>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotedIndex]}</p>
    </div>
  )
}

export default App;
