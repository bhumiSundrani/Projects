import React, {useEffect, useState} from 'react'
import { Postcard, Container } from '../components'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function Home() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getAllPosts().then((posts) => {
            if(posts)
                setPosts(posts.documents)
        })
    }, [])

    if(posts.length === 0){
        return(
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <Link to={'/login'} className='text-2xl font-bold hover:text-black hover:underline text-gray-900'>
                            Login to read posts
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 text-center'>
                            <Postcard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
