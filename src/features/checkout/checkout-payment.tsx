"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { PaymentMethod } from "@/types/order";
import { cn } from "@/lib/utils";

const PAYMENT_METHODS: {
  method: PaymentMethod;
  label: string;
  sub: string;
  icon: string;
}[] = [
  {
    method: "card",
    label: "Credit / Debit Card",
    sub: "Visa, Mastercard, Amex",
    icon: "Card",
  },
  {
    method: "cash_on_delivery",
    label: "Cash on Delivery",
    sub: "Pay when your order arrives",
    icon: "Cash",
  },
  {
    method: "bank_transfer",
    label: "Bank Transfer",
    sub: "Direct transfer to our account",
    icon: "Bank",
  },
];

const inputCls =
  "h-12 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 hover:border-primary/45 focus:ring-2 focus:ring-ring";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-montserrat font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export function CheckoutPayment({
  selected,
  onNext,
  onBack,
}: {
  selected: PaymentMethod | undefined;
  onNext: (method: PaymentMethod, cardLastFour?: string) => void;
  onBack: () => void;
}) {
  const [method, setMethod] = useState<PaymentMethod>(selected ?? "card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardError, setCardError] = useState("");

  const handleNext = () => {
    if (method === "card") {
      const cleaned = cardNumber.replace(/\s/g, "");
      if (cleaned.length < 16)
        return setCardError("Please enter a valid 16-digit card number.");
      if (!cardName) return setCardError("Cardholder name is required.");
      if (expiry.length < 5)
        return setCardError("Please enter a valid expiry date.");
      if (cvv.length < 3) return setCardError("Please enter a valid CVV.");
      onNext("card", cleaned.slice(-4));
      return;
    }

    onNext(method);
  };

  const formatCard = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length >= 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 font-playfair text-2xl font-bold text-foreground">
          Payment Method
        </h2>
        <p className="text-sm font-montserrat text-muted-foreground">
          All transactions are secure and encrypted.
        </p>
      </div>

      <div className="space-y-3">
        {PAYMENT_METHODS.map((payment) => (
          <motion.button
            key={payment.method}
            type="button"
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              setMethod(payment.method);
              setCardError("");
            }}
            className={cn(
              "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200",
              method === payment.method
                ? "border-primary bg-primary/6"
                : "border-border bg-card hover:border-primary/40",
            )}
          >
            <div
              className={cn(
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                method === payment.method
                  ? "border-primary"
                  : "border-muted-foreground/50",
              )}
            >
              {method === payment.method && (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}
            </div>
            <span className="min-w-12 text-xs font-montserrat font-semibold uppercase tracking-[0.18em] text-primary">
              {payment.icon}
            </span>
            <div>
              <p className="text-sm font-montserrat font-semibold text-foreground">
                {payment.label}
              </p>
              <p className="text-xs font-montserrat text-muted-foreground">
                {payment.sub}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {method === "card" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-soft">
              <Field label="Card Number">
                <input
                  type="text"
                  value={cardNumber}
                  placeholder="1234 5678 9012 3456"
                  onChange={(e) => {
                    setCardNumber(formatCard(e.target.value));
                    setCardError("");
                  }}
                  className={inputCls}
                  maxLength={19}
                />
              </Field>
              <Field label="Cardholder Name">
                <input
                  type="text"
                  value={cardName}
                  placeholder="JAMES STERLING"
                  onChange={(e) => {
                    setCardName(e.target.value.toUpperCase());
                    setCardError("");
                  }}
                  className={inputCls}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry Date">
                  <input
                    type="text"
                    value={expiry}
                    placeholder="MM/YY"
                    onChange={(e) => {
                      setExpiry(formatExpiry(e.target.value));
                      setCardError("");
                    }}
                    className={inputCls}
                    maxLength={5}
                  />
                </Field>
                <Field label="CVV">
                  <input
                    type="password"
                    value={cvv}
                    placeholder="***"
                    onChange={(e) => {
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 4));
                      setCardError("");
                    }}
                    className={inputCls}
                    maxLength={4}
                  />
                </Field>
              </div>
              {cardError && (
                <p className="text-xs font-montserrat text-red-500">
                  {cardError}
                </p>
              )}
              <p className="text-xs font-montserrat text-muted-foreground">
                Your card details are encrypted and never stored on our servers.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between pt-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className="flex h-12 items-center gap-2 rounded-xl bg-button px-8 text-sm font-semibold text-text transition-opacity hover:opacity-90 dark:bg-button-dark dark:text-text-dark"
        >
          Review Order <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
