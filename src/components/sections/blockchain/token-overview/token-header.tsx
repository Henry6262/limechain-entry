import Lottie from 'react-lottie';
import { CardHeader, CardTitle } from '@/components/ui/card';
import tokenAnimation from '../../../../../public/lottie/token.json';

const lottieDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData: tokenAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export function TokenHeader() {
  return (
    <CardHeader className="pb-4 pl-0 pt-0 flex-row border-b flex items-center">
      <div className="flex-shrink-0">
        <Lottie options={lottieDefaultOptions} height={80} width={110} />
      </div>
      <CardTitle className="text-3xl font-bold text-[#ffbe00] !mt-6 pl-4">
        Token Checker
      </CardTitle>
    </CardHeader>
  );
} 