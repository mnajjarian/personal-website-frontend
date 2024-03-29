import React, { useState, useContext, FormEvent, ChangeEvent } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { Redirect } from 'react-router'
import { Button } from '../Button/Button'
import { AuthService } from 'services/authService'

interface InitialState {
  username: string
  password: string
}
const initialState: InitialState = { username: '', password: '' }

export function Login(): JSX.Element {
  const [state, setState] = useState<InitialState>(initialState)
  const {
    authDispatch,
    authState: { isLoggedIn },
  } = useContext(AuthContext)
  const authService = new AuthService(authDispatch)
  const { username, password } = state

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent): Promise<JSX.Element | undefined> => {
    e.preventDefault()
    try {
      await authService.signin(state)
      return <Redirect to="/dashboard" />
    } catch (error) {
      alert(error.message)
    }
  }
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />
  }
  return (
    <div className="login">
      <h1>Please login to continue</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label" htmlFor="username">
            Username
          </label>
          <input
            className="form__input"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form__button">
          <Button text="Login" />
        </div>
      </form>
    </div>
  )
}
