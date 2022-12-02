import { Editor } from '@tiptap/react'
// @ts-ignore
import React, { FC, useMemo } from 'react'
import Icon from '@adminjs/design-system/src/atoms/icon'
import Text from '@adminjs/design-system/src/atoms/text'

interface MenuButtonProps {
  editor: Editor
  name: string
  onClick: () => void
  icon?: string
  attributes?: Record<string, any>
}

const MenuButton: FC<MenuButtonProps> = (props) => {
  const { name, editor, onClick, icon, attributes } = props

  const isActive = useMemo(
    () => (editor.isActive(attributes || name) ? 'active' : ''),
    [name, attributes],
  )

  return (
    <Text as="span" onClick={onClick} className={isActive} size="icon" mx="md">
      {icon ? <Icon icon={icon} /> : name}
    </Text>
  )
}

export default MenuButton
