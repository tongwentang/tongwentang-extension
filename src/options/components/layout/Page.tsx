import { FC, ReactNode } from 'react';

export const Page: FC<{ title: string; children: ReactNode }> = ({ title, children }) => {
  return (
    <section>
      <h1 className="text-center">{title}</h1>
      {children}
    </section>
  );
};
