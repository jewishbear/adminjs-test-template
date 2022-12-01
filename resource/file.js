import uploadFeature from '@adminjs/upload'
import File from '../models/File.js'
import UploadProvider from './upload-provider.js'

// const localProvider = {
// 	bucket: './public/files',
// 	opts: {
// 		baseUrl: '/files',
// 	},
// }
// There was WINDOWS issue
// EXDEV: cross-device link not permitted, rename ...

export const files = {
	resource: File,
	options: {
		listProperties: ['_id', 's3Key', 'bucket', 'path']
	},
	features: [
		uploadFeature({
			provider: new UploadProvider(),
			// provider: { local: localProvider },
			validation: { mimeTypes: ['image/png', 'application/pdf', 'audio/mpeg'] },
			properties: {
				file: 'file',
				key: 's3Key',
				bucket: 'bucket',
				mimeType: 'mime'
			}
		}),
	],
}
