'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Pacientes',
    href: '/pacientes',
    icon: UserGroupIcon,
    children: [
      { name: 'Lista de Pacientes', href: '/pacientes' },
      { name: 'Novo Paciente', href: '/pacientes/novo' }
    ]
  },
  {
    name: 'Processos',
    icon: ClipboardDocumentListIcon,
    children: [
      { name: 'Anamnese', href: '/processos/anamnese' },
      { name: 'Avaliação', href: '/processos/avaliacao' },
      { name: 'Plano Terapêutico', href: '/processos/plano' },
      { name: 'Intervenções', href: '/processos/intervencoes' },
      { name: 'Reavaliação', href: '/processos/reavaliacao' },
      { name: 'Relatório', href: '/relatorios/novo' }
    ]
  },
  {
    name: 'Relatórios',
    href: '/relatorios',
    icon: DocumentTextIcon,
    children: [
      { name: 'Lista de Relatórios', href: '/relatorios/lista' },
      { name: 'Relatório de Sessão', href: '/relatorios/novo?tipo=sessao' },
      { name: 'Relatório Mensal', href: '/relatorios/novo?tipo=mensal' },
      { name: 'Relatório Semestral', href: '/relatorios/novo?tipo=semestral' },
      { name: 'Relatório para Família', href: '/relatorios/novo?tipo=familia' },
      { name: 'Relatório para Equipe', href: '/relatorios/novo?tipo=equipe' }
    ]
  }
]

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      {/* Menu móvel overlay */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog 
          as="div" 
          className="fixed inset-0 z-50 lg:hidden" 
          onClose={setSidebarOpen}
        >
          {/* Fundo escuro */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          {/* Menu lateral móvel */}
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-4 sm:px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center justify-between">
                    <h1 className="text-lg sm:text-xl font-semibold text-indigo-600">MusicoCare</h1>
                    <button 
                      onClick={() => setSidebarOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-4 sm:gap-y-7">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          {item.href ? (
                            <Link
                              href={item.href}
                              className={cn(
                                isActive(item.href)
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                              )}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <item.icon
                                className={cn(
                                  isActive(item.href)
                                    ? 'text-indigo-600'
                                    : 'text-gray-400 group-hover:text-indigo-600',
                                  'h-5 w-5 sm:h-6 sm:w-6 shrink-0'
                                )}
                                aria-hidden="true"
                              />
                              <span className="text-xs sm:text-sm">{item.name}</span>
                            </Link>
                          ) : (
                            <div className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700">
                              <item.icon
                                className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="text-xs sm:text-sm">{item.name}</span>
                            </div>
                          )}
                          {item.children && (
                            <ul className="mt-1 ml-6 sm:ml-8 space-y-1">
                              {item.children.map((child) => (
                                <li key={child.name}>
                                  <Link
                                    href={child.href}
                                    className={cn(
                                      isActive(child.href)
                                        ? 'bg-gray-50 text-indigo-600'
                                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                      'block rounded-md py-1 sm:py-2 pr-2 pl-6 sm:pl-9 text-xs sm:text-sm leading-6'
                                    )}
                                    onClick={() => setSidebarOpen(false)}
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Barra de navegação móvel */}
      <div className="sticky top-0 z-40 flex items-center gap-x-4 bg-white px-4 py-3 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Abrir menu</span>
          <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-xs sm:text-sm font-semibold leading-6 text-gray-900">
          MusicoCare
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 xl:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-4 xl:px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-lg xl:text-xl font-semibold text-indigo-600">MusicoCare</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-5 xl:gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={cn(
                            isActive(item.href)
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-xs xl:text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={cn(
                              isActive(item.href)
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600',
                              'h-5 w-5 xl:h-6 xl:w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ) : (
                        <div className="group flex gap-x-3 rounded-md p-2 text-xs xl:text-sm leading-6 font-semibold text-gray-700">
                          <item.icon
                            className="h-5 w-5 xl:h-6 xl:w-6 shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          {item.name}
                        </div>
                      )}
                      {item.children && (
                        <ul className="mt-1 ml-6 xl:ml-8 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className={cn(
                                  isActive(child.href)
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                  'block rounded-md py-1 xl:py-2 pr-2 pl-6 xl:pl-9 text-xs xl:text-sm leading-6'
                                )}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}