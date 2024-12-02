import React, {useEffect, useState} from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        //we passed an empty array in getAllPosts because we want to remove all the filters that are applied in the
        service.getAllPosts([]).then((posts) => 
        {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, []) 
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post}/>    
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
