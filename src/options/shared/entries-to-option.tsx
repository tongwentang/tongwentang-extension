import React from 'react';

export const entriesToOption = ([value, label]: [string, string]) => (
  <option key={value} value={value}>
    {label}
  </option>
);
