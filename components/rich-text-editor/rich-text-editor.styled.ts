import styled from 'styled-components'
import Box from '@adminjs/design-system/src/atoms/box/box'
import { InputCSS, InputProps } from '@adminjs/design-system/src/atoms/input'
import { Text, TextProps } from '@adminjs/design-system/src/atoms/text'
import { cssClass, themeGet } from '@adminjs/design-system/src/utils'

export type EditorWrapperProps = TextProps & InputProps

export const EditorWrapper = styled(Text)<EditorWrapperProps>`
  position: relative;
  ${InputCSS}

  .ProseMirror-focused {
    outline: none;
  }

  .characterCount {
    position: absolute;
    bottom: ${themeGet('space', 'md')};
    right: ${themeGet('space', 'lg')};
    color: ${themeGet('colors', 'grey40')};
  }
`
EditorWrapper.defaultProps = {
  px: 'xl',
  py: 'xl',
  className: cssClass('EditorWrapper'),
}

export const MenuBarWrapper: any = styled(Box)`
  border: 1px solid ${themeGet('colors', 'inputBorder')};
  border-bottom: none;

  & .${cssClass('Icon')}:hover {
    cursor: pointer;
  }

  & .${cssClass('Icon')} svg {
    fill: ${themeGet('colors', 'grey100')};
  }

  & .active .${cssClass('Icon')} svg {
    fill: ${themeGet('colors', 'primary100')};
  }
`

MenuBarWrapper.defaultProps = {
  px: 'md',
  py: 'md',
  className: cssClass('MenuBarWrapper'),
}
