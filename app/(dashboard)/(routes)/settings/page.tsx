import Heading from "@/components/Heading";
import Subscriptionbutton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";
import React from "react";

type Props = {};

const SettingsPage = async (props: Props) => {
  const isPro = await checkSubscription();
  return (
    <section>
      <Heading
        Icon={Settings}
        title="Settings"
        desc="Manage account settings"
      />

      <div className="px-4 lg:px-8 space-y-4">
        <div className=" text-sm text-primary">
          {isPro
            ? "you are currently on a Plus plan"
            : "you are currently on a free plan"}
        </div>
        <Subscriptionbutton isPro={isPro} />
      </div>
    </section>
  );
};

export default SettingsPage;
