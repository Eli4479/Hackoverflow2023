import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
const Grid = () => {
    const [posts, setPosts] = React.useState([])
    const getpost = async () => {
        try {
            let headersList = {
                "Accept": "/",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            }

            let response = await fetch("http://localhost:3030/posts", {
                method: "GET",
                headers: headersList
            });

            if (response.status === 404) {
                toast.dismiss()
                toast.error('Internal server error cannot fetch posts');
            }
            else {
                let data = await response.text();
                data = JSON.parse(data)
                setPosts(data)
            }

        }
        catch (err) {
            toast.dismiss()
            toast.error('Internal server error cannot fetch posts');
        }
    }
    const deletePost = async (id) => {
        toast.dismiss()
        toast.loading('Deleting post...');
        try {
            let headersList = {
                "Accept": "/",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            }
            let response = await fetch(`http://localhost:3030/posts/${id}`, {
                method: "DELETE",
                headers: headersList
            });
            let data = await response.text();
            toast.dismiss()
            toast.success('Post deleted successfully');
            getpost()
        }
        catch (err) {
            toast.dismiss()
            toast.error('Internal server error cannot delete post');
        }
    }
    React.useEffect(() => {
        getpost()
    }, [])
    return (
        <div className="bg-white py-24 sm:py-32" >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Blogs</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Experiences of the collage by students
                    </p>
                </div>
                {
                    posts.length > 0 ?
                        (
                            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                {posts.map((post) => (
                                    <article key={post._id} className="flex max-w-xl flex-col items-start p-5 justify-between border-spacing-1 border-slate-950 border-2 rounded-lg">
                                        <div className="flex items-center gap-x-4 text-xs">
                                            <time dateTime={post.createdAt} className="text-gray-500">
                                                ({
                                                    new Date(post.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })
                                                })
                                            </time>
                                            {
                                                post.creator ? (
                                                    <span className="text-gray-500">by {post.creator}</span>
                                                ) : (
                                                    <span className="text-gray-500">by Anonymous</span>
                                                )
                                            }
                                            {/* </a> */}
                                        </div>
                                        <div className="group relative">
                                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            </h3>
                                            {/* make a section for tags in grey  */}
                                            <div className="mt-4 flex items-center gap-x-4">
                                                <div className="flex-shrink-0">
                                                    <span className="m-1 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                                        Tags:
                                                    </span>
                                                    {/* for each tag return an element */}
                                                    {
                                                        post.tags.map((tag) => (
                                                            <span className="m-1 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                                                {
                                                                    tag.length > 0 ? `#${tag}` : "No tag"
                                                                }
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                                Description:
                                            </p>
                                            <p className="mt-5 line-clamp-3 text-md leading-6 text-gray-600">{
                                                post.message ? post.message : "No description"
                                            }</p>
                                        </div>
                                        <div className="relative mt-8 flex items-center gap-x-4">
                                            <div className="text-sm leading-6">
                                                <p className="font-semibold text-gray-900">
                                                    Title:
                                                </p>
                                                <p className="font-semibold text-gray-900 text-xxl">
                                                    {
                                                        post.title.length > 0 ? post.title : "Untitled"
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <button type="button" class="focus:outline-none mt-6 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            onClick={() => {
                                                deletePost(post._id)
                                            }
                                            }
                                        >Delete</button>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            // at center page show NO POSTS available
                            <div className="flex justify-center items-center">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">No Posts Available</h1>
                            </div>

                        )
                }
            </div>
            <Toaster />
        </div >
    )
}

export default Grid
