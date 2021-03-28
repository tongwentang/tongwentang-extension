import React from 'react';

export const Card: React.FC = props => <div className="card my-2">{props.children}</div>;

export const CardHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="card-header">
    <div className="card-title h3">{title}</div>
  </div>
);

export const CardBody: React.FC = props => <div className="card-body">{props.children}</div>;

export const CardFooter: React.FC = props => <div className="card-footer">{props.children}</div>;
