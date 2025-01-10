'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  UserGroupIcon, 
  BookOpenIcon, 
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline'

const menuSections = [
  {
    title: 'Principal',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
      { name: 'Agenda', href: '/agenda', icon: CalendarIcon },
    ]
  },
  {
    title: 'Terapia',
    items: [
      { name: 'Pacientes', href: '/pacientes', icon: UserGroupIcon },
      { name: 'Processos', href: '/processos', icon: ClipboardDocumentListIcon },
    ]
  },
  {
    title: 'Recursos',
    items: [
      { name: 'Biblioteca', href: '/biblioteca', icon: BookOpenIcon },
      { name: 'Configurações', href: '/configuracoes', icon: Cog6ToothIcon },
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <aside className="w-64 bg-indigo-800 text-white h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center px-4">
          <span className="text-xl font-semibold text-white">MuseTera</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-8">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xs uppercase tracking-wider text-indigo-200 font-semibold mb-2">
              {section.title}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-indigo-700 text-white'
                        : 'text-indigo-100 hover:bg-indigo-700'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
} 