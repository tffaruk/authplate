"use client";

import { subscriptionCancel } from "@/app/action";
import SubmitButton from "@/components/SubmitButton";
import useResponse from "@/hooks/useResponse";
import { useEffect } from "react";

const SubscriptionCancel = ({
  id,

}: {
  id: string;
 
}) => {
  const subscriptionCancelAction = subscriptionCancel.bind(null, id);
  const { dispatch } = useResponse(subscriptionCancelAction);

  return (
    <form action={dispatch}>
      <SubmitButton
        label="Cancel Subscription"
        pending_label="Cancelling..."
        className="bg-red-800"
      />
    </form>
  );
};

export default SubscriptionCancel;
