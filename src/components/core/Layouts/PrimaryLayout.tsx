import React from "react";

type PrimaryLayoutPropsType = {
  children: React.ReactNode;
  className?: string;
};

export const PrimaryLayout = ({
  children,
  className,
}: PrimaryLayoutPropsType) => {
  return (
    <section className={`max-w-[1400px] w-full mx-auto ${className}`}>
      {children}
    </section>
  );
};
