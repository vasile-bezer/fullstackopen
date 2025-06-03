const App = () => {
	const courses = [
		{
			name: 'Half Stack application development',
			id: 1,
			parts: [
				{
					name: 'Fundamentals of React',
					exercises: 10,
					id: 1
				},
				{
					name: 'Using props to pass data',
					exercises: 7,
					id: 2
				},
				{
					name: 'State of a component',
					exercises: 14,
					id: 3
				},
				{
					name: 'Redux',
					exercises: 11,
					id: 4
				}
			]
		}, 
		{
			name: 'Node.js',
			id: 2,
			parts: [
				{
					name: 'Routing',
					exercises: 3,
					id: 1
				},
				{
					name: 'Middlewares',
					exercises: 7,
					id: 2
				}
			]
		}
	];

	return (
		<>{ courses.map( course => <Course key={course.id} course={course} /> ) }</>
	)
}

const Course = ({course}) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
  	)
}

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
	const {parts} = props;
	return (
		<div>
			{ parts.map( part => <Part key={part.id} part={part} /> ) }
		</div>
	)
}

const Part = (props) => (
	<p>
		{props.part.name} {props.part.exercises}
	</p>
)

const Total = (props) => {
	const { parts } = props;
	const total = parts.reduce( (sum, item) => sum + item.exercises, 0 );
	return (
		<p>Number of exercises {total}</p>
	);
}

export default App