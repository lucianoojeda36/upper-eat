import React from 'react';
import { Circles } from 'react-loader-spinner';

interface LoadingProps {
  size?: number;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 80, color = '#F8B81C' }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Circles
        height={size}
        width={size}
        color={color}
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  );
};

export default Loading;
