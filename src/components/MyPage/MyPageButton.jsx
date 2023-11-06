import { string } from 'prop-types';

function MyPageButton({text="버튼"}) {
  return (
    <button className="border border-black rounded px-7 py-1 mt-2">{text}</button>
  )
}

MyPageButton.propTypes = {
  text: string
}

export default MyPageButton