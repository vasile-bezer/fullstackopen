import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

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
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="total" value={total}/>
      <StatisticLine text="avg." value={(good - bad) / (total)}/>
      <StatisticLine text="positive %" value={(good) * 100 / (total)}/>
    </div>
  ) : (<p>No feedback given</p>)
}

const Button = ({text, handler}) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (<p>{text} {value}</p>)
}

export default App