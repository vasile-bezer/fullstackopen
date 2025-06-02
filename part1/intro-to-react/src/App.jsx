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
      <Content content = {parts} />
      <Total total = {parts.reduce((sum, item) => sum + item.exercises, 0)} />
    </div>
  )
}

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({content}) => {
  return(
    <div>
      { content.map( item => <Part name = {item.name} exercises = {item.exercises}/> ) }
    </div>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p> {name} {exercises} </p>
  )
}

const Total = ({total}) => {
  return <p>Number of exercises {total}</p>
}

export default App