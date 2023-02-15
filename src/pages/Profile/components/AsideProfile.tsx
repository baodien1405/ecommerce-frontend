import { NavLink } from 'react-router-dom'
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

export function AsideProfile() {
  const infoList = [
    { icon: <UserIcon />, label: 'Thông tin tài khoản', url: '' },
    { icon: <CustomerNotificationIcon />, label: 'Thông báo của tôi', url: '' },
    { icon: <OrderHistoryIcon />, label: 'Quản lý đơn hàng', url: '' },
    { icon: <ReturnTrackingHistoryIcon />, label: 'Quản lý đổi trả', url: '' },
    { icon: <CustomerAddressIcon />, label: 'Sổ địa chỉ', url: '' },
    { icon: <CustomerPaymentCardIcon />, label: 'Thông tin thanh toán', url: '' },
    { icon: <ReviewHubIcon />, label: 'Đánh giá sản phẩm', url: '' },
    { icon: <EyeOpenIcon />, label: 'Sản phẩm bạn đã xem', url: '' },
    { icon: <HeartIcon />, label: 'Sản phẩm bạn yêu thích', url: '' },
    { icon: <CartIcon />, label: 'Sản phẩm bạn mua sau', url: '' },
    { icon: <StartFillHalfIcon />, label: 'Nhận xét của tôi', url: '' }
  ]

  return (
    <div className='w-[250px] overflow-hidden rounded-l-[4px]'>
      <div className='mb-3 flex items-center'>
        <Image
          className='mr-3 w-[50px] rounded-full object-contain'
          alt='image'
          src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
        />
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
