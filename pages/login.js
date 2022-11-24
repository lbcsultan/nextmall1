import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { getError } from '../utils/error'

export default function LoginScreen() {
  const { data: session } = useSession()
  const router = useRouter()
  const { redirect } = router.query

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [router, session, redirect])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const githubLoginHandler = async () => {
    try {
      const result = await signIn('github', { redirect: false })
      console.log('Github Login: ' + result)
    } catch (error) {
      toast.error(getError(error))
    }
  }

  const googleLoginHandler = async () => {
    try {
      const result = await signIn('google', { redirect: false })
      console.log('Google Login: ' + result)
    } catch (error) {
      toast.error(getError(error))
    }
  }

  const kakaoLoginHandler = async () => {
    try {
      const result = await signIn('kakao', { redirect: false })
      console.log('Kakao Login: ' + result)
    } catch (error) {
      toast.error(getError(error))
    }
  }

  const naverLoginHandler = async () => {
    try {
      const result = await signIn('naver', { redirect: false })
      console.log('Naver Login: ' + result)
    } catch (error) {
      toast.error(getError(error))
    }
  }

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="text-3xl text-center mb-4">Login</h1>

        <div className="mb-4 p-4 rounded-lg">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: '유효한 이메일 주소를 입력하세요',
              },
            })}
            className="w-full mb-4"
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 3,
                message: '패스워드는 3글자 이상으로 입력하세요',
              },
            })}
            className="w-full mb-4"
            id="password"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500"> {errors.password.message} </div>
          )}

          <button className="primary-button mb-4" type="submit">
            Login
          </button>
          <div>
            계정이 없으면 등록하세요. &nbsp;-&nbsp;
            <Link href="register">Register</Link>
          </div>
        </div>

        <div className="mb-4 p-4 rounded-lg">
          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="button"
              onClick={githubLoginHandler}
            >
              Github Login
            </button>
          </div>

          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="button"
              onClick={googleLoginHandler}
            >
              Google Login
            </button>
          </div>

          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="button"
              onClick={kakaoLoginHandler}
            >
              카카오 로그인
            </button>
          </div>

          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="button"
              onClick={naverLoginHandler}
            >
              네이버 로그인
            </button>
          </div>
        </div>
      </form>
    </Layout>
  )
}
