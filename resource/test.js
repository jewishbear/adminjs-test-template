import Test from '../models/Test.js'
import { Components } from '../components/components.js'
import Color from '@tiptap/extension-color'

export default {
	resource: Test,
	options: {
		properties: {
			text: {
				type: 'richtext',
				components: {
					edit: Components.CustomRichText
				},
				options: {
					extensions: [
						Color
					]
				}
			}
		}
	}
}
