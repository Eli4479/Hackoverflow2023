import React from 'react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import toast, { Toaster } from 'react-hot-toast';


const navigation = [
  { name: 'Dashboard', href: '/profile', current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Form = () => {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [creator, setCreator] = React.useState('')
  const [tags, setTags] = React.useState('')

  const add_post = async (e) => {
    toast.dismiss()
    toast.loading('Adding post...');

    e.preventDefault()
    try {
      let headersList = {
        "Content-Type": "application/json"
      }

      let bodyContent = JSON.stringify({
        "title": { title },
        "discretion": { description },
        "creator": { creator },
        "tags": { tags }
      });

      let response = await fetch("http://localhost:3030/posts", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });

      let data = await response.text();
      window.location.href = '/'

    }
    catch (err) {
      toast.dismiss()
      toast.error('Internal server error cannot add post');
    }
  }
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 z-20">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <span className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <span className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntY3A8wM9MtyPqd13CaOdNriuNFh1rmHGOA&usqp=CAU"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntY3A8wM9MtyPqd13CaOdNriuNFh1rmHGOA&usqp=CAU"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                  </div>
                </div>
                <a href="/">
                  <button type="button" class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-1 text-center mr-2">Back</button>
                </a>
              </div>
            </div >

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )
        }
      </Disclosure >
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase ">
            Add A Post
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Title</span>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setTitle(e.target.value)}
                  className="
            w-full
            block px-16 py-2 mt-2
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                  placeholder="Title of your post"
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Description</span>
                <input
                  name="email"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  className="
            block
            w-full
            mt-2 px-16 py-2
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                  placeholder="Description of your post"
                  required
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Creator</span>
                <input
                  name="email"
                  onChange={(e) => setCreator(e.target.value)}
                  type="text"
                  className="
            block
            w-full
            mt-2 px-16 py-2
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                  placeholder="Creator of this post"
                  required
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Tags</span>
                <input
                  name="email"
                  onChange={(e) => setTags(e.target.value)}
                  type="text"
                  className="
            block
            w-full
            mt-2 px-16 py-2
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                  placeholder="tag1,tag2..."
                  required
                />
              </label>
            </div>
            <div class="mb-6 mt-3">
              <button
                type="button"
                onClick={add_post}
                className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
              >
                Add Blog
              </button>
            </div>
            <div>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Form;