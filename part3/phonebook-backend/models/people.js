require('dotenv').config()

const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

console.log("connecting to", process.env.MONGODB_URI)
mongoose
	.connect(process.env.MONGODB_URI)
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch(error => {
		console.log('error connecting to MongoDB:', error.message)
	})

const personsSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 3},
	number: {
		type: String,
		minlength: 8,
		validate: {
			validator: function(v) {
				return /^(\d{2,3})-(\d+)$/.test(v)
			},
			message: "Invalid phone number format"
		}
	}
})

personsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personsSchema.pre(
	['findOneAndUpdate', 'updateOne', 'updateMany'],
	function() {
  		this.setOptions({ runValidators: true })
	}
)

module.exports = mongoose.model('Person', personsSchema)
