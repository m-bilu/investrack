import { closeMenu } from '@/store/slices/mobileMenuSlice';
import { useDispatch } from 'react-redux';

type MenuItemProps = {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  classes?: string;
};

export default function MenuItem({
  label,
  icon,
  isActive,
  onClick,
  classes,
}: MenuItemProps) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        onClick();
        dispatch(closeMenu());
      }}
      className={`transition-300 flex cursor-pointer items-center gap-3 rounded-md px-3 py-3.5 ${
        isActive ? 'bg-darkGrey' : 'hover:bg-darkGrey'
      } ${classes}`}
    >
      {icon}
      <span
        className={`transition-300 text-base ${
          isActive ? 'text-white' : 'text-lightGrey'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
