function Button({ type = 'button', color, children, className, ...restProps }) {
  let buttonStyle;

  switch (color) {
    case 'black':
      buttonStyle = 'bg-black text-white hover:bg-[#454444]';
      break;
    case 'white':
      buttonStyle = 'bg-white border border-black  hover:bg-[#e5e5e5]';
      break;

    case 'yellow':
      buttonStyle = 'bg-[#FEE500] border-none w-[25rem] border border-black  ';
      break;

    default:
      buttonStyle = '';
      break;
  }

  return (
    <button
      type={type}
      className={`${buttonStyle} ${className} font-medium h-[2.8125rem] rounded-sm`}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default Button;
