type IconButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  children?: React.ReactNode;
};

export default function IconButton({
  onClick,
  icon,
  children,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`transition-300 flex cursor-pointer items-center gap-2 rounded-full border border-grey p-2 text-lightGrey hover:border-lightGrey hover:text-white
                  ${children ? 'px-3' : ''}`}
    >
      {icon}
      {children}
    </button>
  );
}
