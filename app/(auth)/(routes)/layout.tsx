const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-full flex items-center justify-center bg-green-900">
      {children}
    </section>
  );
};

export default AuthLayout;
