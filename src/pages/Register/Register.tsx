import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'

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

export default function Register() {
  const [t] = useTranslation('register')
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

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
    <div className='flex h-screen items-center justify-center bg-[#efefef]'>
      <Helmet>
        <title>Register | Tiki Clone</title>
        <meta name='description' content='Register account into Tiki Clone project' />
      </Helmet>

      <div className='flex w-[550px] rounded-[20px] bg-white'>
        <div className='w-[550px] p-8'>
          <Image className='mb-4 w-[70px] rounded object-contain' alt='logo' src={images.blueLogo} />

          <h4 className='mb-8 text-base text-body'>{t('please enter info to register')}</h4>

          <RegisterForm loading={registerAccountMutation.isLoading} onSubmit={handleRegister} />

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

          <div className='mt-[20px] flex text-[13px]'>
            <span>{t('do you have account')}</span>
            <Link to={path.login} className='ml-2 cursor-pointer text-accent'>
              {t('sign in')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
