import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  CartIcon,
  CustomerAddressIcon,
  CustomerNotificationIcon,
  CustomerPaymentCardIcon,
  EyeOpenIcon,
  HeartIcon,
  OrderHistoryIcon,
  ReturnTrackingHistoryIcon,
  ReviewHubIcon,
  StartFillHalfIcon,
  UserIcon
} from '@/components/Icons'
import Image from '@/components/Image'
import { AppContext } from '@/contexts'

export function AsideProfile() {
  const [t] = useTranslation('profile')
  const { profile } = useContext(AppContext)

  const infoList = [
    { icon: <UserIcon />, label: t('aside profile.account info'), url: '' },
    { icon: <CustomerNotificationIcon />, label: t('aside profile.my notification'), url: '' },
    { icon: <OrderHistoryIcon />, label: t('aside profile.order management'), url: '' },
    { icon: <ReturnTrackingHistoryIcon />, label: t('aside profile.refund management'), url: '' },
    { icon: <CustomerAddressIcon />, label: t('aside profile.address'), url: '' },
    { icon: <CustomerPaymentCardIcon />, label: t('aside profile.payment info'), url: '' },
    { icon: <ReviewHubIcon />, label: t('aside profile.product review'), url: '' },
    { icon: <EyeOpenIcon />, label: t('aside profile.product seen'), url: '' },
    { icon: <HeartIcon />, label: t('aside profile.product love'), url: '' },
    { icon: <CartIcon />, label: t('aside profile.product buy later'), url: '' },
    { icon: <StartFillHalfIcon />, label: t('aside profile.my review'), url: '' }
  ]

  return (
    <div className='w-[250px] overflow-hidden rounded-l-[4px]'>
      <div className='mb-3 flex items-center'>
        <Image className='mr-3 w-[50px] rounded-full object-cover' alt='image' src={profile?.avatar || ''} />
        <div className='flex flex-col'>
          <span className='text-[13px] font-light leading-[15px] text-[#333333]'>Tài khoản của</span>
          <strong className='text-[16px] font-normal leading-[19px]'>Bảo Điền</strong>
        </div>
      </div>

      <div>
        {infoList.map((item, index) => (
          <NavLink
            to={item.url}
            key={index}
            className='flex items-center gap-[22px] py-[7px] px-4 text-[13px] hover:bg-[#ebebf0] hover:text-[#000] hover:opacity-95'
          >
            <div className='text-[#9b9b9b]'>{item.icon}</div>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
