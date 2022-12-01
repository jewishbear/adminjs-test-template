import Test from '../models/Test.js'
import { Components } from '../components/components.js'

export default {
	resource: Test,
	options: {
		properties: {
			text: {
				type: 'string',
				components: {
					edit: Components.MyInput, // this is our custom component
				}
			}
		}
	}
}
