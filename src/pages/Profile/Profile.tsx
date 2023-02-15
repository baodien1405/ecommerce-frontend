import { InputField } from '@/components/FormFields'
import Image from '@/components/Image'
import { Button, Form, Upload } from 'antd'
import { AsideProfile } from './components'

export default function Profile() {
  return (
    <div className='h-[calc(100vh-61px)] bg-[#efefef]'>
      <div className='container'>
        <h4 className='py-[10px] text-sm font-light text-[#808089]'>{'Trang chủ > Thông tin tài khoản'}</h4>

        <div className='flex gap-[17px]'>
          <AsideProfile />
          <div className='flex-1'>
            <div className='mt-1 mb-3 text-[20px] font-light leading-8'>Thông tin tài khoản</div>
            <div className='rounded-lg bg-white p-4'>
              <span className='text-base font-normal text-[#64646d]'>Thông tin cá nhân</span>

              <div className='mt-4'>
                <Form colon={false}>
                  <div className='flex gap-5'>
                    <Upload
                      name='avatar'
                      listType='picture'
                      className='block h-[100px] w-[100px]'
                      showUploadList={false}
                      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                      // beforeUpload={beforeUpload}
                      // onChange={handleChange}
                    >
                      <Image
                        className='overflow-hidden rounded-full'
                        alt='image'
                        src='https://salt.tikicdn.com/cache/512x512/ts/avatar/03/65/b2/4c98456da9487007e081105f3675b4fa.jpg'
                      />
                    </Upload>

                    <div className='w-[700px]'>
                      <InputField
                        label='Name'
                        name='name'
                        placeholder='Thêm tên'
                        classNameInput='py-2'
                        message='Vui lòng nhập tên'
                      />
                      <InputField
                        label='Email'
                        name='email'
                        placeholder='abc@email.com'
                        classNameInput='py-2'
                        message='Vui lòng nhập email'
                      />
                      <InputField
                        label='Phone'
                        name='phone'
                        placeholder='Thêm số điện thoại'
                        classNameInput='py-2'
                        message='Vui lòng nhập số điện thoại'
                      />
                      <InputField
                        label='Address'
                        name='address'
                        placeholder='Thêm địa chỉ'
                        classNameInput='py-2'
                        message='Vui lòng nhập address'
                      />
                    </div>
                  </div>

                  <Button type='primary' className='mx-auto block h-10 w-[176px] rounded bg-[#0b74e5]'>
                    Lưu thay đổi
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
