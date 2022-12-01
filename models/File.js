import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({
	s3Key: {
		type: String
	},
	bucket: {
		type: String
	},
	mime: {
		type: String
	},
	comment: {
		type: String
	},
	path: {
		type: String
	}
}, {
	timestamps: true
})

export default mongoose.model('File', schema)
