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
        <button onClick={() => setGood(good => good + 1)}>
          good
        </button>
        <button onClick={() => setNeutral(netural => netural + 1)}>
          netural
        </button>
        <button onClick={() => setBad(bad => bad + 1)}>
          bad
        </button>
      </div>
      <div>
        <h1>
          statistics
        </h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </div>
  )
}

export default App