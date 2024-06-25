import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`p-4 rounded-lg shadow ${className}`}>{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`p-4 rounded-t-lg ${className}`}>{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);
