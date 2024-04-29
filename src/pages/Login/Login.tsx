import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useWindowSize } from 'react-use'

import authApi from '@/api/auth.api'
import Button from '@/components/Button'
import { GithubIcon, GoogleIcon } from '@/components/Icons'
import Spring from '@/components/Spring'
import { path } from '@/constants'
import { AppContext } from '@/contexts'
import { LoginForm } from '@/pages/Login/components'
import { ErrorResponse, FormDataLogin } from '@/types'
import { isAxiosUnprocessableEntityError } from '@/utils'
import Logo from '@/components/Logo'
import Image from '@/components/Image'
import images from '@/assets/images'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [t] = useTranslation('login')
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const { width } = useWindowSize()

  const loginMutation = useMutation({
    mutationFn: (body: FormDataLogin) => authApi.login(body)
  })

  const handleLogin = (formValues: FormDataLogin) => {
    loginMutation.mutate(formValues, {
      onSuccess: async (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.metadata.shop)

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
    <div className='flex min-h-screen flex-col'>
      <Helmet>
        <title>Login | Shop Food</title>
        <meta name='description' content='Login into Shop Food project' />
      </Helmet>

      <div className='grid flex-1 grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)]'>
        {width >= 1024 && (
          <div className='flex flex-col items-center justify-center lg:p-[60px]'>
            <Logo imgClass='w-[40px]' textClass='text-[28px]' />

            <p className='mx-auto my-7 max-w-[540px] text-center text-lg font-semibold leading-6 tracking-[0.2px]'>
              {t('INTRO')}
            </p>

            <Image className='max-w-[780px]' alt='media' src={images.media} />
          </div>
        )}

        <div className='flex w-full items-center justify-center bg-widget px-4 py-10 lg:p-[60px]'>
          <Spring className='w-full max-w-[460px]' type='slideUp' duration={400} delay={300}>
            <div className='mb-5 flex flex-col gap-2.5 text-center'>
              <h1>{t('LOGIN_TITLE')}</h1>
              <p className='m-auto lg:max-w-[300px] 4xl:max-w-[unset]'>{t('LOGIN_SUB_TITLE')}</p>
            </div>

            <LoginForm loading={loginMutation.isLoading} onSubmit={handleLogin} />

            <div className='mt-10'>
              <div className='relative'>
                <span className='absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-border' />
                <span className='relative z-10 m-auto flex h-[23px] w-11 items-center justify-center bg-widget'>
                  or
                </span>
              </div>

              <div className='mb-9 mt-[30px] grid grid-cols-1 gap-4 2xs:grid-cols-2 xs:gap-[30px]'>
                <Button variant='social' size='large' htmlType='button' className='mx-auto w-full'>
                  <GoogleIcon />
                  {t('LOGIN_WITH_GOOGLE')}
                </Button>

                <Button variant='social' size='large' htmlType='button' className='mx-auto w-full'>
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
    </div>
  )
}
