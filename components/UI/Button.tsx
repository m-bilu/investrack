import Link from 'next/link';

type ButtonProps = {
  type: 'route' | 'link' | 'onClick' | 'submit';
  hierarchy: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  route?: string;
  link?: string;
  onClick?: () => void;
  font?: string;
  bg?: string;
  padding?: string;
  border?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  classes?: string;
  children: React.ReactNode;
};

export default function Button({
  type,
  hierarchy,
  route,
  link,
  onClick,
  font,
  bg,
  padding = 'py-3',
  border,
  icon,
  disabled,
  classes,
  children,
}: ButtonProps) {
  let buttonClasses = `transition-300 relative inline-block text-center rounded-full text-md font-medium 
                       ${font} ${bg} ${padding} ${border} 
                       ${disabled ? 'opacity-60 cursor-auto' : ''} 
                       ${classes}`;

  if (hierarchy === 'primary') {
    buttonClasses += ' bg-gradient text-black';
  } else if (hierarchy === 'secondary') {
    buttonClasses += ' bg-black border border-lightGrey text-lightGrey';
  } else if (hierarchy === 'tertiary') {
    buttonClasses += ' bg-blue1 hover:bg-blue2 text-darkGrey';
  } else {
    buttonClasses +=
      ' bg-darkGrey border border-blue1 hover:border-blue2 text-blue1 hover:text-blue2';
  }

  const buttonIcon = icon && (
    <div className='absolute right-5 top-1/2 -translate-y-1/2'>{icon}</div>
  );

  if (type === 'route') {
    return (
      <Link href={disabled ? '' : route || ''} className={buttonClasses}>
        {children}
        {buttonIcon}
      </Link>
    );
  } else if (type === 'link') {
    return (
      <a href={disabled ? '' : link} className={buttonClasses}>
        {children}
        {buttonIcon}
      </a>
    );
  } else if (type === 'onClick') {
    return (
      <button
        type='button'
        onClick={disabled ? () => {} : onClick}
        className={buttonClasses}
      >
        {children}
        {buttonIcon}
      </button>
    );
  } else {
    return (
      <button type='submit' disabled={disabled} className={buttonClasses}>
        {children}
        {buttonIcon}
      </button>
    );
  }
}
