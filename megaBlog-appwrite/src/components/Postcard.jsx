import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function Postcard({
    $id, 
    title, 
    featuredImage,
    authorName
}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl max-h-44 sm:h-auto mx-auto' />
                </div>
                <h2 className='text-medium font-bold sm:text-xl'>{title}</h2>
                <p className='text-xs sm:text-sm text-right'>{authorName}</p>
            </div>
        </Link>
    )
}

export default Postcard
