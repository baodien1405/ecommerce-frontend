import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import Image from '@/components/Image'
import { path } from '@/constants'
import { ErrorResponse, FormDataLogin } from '@/types'
import { LoginForm } from './components'
import authApi from '@/api/auth.api'
import { isAxiosUnprocessableEntityError } from '@/utils'
import { AppContext } from '@/contexts'
import images from '@/assets/images'
import Button from '@/components/Button'
import { GithubIcon, GoogleIcon } from '@/components/Icons'

export default function Login() {
  const navigate = useNavigate()
  const [t] = useTranslation('login')
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const location = useLocation()

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
    <div className='flex h-screen items-center justify-center bg-[#efefef]'>
      <Helmet>
        <title>Login | Tiki Clone</title>
        <meta name='description' content='Login into Tiki Clone project' />
      </Helmet>

      <div className='flex w-[550px] rounded-[20px] bg-white'>
        <div className='w-[550px] p-8'>
          <Image className='mb-4 w-[70px] rounded object-contain' alt='logo' src={images.blueLogo} />

          <h4 className='mb-8 text-base text-body'>{t('LOGIN_TITLE')}</h4>

          <LoginForm loading={loginMutation.isLoading} onSubmit={handleLogin} />

          <hr className='mt-5' />

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

          <div className='mt-[20px] inline-block cursor-pointer text-[13px] leading-[1.15] text-accent'>
            {t('forgot password')}
          </div>

          <div className='mt-2 flex text-[13px]'>
            <span>{t('no account')}</span>
            <Link to={path.register} className='ml-2 cursor-pointer text-accent'>
              {t('create account')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
