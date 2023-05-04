export default function ErrorModal() {
  return (
    <div className='fixed h-full w-full top-0 left-0 bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-80 flex items-center justify-center'>
      <div className='flex items-center justify-center'>
        <div className='text-center p-5 rounded-xl bg-red-500 dark:bg-red-900 text-red-50'>
          Something went wrong
        </div>
      </div>
    </div>
  )
}