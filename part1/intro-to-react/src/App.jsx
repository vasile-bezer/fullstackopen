const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course = {course} />
      <Content parts = {parts} />
      <Total parts = {parts} />
    </div>
  )
}

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({parts}) => {
  return(
    <div>
      { parts.map( item => <Part name = {item.name} exercises = {item.exercises}/> ) }
    </div>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p> {name} {exercises} </p>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, item) => sum + item.exercises, 0);
  return <p>Number of exercises {total}</p>
}

export default App