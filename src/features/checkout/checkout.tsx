"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useOrders } from "@/context/order-context";
import { ShippingAddress, PaymentMethod, CheckoutStep } from "@/types/order";
import { CheckoutStepIndicator } from "./checkout-step-indicator";
import { CheckoutOrderSummary } from "./checkout-order-summary";
import { CheckoutAddress } from "./checkout-address";
import { CheckoutPayment } from "./checkout-payment";
import { CheckoutReview } from "./checkout-review";
import { CheckoutConfirmation } from "./checkout-confirmation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const { submitOrder } = useOrders();

  const [step, setStep] = useState<CheckoutStep>("address");
  const [address, setAddress] = useState<ShippingAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<{
    method: PaymentMethod;
    cardLastFour?: string;
  } | null>(null);
  const [placedOrder, setPlacedOrder] = useState<{
    orderNumber: string;
    estimatedDelivery: string;
  } | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [prevIndex, setPrevIndex] = useState(0);

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="mx-auto max-w-md space-y-4 py-24 text-center">
        <p className="font-playfair text-2xl text-foreground">Your cart is empty</p>
        <button
          onClick={() => router.push("/products")}
          className="h-12 rounded-xl border border-border bg-card px-8 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
        >
          Browse Catalog
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!address || !paymentMethod) return;

    setIsPlacing(true);
    try {
      const order = await submitOrder({
        items,
        shippingAddress: address,
        paymentDetails: {
          method: paymentMethod.method,
          cardLastFour: paymentMethod.cardLastFour,
        },
      });
      clearCart();
      setPlacedOrder({
        orderNumber: order.orderNumber,
        estimatedDelivery: order.estimatedDelivery,
      });
      setStep("confirmation");
    } catch (error) {
      console.error(error);
    } finally {
      setIsPlacing(false);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
  };

  const steps: CheckoutStep[] = ["address", "payment", "review", "confirmation"];
  const stepIndex = steps.findIndex((entry) => entry === step);
  const direction = stepIndex >= prevIndex ? 1 : -1;

  const goToStep = (next: CheckoutStep) => {
    setPrevIndex(stepIndex);
    setStep(next);
  };

  if (step === "confirmation" && placedOrder) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-5xl flex-col justify-center">
        <CheckoutStepIndicator current={step} />
        <CheckoutConfirmation
          orderNumber={placedOrder.orderNumber}
          estimatedDelivery={placedOrder.estimatedDelivery}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="font-playfair text-4xl font-bold text-foreground">Checkout</h1>
      </div>

      <CheckoutStepIndicator current={step} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === "address" && (
                <CheckoutAddress
                  defaultValues={address ?? {}}
                  onNext={(data) => {
                    setAddress(data);
                    goToStep("payment");
                  }}
                />
              )}
              {step === "payment" && (
                <CheckoutPayment
                  selected={paymentMethod?.method}
                  onNext={(method, cardLastFour) => {
                    setPaymentMethod({ method, cardLastFour });
                    goToStep("review");
                  }}
                  onBack={() => goToStep("address")}
                />
              )}
              {step === "review" && address && paymentMethod && (
                <CheckoutReview
                  address={address}
                  paymentMethod={paymentMethod.method}
                  cardLastFour={paymentMethod.cardLastFour}
                  items={items}
                  total={total}
                  onBack={() => goToStep("payment")}
                  onPlace={handlePlaceOrder}
                  isPlacing={isPlacing}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="h-fit lg:sticky lg:top-24">
          <CheckoutOrderSummary items={items} total={total} />
        </div>
      </div>
    </div>
  );
}
