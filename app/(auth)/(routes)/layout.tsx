const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-screen flex items-center justify-center bg-background">
      {children}
    </section>
  );
};

export default AuthLayout;
