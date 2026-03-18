type ScrollAreaPropsType = {
  children: React.ReactNode;
  className?: string;
};

export const ScrollArea = ({ children, className }: ScrollAreaPropsType) => {
  return (
    <div
      className={`overflow-y-auto overflow-x-hidden [scrollbar-width:thin]
  [scrollbar-color:transparent_transparent]
  hover:[scrollbar-color:var(--scroll-bar-color)_transparent]
  transition-all ${className}`}
    >
      {children}
    </div>
  );
};
