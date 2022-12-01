import fs, { existsSync } from 'fs'
import path from 'path'
import { BaseProvider } from "@adminjs/upload"
import mv from 'mv'

const UPLOADS_DIR = './public/files'

export default class UploadProvider extends BaseProvider {
	constructor() {
		super(UPLOADS_DIR);
		if (!existsSync(UPLOADS_DIR)) {
			throw new Error(`directory: "${UPLOADS_DIR}" does not exists. Create it before running LocalAdapter`);
		}
	}

	// * Fixed this method because original does rename instead of move and it doesn't work with docker volume
	async upload(file, key) {
		const filePath = process.platform === "win32" ? this.path(key) : this.path(key).slice(1); // adjusting file path according to OS
		await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
		await mv(file.path, filePath,function(err) {
			console.log(err)
		})
	}

	async delete(key, bucket) {
		await fs.promises.unlink(process.platform === "win32" ? this.path(key, bucket) : this.path(key, bucket).slice(1)); // adjusting file path according to OS
	}

	// eslint-disable-next-line class-methods-use-this
	path(key, bucket) {
	// Windows doesn't requires the '/' in path, while UNIX system does
		return process.platform === "win32"
			? `${path.join(bucket || this.bucket, key)}`
			: `/${path.join(bucket || this.bucket, key)}`;
	}
}
