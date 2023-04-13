import React, { useState } from "react"

export const Register = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [storename, setStoreName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
    }
    return (
        <div div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input value={name} name="name" id='name' placeholder=""></input>

                <label>Store Name</label>
                <input value={storename} name="storename" id='storename' placeholder=""></input>

                <label htmlFor='email'>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder="" id='email' name="name"></input>

                <label htmlFor='password'>Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder="" id='password' name="password"></input>

                <label htmlFor='phone'>Phone</label>
                <input value={phone} onChange={(e) => setPass(e.target.value)} type='text' placeholder="" id='password' name="password"></input>

                <button type="submit" >Sign Up</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')} >Already have an account? Login here</button>
        </div>
    )
}