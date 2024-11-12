import useAuth from '@/hook/useAuth';

export const UserBubble = ({ userId }:{ userId: string }) => {
  const { user } = useAuth();
  const shortenedName = userId.toString().substring(userId.length - 3, userId.length - 1)

  return user?.sub !== userId ? 
  (
    <div className='w-[40px] h-[40px] ml-3 bg-amber-200 flex flex-col justify-center items-center rounded-full'>
      {shortenedName}
    </div>
  ) : null;
}
