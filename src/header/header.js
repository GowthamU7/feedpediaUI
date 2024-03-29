import { Disclosure, } from '@headlessui/react'
import { Bars3Icon,  XMarkIcon } from '@heroicons/react/24/outline'
import { authContext } from '../context'
import { useContext } from 'react'
import Example from '../dropdown/dropdown'
import { Link } from 'react-router-dom'


const navigation = [
  { name: 'Feed', href: '/', current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {

    const {tknData} = useContext(authContext)


  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img 
                  src='https://t4.ftcdn.net/jpg/06/14/77/31/240_F_614773189_odBnRgeha3k4naHMGBlpQWrNv0y2f2Hx.jpg' 
                  className='w-8 h-8 rounded' 
                  alt='FeedPedia'/>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {tknData.tkn !== ''?<Example/>:<a
                        key="login"
                        href="/login"
                        className={classNames(
                          'bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                       
                      >
                        Login
                      </a>}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
