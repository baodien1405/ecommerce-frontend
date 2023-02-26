import { useTranslation } from 'react-i18next'
import { FormDataProfile } from '@/types'
import { AsideProfile, ProfileForm } from './components'

export default function Profile() {
  const [t] = useTranslation('profile')

  const initialProfileFormValues = {
    name: 'Bao Dien',
    email: 'capbaodien@gmail.com',
    phone: '123456789',
    address: 'Ho Chi Minh'
  }

  const handleProfileFormSubmit = (formValues: FormDataProfile) => {
    console.log(formValues)
  }

  return (
    <div className='h-[calc(100vh-61px)] bg-[#efefef]'>
      <div className='container'>
        <h4 className='py-[10px] text-sm font-light text-[#808089]'>{t('homepage > account info')}</h4>

        <div className='flex gap-[17px]'>
          <AsideProfile />
          <div className='flex-1'>
            <div className='mt-1 mb-3 text-[20px] font-light leading-8'>{t('account info')}</div>
            <div className='rounded-lg bg-white p-4'>
              <span className='mb-4 inline-block text-base font-normal text-[#64646d]'>{t('personal info')}</span>
              <ProfileForm initialValues={initialProfileFormValues} onSubmit={handleProfileFormSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
