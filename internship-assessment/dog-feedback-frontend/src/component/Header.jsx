import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div className='py-4 px-2 border-b-2 flex justify-between'>
            <Link to="/">
                Home
            </Link>
            <Link to="/feedback">
                Feedbacks
            </Link>
        </div>
    )
}
