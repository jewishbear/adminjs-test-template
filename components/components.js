import pkg from 'adminjs'
const { ComponentLoader } = pkg

const componentLoader = new ComponentLoader()

// нужно заменить на свой
const ABSOLUTE_PATH_TO_COMPONENT = 'D:\\cgu\\admin\\components\\rich-text-editor\\rich-text-editor.tsx'

const Components = {
	CustomRichText: componentLoader.add('RichTextEditor', ABSOLUTE_PATH_TO_COMPONENT),
}

export { componentLoader, Components }
