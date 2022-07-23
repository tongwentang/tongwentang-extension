import { FC, ReactNode } from 'react';

export const Card: FC<{ children: ReactNode }> = props => <div className="card my-2">{props.children}</div>;

export const CardHeader: FC<{ title: string; children?: ReactNode }> = ({ title }) => (
  <div className="card-header">
    <div className="card-title h3">{title}</div>
  </div>
);

export const CardBody: FC<{ children: ReactNode }> = props => <div className="card-body">{props.children}</div>;

export const CardFooter: FC<{ children?: ReactNode }> = props => <div className="card-footer">{props.children}</div>;
