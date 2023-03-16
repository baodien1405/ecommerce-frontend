import Image from '@/components/Image'
import { getBase64 } from '@/utils'
import { PlusOutlined } from '@ant-design/icons'
import { Upload, UploadProps } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'

export interface UploadAvatarProps {
  avatar: string
  onChange: (avatar: string) => void
}

export function UploadAvatar({ avatar, onChange }: UploadAvatarProps) {
  const UploadButton = (
    <div className='flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full border-[1px] border-dashed'>
      <PlusOutlined />
      <div className='mt-2'>Upload</div>
    </div>
  )

  const handleChange: UploadProps['onChange'] = async ({ file }: UploadChangeParam<UploadFile>) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }
    onChange(file.preview as string)
  }

  return (
    <Upload
      name='avatar'
      listType='picture-circle'
      className='block h-[100px] max-w-[100px]'
      showUploadList={false}
      accept='image/*'
      onChange={handleChange}
    >
      {avatar ? (
        <div className='relative rounded-full border-4 border-solid border-[#c2e1ff]'>
          <Image className='h-[92px] w-[100px] overflow-hidden rounded-full object-cover' alt='image' src={avatar} />
          <div className='absolute right-[3px] bottom-[5px] flex h-4 w-4 items-center justify-center rounded-xl bg-[#64646d]'>
            <Image
              className='h-[10px] w-[10px]'
              alt='image'
              src='https://frontend.tikicdn.com/_desktop-next/static/img/account/edit.png'
            />
          </div>
        </div>
      ) : (
        UploadButton
      )}
    </Upload>
  )
}
