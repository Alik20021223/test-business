import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className='flex max-w-full px-10 py-[37px]'>
      <main className='gap w-full flex-grow'>
        <Outlet />
      </main>
    </div>
  );
}
