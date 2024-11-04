import { Link } from 'react-router-dom'
import { EditingIcon } from '@/assets/icons'

const Logo = () => {
  return (
    <Link to={'/'}>
      <div className="flex items-center space-x-2">
        <EditingIcon />
        <span className="text-2xl font-bold">Sync Draft</span>
      </div>
    </Link>
  )
}

export default Logo