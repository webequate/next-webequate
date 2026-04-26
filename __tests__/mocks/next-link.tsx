import type { AnchorHTMLAttributes, ReactNode } from "react";

type MockLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

const MockNextLink = ({ href, children, ...rest }: MockLinkProps) => (
  <a href={href} {...rest}>
    {children}
  </a>
);

export default MockNextLink;
