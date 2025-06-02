import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  return (
    <div>
      <div>
        <h1>
          give feedback
        </h1>
        <Button text="good" handler={() => setGood(good => good + 1)} />
        <Button text="netural" handler={() => setNeutral(netural => netural + 1)} />
        <Button text="bad" handler={() => setBad(bad => bad + 1)} />
      </div>
      <div>
        <Statistics good = {good} bad = {bad} neutral ={neutral} />
      </div>
      <div>
        <Button text="display random anecdote" handler={() => setSelected(() => getRandomInt(0, anecdotes.length - 1))}/>
        <p>{anecdotes[selected]}</p>
      </div>
    </div>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const total = good + neutral + bad;
  return total > 0 ? (
    <div>
      <h1>
        statistics
      </h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="total" value={total}/>
          <StatisticLine text="avg." value={(good - bad) / (total)}/>
          <StatisticLine text="positive %" value={(good) * 100 / (total)}/>
        </tbody>
      </table>
    </div>
  ) : (<p>No feedback given</p>)
}

const Button = ({text, handler}) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App