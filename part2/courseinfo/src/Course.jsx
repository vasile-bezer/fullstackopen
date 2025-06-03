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

export default Course;