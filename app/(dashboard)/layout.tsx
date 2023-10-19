import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const LimitCount = await getApiCount();
  const isPro = await checkSubscription();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-background">
        <Sidebar LimitCount={LimitCount} isPro={isPro} />
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
