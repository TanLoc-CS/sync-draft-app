import useAuth from '@/hook/useAuth';
import { getRandomColor } from '@/util/random_color';

export const UserBubble = ({ userId }:{ userId: string }) => {
  const { user } = useAuth();
  const shortenedName = userId.toString().substring(userId.length - 3, userId.length - 1)

  const bgColor = getRandomColor();

  return user?.sub !== userId ? 
  (
    <div 
      className='w-[40px] h-[40px] ml-3 flex flex-col justify-center items-center rounded-full'
      style={{ backgroundColor: bgColor }}
    >
      {shortenedName}
    </div>
  ) : (
    <div 
      className='w-[40px] h-[40px] ml-3 flex flex-col justify-center items-center rounded-full'
      style={{ backgroundColor: bgColor }}
    >
      Me
    </div>
  );
}
