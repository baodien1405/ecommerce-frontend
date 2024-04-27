import { useNavigate } from 'react-router-dom'

import Logo from '@/components/Logo'
import images from '@/assets/images'
import Button from '@/components/Button'
import { path } from '@/constants'

import styles from './NotFound.module.scss'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <img className={styles.media} src={images.collage404} alt='404' />
      <div className={styles.main}>
        <span className={styles.main_code}>404</span>
        <h1 className={styles.main_title}>Page Not Found</h1>

        <Button
          variant='primary'
          htmlType='submit'
          size='large'
          className={styles.main_btn}
          onClick={() => navigate(path.product)}
        >
          Back to Home Page
        </Button>
      </div>
      <div className={styles.logo}>
        <Logo imgClass={styles.logo_img} textClass={styles.logo_text} />
      </div>
    </div>
  )
}
