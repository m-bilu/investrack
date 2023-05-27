import { Oval } from 'react-loader-spinner';
import { COLORS } from '@/constants/colors';

export default function LoadingSpinner({ classes }: { classes: string }) {
  return (
    <div className={`grid place-content-center ${classes}`}>
      <Oval
        width={60}
        height={60}
        color={COLORS.blue1}
        secondaryColor={COLORS.grey}
        ariaLabel='oval-loading'
        strokeWidth={6}
        strokeWidthSecondary={7}
      />
    </div>
  );
}
