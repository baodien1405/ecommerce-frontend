import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { RegisterForm } from './components'
import Image from '@/components/Image'
import { path } from '@/constants'
import { FormDataRegister } from '@/types'

export default function Register() {
  const [t] = useTranslation('register')

  const initialValuesFormRegister = {
    email: 'capbaodien@gmail.com',
    password: '123456',
    confirmPassword: '123456'
  }

  const handleRegister = (values: FormDataRegister) => {
    console.log(values)
  }

  return (
    <div className='flex h-screen items-center justify-center bg-[#efefef]'>
      <div className='flex w-[800px] rounded-[20px] bg-white'>
        <div className='w-[500px] px-[45px] pt-10 pb-6'>
          <h4 className='mb-[10px] text-2xl font-medium text-[#242424]'>{t('create account')}</h4>
          <div className='mb-[20px] text-[15px] leading-[20px]'>{t('please enter info to register')}</div>

          <RegisterForm initialValues={initialValuesFormRegister} onSubmit={handleRegister} />

          <div className='mt-[20px] flex text-[13px]'>
            <span>{t('do you have account')}</span>
            <Link to={path.login} className='ml-2 cursor-pointer text-[#0d5cb6]'>
              {t('sign in')}
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
