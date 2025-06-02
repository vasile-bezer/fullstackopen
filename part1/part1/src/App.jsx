const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const content = [
    {name: part1, exercises: exercises1}
    ,{name: part2, exercises: exercises2}
    ,{name: part3, exercises: exercises3}
  ]

  return (
    <div>
      <Header course = {course} />
      <Content content = {content} />
      <Total total = {exercises1 + exercises2 + exercises3} />
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
      <>
        {content.map((item, index) => (
          <p key={index}>
            {item.name} {item.exercises}
          </p>
        ))}
      </>
      )
}

const Total = ({total}) => {
  return <p>Number of exercises {total}</p>
}

export default App