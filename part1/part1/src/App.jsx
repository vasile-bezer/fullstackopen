const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const content = [ part1, part2, part3 ]

  return (
    <div>
      <Header course = {course} />
      <Content content = {content} />
      <Total total = {content.reduce((sum, item) => sum + item.exercises, 0)} />
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