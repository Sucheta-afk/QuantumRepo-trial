
import { ReactNode } from 'react';

export const metadata = {
  title: "QuantumRepo - Upgrade your Git experience",
  description: "A powerful platform for developer collaboration.",
};

const HomeWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default HomeWrapper;
