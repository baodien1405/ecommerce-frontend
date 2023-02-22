import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Image from '@/components/Image'
import { path } from '@/constants'
import { FormDataLogin } from '@/types'
import { LoginForm } from './components'

export default function Login() {
  const { t } = useTranslation('login')
  const initialLoginFormValue = {
    email: 'capbaodien@gmail.com',
    password: '123456'
  }

  const handleLogin = (values: FormDataLogin) => {
    console.log(values)
  }

  return (
    <div className='flex h-screen items-center justify-center bg-[#efefef]'>
      <div className='flex w-[800px] rounded-[20px] bg-white'>
        <div className='w-[500px] px-[45px] pt-10 pb-6'>
          <h4 className='mb-[10px] text-2xl font-medium text-[#242424]'>{t('hello')}</h4>
          <div className='mb-[20px] text-[15px] leading-[20px]'>{t('sign in or create account')}</div>

          <LoginForm initialValues={initialLoginFormValue} onSubmit={handleLogin} />

          <div className='mt-[20px] inline-block cursor-pointer text-[13px] leading-[1.15] text-[#0d5cb6]'>
            {t('forgot password')}
          </div>

          <div className='mt-2 flex text-[13px]'>
            <span>{t('no account')}</span>
            <Link to={path.register} className='ml-2 cursor-pointer text-[#0d5cb6]'>
              {t('create account')}
            </Link>
          </div>
        </div>

        <div className='flex w-[300px] items-center justify-center overflow-hidden rounded-r-[20px] bg-gradient-to-r from-[#f0f8ff] to-[#dbeeff]'>
          <Image
            className='w-[230px] rounded object-contain'
            alt='image'
            src='https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png'
          />
        </div>
      </div>
    </div>
  )
}
