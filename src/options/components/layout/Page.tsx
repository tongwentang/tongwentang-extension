import { FC } from 'react';

export const Page: FC<{ title: string }> = ({ title, children }) => {
  return (
    <section>
      <h1 className="text-center">{title}</h1>
      {children}
    </section>
  );
};
