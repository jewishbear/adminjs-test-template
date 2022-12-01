import pkg from 'adminjs'
const { ComponentLoader } = pkg

const componentLoader = new ComponentLoader()

const Components = {
	// MyInput: componentLoader.add('MyInputComponent', '../components/MyInput'),
	// other custom components
}

export { componentLoader, Components }
