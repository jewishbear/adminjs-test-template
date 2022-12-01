import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({
	text: {
		type: String
	},
})

export default mongoose.model('Test', schema)
