import {Outlet, Link } from "react-router-dom"
import LoginForm from './components/LoginForm'

export default function Root() {

    return (
        <>
            <LoginForm/>
            <p>
                Not an author? <Link to={`/signup`}>Sign up</Link>
            </p>
        </>
    )
}