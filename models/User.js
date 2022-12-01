import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({
	login: {
		type: String
	},
	password: {
		type: String
	}
}, {
	timestamps: true
})

export default mongoose.model('User', schema)
