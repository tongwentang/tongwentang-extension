import { FC } from 'react';

export const Divider: FC<{ content?: string }> = ({ content }) => {
  return (
    <div className="divider text-center" style={{ marginTop: '1.5em', marginBottom: '1.5em' }} data-content={content} />
  );
};
