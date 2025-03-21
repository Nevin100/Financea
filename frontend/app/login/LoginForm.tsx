"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { useFormStatus } from "react-dom";


const LoginForm = () => {


    const [state, loginAction] = useActionState(login,undefined);


  return (
   <div className="login-container">
      <h2>Login</h2>

      <form action={loginAction} className="login-form">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"

          />
        </div>
        {state?.errors?.email && (<p className="text-red-500"> {state.errors.email} </p>)}

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
        </div>

        {state?.errors?.password && (<p className="text-red-500"> {state.errors.password} </p>)}

<SubmitButton />
      </form>
    </div>
  )
}

export default LoginForm



export function SubmitButton () {
    const {pending} = useFormStatus();

    return (
        <button type="submit" disabled={pending}>
            Login
        </button>
    )
}