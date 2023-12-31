import { AiFillEye } from 'react-icons/ai';

function EyeOpen({ className, ...props }) {
  return (
    <>
      <AiFillEye
        role="button"
        type="button"
        className={`${className} hover:text-darkGray`}
        color="#181818"
        cursor="pointer"
        size="1.5rem"
        {...props}
      />
    </>
  );
}

export default EyeOpen;
