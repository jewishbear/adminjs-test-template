import Test from '../models/Test.js'
import { Components } from '../components/components.js'

export default {
	resource: Test,
	options: {
		properties: {
			text: {
				type: 'richtext',
				components: {
					edit: Components.CustomRichText, // this is our custom component
				}
			}
		}
	}
}
