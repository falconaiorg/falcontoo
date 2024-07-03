const isDevelopment = () => process.env.NODE_ENV === "development";

// ComingSoon component
export const Soon = ({ children }: { children: React.ReactNode }) => {
  if (isDevelopment()) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="pointer-events-none brightness-50">{children}</div>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-2xl text-white">
        Coming Soon
      </div>
    </div>
  );
};
