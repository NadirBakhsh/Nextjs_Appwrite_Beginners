'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignUpPage = () => {
	const router = useRouter()

	const [user, setUser] = useState({
		email: '',
		password: '',
		username: '',
	})

	const [buttonDisabled, setButtonDisabled] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (
			user.email.length > 0 &&
			user.username.length > 0 &&
			user.password.length > 0
		) {
			setButtonDisabled(false)
		} else {
			setButtonDisabled(true)
		}
	}, [user])

	const onSignUp = async () => {
		try {
			setLoading(true)
			const response =  await axios.post('/api/users/signup', user)
			console.log('response', response.data)
			router.push('/login')
		} catch (error: any) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='max-w-lg mx-auto mt-20'>
			<h1 className='text-2xl text-white'>Sign up form</h1>
			<div className='flex flex-col gap-1 mt-6'>
				<label
					className='uppercase'
					htmlFor='username'>
					Username
				</label>
				<input
					
					placeholder='username'
					type='text'
					className='h-[48px] rounded-[4px] indent-4 text-black'
					onChange={(e) => {
						setUser({ ...user, username: e.target.value })
					}}
				/>
			</div>
			<div className='flex flex-col gap-1 mt-6'>
				<label
					className='uppercase'
					htmlFor='email'>
					email
				</label>
				<input
					type='email'
					placeholder='email@gmail.com'
					className='h-[48px] rounded-[4px] indent-4 text-black'
					onChange={(e) => {
						setUser({ ...user, email: e.target.value })
					}}
				/>
			</div>
			<div className='flex flex-col gap-1 mt-6'>
				<label
					className='uppercase'
					htmlFor='password'>
					password
				</label>
				<input
					type='password'
					placeholder='password'
					className='h-[48px] rounded-[4px] indent-4 text-black'
					onChange={(e) => {
						setUser({ ...user, password: e.target.value })
					}}
				/>
			</div>
			<div className='flex flex-col justify-center items-center  gap-4 mt-6'>
				<button
					onClick={onSignUp}
					disabled={buttonDisabled}
					className='w-full bg-indigo-700 text-white py-4 rounded-[4px] text-lg font-medium disabled:bg-gray-500 disabled:cursor-not-allowed'>
					{loading ? 'Loading..' : 'Sign Up'}
				</button>
				<Link
					className='text-white hover:text-indigo-700'
					href={'/login'}>
					I have an account Login
				</Link>
			</div>
		</div>
	)
}

export default SignUpPage
