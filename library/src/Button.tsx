import React from 'react';

export const UiButton = ({ label }: { label: string }) => {
  return (
    <button type="button" style={{ background: 'lightcoral' }}>
      UI Button {label}
    </button>
  );
};
