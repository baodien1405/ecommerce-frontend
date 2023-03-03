import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Upload, UploadProps } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { UploadListType } from 'antd/es/upload/interface'
import { getBase64 } from '@/utils'

export interface UploadFieldProps {
  name: string
  label?: string
  accept?: string
  maxCount?: number
  listType?: UploadListType
  className?: string
  onChange: (imageURL: string) => void
}

export function UploadField({ name, label, accept, maxCount, listType, className, onChange }: UploadFieldProps) {
  const handleChange: UploadProps['onChange'] = async ({ file }: UploadChangeParam<UploadFile>) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
      file.status = 'done'
    }
    onChange(file.preview as string)
  }

  return (
    <Form.Item label={label ? <div className='flex w-[90px] items-start'>{label}</div> : null}>
      <Upload
        name={name}
        listType={listType}
        showUploadList={true}
        accept={accept}
        maxCount={maxCount}
        className={className}
        onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item>
  )
}
