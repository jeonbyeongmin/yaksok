import { Path } from '@/components/assets/common/iconStyle';
import { VariantProps } from '@stitches/react';

type PathVariants = VariantProps<typeof Path>;
type PathColor = Pick<PathVariants, 'color'>;

export interface IconProps {
  size?: number;
  color?: PathColor['color'];
}
