import { LoadingSpinner } from './LoadingSpinner'

interface SubmitButtonProps {
  isLoading: boolean
  text: string
  loadingText: string
}

export const SubmitButton = ({
  isLoading,
  text,
  loadingText,
}: SubmitButtonProps) => (
  <button
    type='submit'
    className='w-full bg-NormalBlue text-white py-2 px-4 rounded-md hover:bg-NormalBlueHover focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
  >
    {isLoading ? (
      <span className='flex items-center justify-center'>
        <LoadingSpinner />
        {loadingText}
      </span>
    ) : (
      text
    )}
  </button>
)
