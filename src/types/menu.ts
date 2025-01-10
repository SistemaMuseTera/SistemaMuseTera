import { IconType } from 'react-icons'

export interface MenuItem {
  name: string
  href: string
  icon: IconType
}

export interface MenuSection {
  title: string
  items: MenuItem[]
} 