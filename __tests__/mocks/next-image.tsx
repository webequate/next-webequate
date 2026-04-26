import type { ImgHTMLAttributes } from "react";

type MockImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
};

const MockNextImage = ({
  src,
  alt,
  width,
  height,
  priority: _priority,
  fill: _fill,
  ...rest
}: MockImageProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} width={width} height={height} {...rest} />
);

export default MockNextImage;
