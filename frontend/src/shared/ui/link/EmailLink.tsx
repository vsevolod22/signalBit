import type { AnchorHTMLAttributes, PropsWithChildren, ReactElement } from 'react';

interface EmailLinkProps extends PropsWithChildren, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  email: string;
}

export function EmailLink({ children, email, ...anchorProps }: EmailLinkProps): ReactElement {
  return (
    <a {...anchorProps} href={`mailto:${email}`}>
      {children ?? email}
    </a>
  );
}
