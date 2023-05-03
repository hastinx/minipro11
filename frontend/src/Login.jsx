import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { login } from "./redux/reducer/userSlice"
export const Login = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await axios.post("http://localhost:1234/api/user/login", {
                email: email,
                password: pass
            })

            // console.log(data.data.values)
            navigate("/product/list")
            dispatch(login({ id: data.data.values[0].id, username: data.data.values[0].username }))
        } catch (error) {

        }

    }
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="label-form" htmlFor='email'>Email</label>
                <input className="input-form" value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder="" id='email' name="name"></input>
                <label className="label-form" htmlFor='password'>Password</label>
                <input className="input-form" value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder="" id='password' name="password"></input>
                <button type="submit" >Log in</button>
            </form>
            <button className="link-btn button-form" onClick={() => props.onFormSwitch('register')} >Sign Up Here</button>
        </div>
    )
}