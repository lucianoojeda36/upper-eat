import React from 'react';

interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'subtitle' | 'paragraph';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Text: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
  style,
}) => {
  switch (variant) {
    case 'h1':
      return (
        <h1 className={className} style={style}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={className} style={style}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={className} style={style}>
          {children}
        </h3>
      );
    case 'subtitle':
      return (
        <h4 className={className} style={style}>
          {children}
        </h4>
      );
    case 'paragraph':
      return (
        <p className={className} style={style}>
          {children}
        </p>
      );
    default:
      return null;
  }
};

export default Text;
