import React from 'react';
import { i18n } from '../../../service/i18n/i18n';

export const Header: React.FC = () => {
  return (
    <header className="navbar">
      <section className="navbar-section" />
      <section className="navbar-center">
        <h1>{i18n.getMessage('MSG_EXT_NAME')}</h1>
      </section>
      <section className="navbar-section" />
    </header>
  );
};
