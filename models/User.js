import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({
	email: {
		type: String
	},
	password: {
		type: String
	}
}, {
	timestamps: true
})

export default mongoose.model('User', schema)
