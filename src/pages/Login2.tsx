import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import authApi from '@/api/auth.api'
import Button from '@/components/Button'
import { GithubIcon, GoogleIcon } from '@/components/Icons'
import Spring from '@/components/Spring'
import { path } from '@/constants'
import { AppContext } from '@/contexts'
import { LoginForm } from '@/pages/Login/components'
import { ErrorResponse, FormDataLogin } from '@/types'
import { isAxiosUnprocessableEntityError } from '@/utils'

export default function Login2() {
  const navigate = useNavigate()
  const location = useLocation()
  const [t] = useTranslation('login')
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const loginMutation = useMutation({
    mutationFn: (body: FormDataLogin) => authApi.login(body)
  })

  const handleLogin = (formValues: FormDataLogin) => {
    loginMutation.mutate(formValues, {
      onSuccess: async (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.metadata.user)

        if (location?.state) {
          navigate(location.state)
        } else {
          navigate(path.product)
        }
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<any>>(error)) {
          toast.error(error.response?.data?.message)
        }
      }
    })
  }

  return (
    <div>
      <Helmet>
        <title>Login | Shop Food</title>
        <meta name='description' content='Login into Shop Food project' />
      </Helmet>

      <div className='flex w-full items-center justify-center bg-widget px-4 py-10 lg:p-[60px]'>
        <Spring className='w-full max-w-[460px]' type='slideUp' duration={400} delay={300}>
          <div className='flex flex-col gap-2.5 text-center'>
            <h1>Welcome back!</h1>
            <p className='4xl:max-w-[unset] m-auto lg:max-w-[300px]'>{t('LOGIN_TITLE')}</p>
          </div>

          <LoginForm loading={loginMutation.isLoading} onSubmit={handleLogin} />

          <div className='mt-10'>
            <div className='relative'>
              <span className='absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-border' />
              <span className='relative z-10 m-auto flex h-[23px] w-11 items-center justify-center bg-widget'>or</span>
            </div>

            <div className='2xs:grid-cols-2 xs:gap-[30px] mb-9 mt-[30px] grid grid-cols-1 gap-4'>
              <Button
                variant='outline'
                htmlType='button'
                className='mx-auto mt-[16px] h-[48px] w-full gap-2 border-[1px] px-3 py-2 text-base font-medium'
              >
                <GoogleIcon />
                {t('LOGIN_WITH_GOOGLE')}
              </Button>

              <Button
                variant='outline'
                htmlType='button'
                className='mx-auto mt-[16px] h-[48px] w-full gap-2 border-[1px] px-3 py-2 text-base font-medium'
              >
                <GithubIcon />
                {t('LOGIN_WITH_GITHUB')}
              </Button>
            </div>
            <div className='flex justify-center gap-2.5 leading-none'>
              <p>{t('DO_NOT_HAVE_AN_ACCOUNT')}</p>
              <Link to={path.register} className='text-btn'>
                {t('SIGN_UP')}
              </Link>
            </div>
          </div>
        </Spring>
      </div>
    </div>
  )
}
