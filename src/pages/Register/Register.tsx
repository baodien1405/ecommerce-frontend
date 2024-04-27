import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { useWindowSize } from 'react-use'

import { RegisterForm } from './components'
import Image from '@/components/Image'
import { path } from '@/constants'
import authApi from '@/api/auth.api'
import { ErrorResponse, FormDataRegister } from '@/types'
import { isAxiosUnprocessableEntityError } from '@/utils'
import { AppContext } from '@/contexts'
import images from '@/assets/images'
import Button from '@/components/Button'
import { GithubIcon, GoogleIcon } from '@/components/Icons'
import Logo from '@/components/Logo'
import Spring from '@/components/Spring'

export default function Register() {
  const [t] = useTranslation('register')
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const { width } = useWindowSize()

  const registerAccountMutation = useMutation({
    mutationFn: (body: FormDataRegister) => authApi.registerAccount(body)
  })

  const handleRegister = (values: FormDataRegister) => {
    registerAccountMutation.mutate(values, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        setIsAuthenticated(true)
        setProfile(data.data.metadata.user)
        navigate('/')
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
        <title>Register | Tiki Clone</title>
        <meta name='description' content='Register account into Tiki Clone project' />
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
              <h1>{t('REGISTER_TITLE')}</h1>
              <p className='m-auto lg:max-w-[300px] 4xl:max-w-[unset]'>{t('REGISTER_SUB_TITLE')}</p>
            </div>

            <RegisterForm loading={registerAccountMutation.isLoading} onSubmit={handleRegister} />

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
                <p>{t('HAVE_ALREADY_ACCOUNT')}</p>
                <Link to={path.login} className='text-btn'>
                  {t('LOG_IN')}
                </Link>
              </div>
            </div>
          </Spring>
        </div>
      </div>
    </div>
  )
}
