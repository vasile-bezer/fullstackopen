const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course = {course} />
      <Content course = {course} />
      <Total course = {course} />
    </div>
  )
}

const Header = ({course}) => {
  const { name } = course;
  return (
    <h1>{name}</h1>
  )
}

const Content = ({course}) => {
  const { parts } = course;

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

const Total = ({course}) => {
  const { parts } = course;
  const total = parts.reduce((sum, item) => sum + item.exercises, 0);
  return <p>Number of exercises {total}</p>
}

export default App