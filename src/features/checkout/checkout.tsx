"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin, CreditCard, ClipboardList, CheckCircle2,
  ChevronRight, ChevronLeft, Loader2, Package,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useOrders } from "@/context/order-context";
import { ShippingAddress, PaymentMethod, CheckoutStep } from "@/types/order";
import { cn } from "@/lib/utils";

// ─── Schemas ──────────────────────────────────────────────────────────────────

const addressSchema = z.object({
  fullName:   z.string().min(2, "Full name required"),
  phone:      z.string().min(10, "Valid phone number required").regex(/^[0-9+\-\s()]+$/),
  address:    z.string().min(5, "Street address required"),
  city:       z.string().min(2, "City required"),
  postalCode: z.string().min(4, "Postal code required"),
  country:    z.string().min(2, "Country required"),
});
type AddressForm = z.infer<typeof addressSchema>;

// ─── Shared input style ───────────────────────────────────────────────────────

const inputCls = (err?: boolean) =>
  `w-full h-12 px-4 rounded-xl border bg-background dark:bg-background-dark font-montserrat text-sm text-text-dark dark:text-text placeholder:text-text-dark/30 dark:placeholder:text-text/30 outline-none transition-all duration-200 focus:ring-2 focus:ring-text-dark/12 dark:focus:ring-text/12 ${
    err
      ? "border-red-400"
      : "border-text-dark/12 dark:border-text/12 hover:border-text-dark/25 dark:hover:border-text/25"
  }`;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs tracking-[0.2em] uppercase font-montserrat font-medium text-text-dark/50 dark:text-text/50">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs font-montserrat">{error}</p>}
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS: { key: CheckoutStep; label: string; icon: React.ElementType }[] = [
  { key: "address",      label: "Address",  icon: MapPin },
  { key: "payment",      label: "Payment",  icon: CreditCard },
  { key: "review",       label: "Review",   icon: ClipboardList },
  { key: "confirmation", label: "Done",     icon: CheckCircle2 },
];

function StepIndicator({ current }: { current: CheckoutStep }) {
  const currentIdx = STEPS.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done    = i < currentIdx;
        const active  = i === currentIdx;
        const Icon    = step.icon;
        return (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                done   ? "bg-button dark:bg-button-dark"
                       : active ? "bg-button dark:bg-button-dark ring-4 ring-button/20 dark:ring-button-dark/20"
                                : "bg-text-dark/8 dark:bg-text/8"
              )}>
                <Icon className={cn("w-4 h-4 transition-colors duration-300",
                  done || active ? "text-text dark:text-text-dark" : "text-text-dark/35 dark:text-text/35"
                )} />
              </div>
              <span className={cn(
                "text-xs font-montserrat transition-colors duration-300 hidden sm:block",
                active ? "font-semibold text-text-dark dark:text-text"
                       : done ? "text-text-dark/60 dark:text-text/60"
                               : "text-text-dark/30 dark:text-text/30"
              )}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                "h-px w-12 sm:w-20 mx-1 mb-4 transition-colors duration-500",
                i < currentIdx ? "bg-button dark:bg-button-dark" : "bg-text-dark/12 dark:bg-text/12"
              )} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Order Summary Sidebar ────────────────────────────────────────────────────

function OrderSummary({ items, total }: { items: ReturnType<typeof useCart>["items"]; total: number }) {
  return (
    <div className="p-5 rounded-2xl bg-background dark:bg-background-dark shadow-sm shadow-background-dark/15 dark:shadow-background/8 space-y-4 h-fit">
      <h3 className="font-playfair font-bold text-base text-text-dark dark:text-text">Order Summary</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-montserrat font-semibold text-text-dark dark:text-text line-clamp-1">{item.name}</p>
              <p className="text-xs font-montserrat text-text-dark/50 dark:text-text/50 mt-0.5">
                {item.quantity} × {item.price.toLocaleString()} EGP
              </p>
            </div>
            <p className="text-xs font-montserrat font-bold text-text-dark dark:text-text shrink-0">
              {(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="h-px bg-text-dark/8 dark:bg-text/8" />
      <div className="flex justify-between items-center">
        <span className="text-sm font-montserrat text-text-dark/60 dark:text-text/60">Subtotal</span>
        <span className="text-sm font-montserrat font-medium text-text-dark dark:text-text">{total.toLocaleString()} EGP</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-montserrat text-text-dark/60 dark:text-text/60">Shipping</span>
        <span className="text-sm font-montserrat font-medium text-green-600 dark:text-green-400">Free</span>
      </div>
      <div className="h-px bg-text-dark/8 dark:bg-text/8" />
      <div className="flex justify-between items-center">
        <span className="font-montserrat font-semibold text-text-dark dark:text-text">Total</span>
        <span className="font-playfair font-bold text-xl text-text-dark dark:text-text">
          {total.toLocaleString()} <span className="text-sm font-montserrat font-normal opacity-50">EGP</span>
        </span>
      </div>
    </div>
  );
}

// ─── Step 1: Address ──────────────────────────────────────────────────────────

function AddressStep({
  defaultValues,
  onNext,
}: {
  defaultValues: Partial<ShippingAddress>;
  onNext: (data: ShippingAddress) => void;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div>
        <h2 className="text-2xl font-playfair font-bold text-text-dark dark:text-text mb-1">Shipping Address</h2>
        <p className="text-sm font-montserrat text-text-dark/55 dark:text-text/55">Where should we deliver your coins?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Field label="Full Name" error={errors.fullName?.message}>
            <input {...register("fullName")} placeholder="James Sterling" className={inputCls(!!errors.fullName)} />
          </Field>
        </div>
        <Field label="Phone Number" error={errors.phone?.message}>
          <input {...register("phone")} placeholder="+20 100 000 0000" className={inputCls(!!errors.phone)} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Street Address" error={errors.address?.message}>
            <input {...register("address")} placeholder="15 Tahrir Square, Apt 4B" className={inputCls(!!errors.address)} />
          </Field>
        </div>
        <Field label="City" error={errors.city?.message}>
          <input {...register("city")} placeholder="Cairo" className={inputCls(!!errors.city)} />
        </Field>
        <Field label="Postal Code" error={errors.postalCode?.message}>
          <input {...register("postalCode")} placeholder="11511" className={inputCls(!!errors.postalCode)} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Country" error={errors.country?.message}>
            <input {...register("country")} placeholder="Egypt" className={inputCls(!!errors.country)} />
          </Field>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <motion.button type="submit" whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 h-12 px-8 rounded-xl bg-button dark:bg-button-dark text-text dark:text-text-dark font-montserrat font-semibold text-sm hover:opacity-90 transition-opacity">
          Continue to Payment <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </form>
  );
}

// ─── Step 2: Payment ──────────────────────────────────────────────────────────

const PAYMENT_METHODS: { method: PaymentMethod; label: string; sub: string; icon: string }[] = [
  { method: "card",             label: "Credit / Debit Card",  sub: "Visa, Mastercard, Amex",          icon: "💳" },
  { method: "cash_on_delivery", label: "Cash on Delivery",     sub: "Pay when your order arrives",     icon: "💵" },
  { method: "bank_transfer",    label: "Bank Transfer",        sub: "Direct transfer to our account",  icon: "🏦" },
];

function PaymentStep({
  selected,
  onNext,
  onBack,
}: {
  selected: PaymentMethod | undefined;
  onNext: (method: PaymentMethod, cardLastFour?: string) => void;
  onBack: () => void;
}) {
  const [method, setMethod]         = useState<PaymentMethod>(selected ?? "card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName]     = useState("");
  const [expiry, setExpiry]         = useState("");
  const [cvv, setCvv]               = useState("");
  const [cardError, setCardError]   = useState("");

  const handleNext = () => {
    if (method === "card") {
      const cleaned = cardNumber.replace(/\s/g, "");
      if (cleaned.length < 16) { setCardError("Please enter a valid 16-digit card number."); return; }
      if (!cardName)            { setCardError("Cardholder name is required."); return; }
      if (expiry.length < 5)   { setCardError("Please enter a valid expiry date."); return; }
      if (cvv.length < 3)      { setCardError("Please enter a valid CVV."); return; }
      onNext("card", cleaned.slice(-4));
    } else {
      onNext(method);
    }
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-playfair font-bold text-text-dark dark:text-text mb-1">Payment Method</h2>
        <p className="text-sm font-montserrat text-text-dark/55 dark:text-text/55">All transactions are secure and encrypted.</p>
      </div>

      {/* Method selector */}
      <div className="space-y-3">
        {PAYMENT_METHODS.map((pm) => (
          <motion.button key={pm.method} type="button" whileTap={{ scale: 0.99 }}
            onClick={() => { setMethod(pm.method); setCardError(""); }}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left",
              method === pm.method
                ? "border-text-dark dark:border-text bg-text-dark/5 dark:bg-text/5"
                : "border-text-dark/12 dark:border-text/12 hover:border-text-dark/25 dark:hover:border-text/25"
            )}>
            <div className={cn(
              "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
              method === pm.method ? "border-text-dark dark:border-text" : "border-text-dark/25 dark:border-text/25"
            )}>
              {method === pm.method && <div className="w-2 h-2 rounded-full bg-text-dark dark:bg-text" />}
            </div>
            <span className="text-xl">{pm.icon}</span>
            <div>
              <p className="text-sm font-montserrat font-semibold text-text-dark dark:text-text">{pm.label}</p>
              <p className="text-xs font-montserrat text-text-dark/50 dark:text-text/50">{pm.sub}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Card details */}
      <AnimatePresence>
        {method === "card" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="p-5 rounded-xl border border-text-dark/10 dark:border-text/10 space-y-4">
              <Field label="Card Number" error={undefined}>
                <input type="text" value={cardNumber} placeholder="1234 5678 9012 3456"
                  onChange={(e) => { setCardNumber(formatCard(e.target.value)); setCardError(""); }}
                  className={inputCls(false)} maxLength={19} />
              </Field>
              <Field label="Cardholder Name" error={undefined}>
                <input type="text" value={cardName} placeholder="JAMES STERLING"
                  onChange={(e) => { setCardName(e.target.value.toUpperCase()); setCardError(""); }}
                  className={inputCls(false)} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry Date" error={undefined}>
                  <input type="text" value={expiry} placeholder="MM/YY"
                    onChange={(e) => { setExpiry(formatExpiry(e.target.value)); setCardError(""); }}
                    className={inputCls(false)} maxLength={5} />
                </Field>
                <Field label="CVV" error={undefined}>
                  <input type="password" value={cvv} placeholder="•••"
                    onChange={(e) => { setCvv(e.target.value.replace(/\D/g, "").slice(0, 4)); setCardError(""); }}
                    className={inputCls(false)} maxLength={4} />
                </Field>
              </div>
              {cardError && <p className="text-red-500 text-xs font-montserrat">{cardError}</p>}
              <p className="text-xs font-montserrat text-text-dark/40 dark:text-text/40">
                🔒 Your card details are encrypted and never stored on our servers.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between pt-2">
        <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={onBack}
          className="flex items-center gap-2 h-12 px-6 rounded-xl border border-text-dark/12 dark:border-text/12 text-text-dark dark:text-text font-montserrat font-medium text-sm hover:bg-text-dark/4 dark:hover:bg-text/4 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </motion.button>
        <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={handleNext}
          className="flex items-center gap-2 h-12 px-8 rounded-xl bg-button dark:bg-button-dark text-text dark:text-text-dark font-montserrat font-semibold text-sm hover:opacity-90 transition-opacity">
          Review Order <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}

// ─── Step 3: Review ───────────────────────────────────────────────────────────

function ReviewStep({
  address,
  paymentMethod,
  cardLastFour,
  items,
  total,
  onBack,
  onPlace,
  isPlacing,
}: {
  address: ShippingAddress;
  paymentMethod: PaymentMethod;
  cardLastFour?: string;
  items: ReturnType<typeof useCart>["items"];
  total: number;
  onBack: () => void;
  onPlace: () => void;
  isPlacing: boolean;
}) {
  const paymentLabel = {
    card:             cardLastFour ? `Card ending in ${cardLastFour}` : "Credit / Debit Card",
    cash_on_delivery: "Cash on Delivery",
    bank_transfer:    "Bank Transfer",
  }[paymentMethod];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-playfair font-bold text-text-dark dark:text-text mb-1">Review Order</h2>
        <p className="text-sm font-montserrat text-text-dark/55 dark:text-text/55">Please confirm all details before placing your order.</p>
      </div>

      {/* Address review */}
      <div className="p-5 rounded-xl border border-text-dark/10 dark:border-text/10 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-[0.2em] uppercase font-montserrat font-semibold text-text-dark/45 dark:text-text/45">
            Delivery Address
          </p>
          <button onClick={onBack} className="text-xs font-montserrat text-text-dark/50 dark:text-text/50 hover:text-text-dark dark:hover:text-text underline underline-offset-2 transition-colors">
            Edit
          </button>
        </div>
        <div className="font-montserrat text-sm text-text-dark dark:text-text space-y-0.5">
          <p className="font-semibold">{address.fullName}</p>
          <p className="text-text-dark/70 dark:text-text/70">{address.phone}</p>
          <p className="text-text-dark/70 dark:text-text/70">{address.address}</p>
          <p className="text-text-dark/70 dark:text-text/70">{address.city}, {address.postalCode}</p>
          <p className="text-text-dark/70 dark:text-text/70">{address.country}</p>
        </div>
      </div>

      {/* Payment review */}
      <div className="p-5 rounded-xl border border-text-dark/10 dark:border-text/10 space-y-2">
        <p className="text-xs tracking-[0.2em] uppercase font-montserrat font-semibold text-text-dark/45 dark:text-text/45">
          Payment
        </p>
        <p className="font-montserrat text-sm font-semibold text-text-dark dark:text-text">{paymentLabel}</p>
      </div>

      {/* Items review */}
      <div className="p-5 rounded-xl border border-text-dark/10 dark:border-text/10 space-y-3">
        <p className="text-xs tracking-[0.2em] uppercase font-montserrat font-semibold text-text-dark/45 dark:text-text/45">
          Items ({items.reduce((s, i) => s + i.quantity, 0)})
        </p>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
            </div>
            <p className="flex-1 text-sm font-montserrat text-text-dark dark:text-text line-clamp-1">{item.name}</p>
            <div className="text-right shrink-0">
              <p className="text-xs font-montserrat text-text-dark/50 dark:text-text/50">×{item.quantity}</p>
              <p className="text-sm font-montserrat font-semibold text-text-dark dark:text-text">
                {(item.price * item.quantity).toLocaleString()} EGP
              </p>
            </div>
          </div>
        ))}
        <div className="h-px bg-text-dark/8 dark:bg-text/8" />
        <div className="flex justify-between">
          <span className="font-montserrat font-semibold text-text-dark dark:text-text">Total</span>
          <span className="font-playfair font-bold text-lg text-text-dark dark:text-text">
            {total.toLocaleString()} EGP
          </span>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={onBack} disabled={isPlacing}
          className="flex items-center gap-2 h-12 px-6 rounded-xl border border-text-dark/12 dark:border-text/12 text-text-dark dark:text-text font-montserrat font-medium text-sm hover:bg-text-dark/4 dark:hover:bg-text/4 transition-colors disabled:opacity-50">
          <ChevronLeft className="w-4 h-4" /> Back
        </motion.button>
        <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={onPlace} disabled={isPlacing}
          className="flex items-center gap-2 h-12 px-8 rounded-xl bg-button dark:bg-button-dark text-text dark:text-text-dark font-montserrat font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-opacity">
          {isPlacing ? <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order…</> : <>Place Order <ChevronRight className="w-4 h-4" /></>}
        </motion.button>
      </div>
    </div>
  );
}

// ─── Step 4: Confirmation ─────────────────────────────────────────────────────

function ConfirmationStep({ orderNumber, estimatedDelivery }: { orderNumber: string; estimatedDelivery: string }) {
  const router = useRouter();
  const date   = new Date(estimatedDelivery).toLocaleDateString("en-EG", { weekday: "long", month: "long", day: "numeric" });

  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center space-y-6 py-8">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 18 }}
        className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-3xl font-playfair font-bold text-text-dark dark:text-text">Order Confirmed!</h2>
        <p className="font-montserrat text-text-dark/60 dark:text-text/60 text-sm">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
      </div>

      <div className="inline-block px-5 py-3 rounded-xl bg-background dark:bg-background-dark border border-text-dark/10 dark:border-text/10">
        <p className="text-xs tracking-[0.2em] uppercase font-montserrat text-text-dark/45 dark:text-text/45 mb-1">Order Number</p>
        <p className="font-playfair font-bold text-xl text-text-dark dark:text-text">{orderNumber}</p>
      </div>

      <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-background dark:bg-background-dark border border-text-dark/10 dark:border-text/10">
        <Package className="w-5 h-5 text-text-dark/50 dark:text-text/50 shrink-0" />
        <p className="font-montserrat text-sm text-text-dark/70 dark:text-text/70">
          Estimated delivery: <span className="font-semibold text-text-dark dark:text-text">{date}</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => router.push("/orders")}
          className="h-12 px-8 rounded-xl bg-button dark:bg-button-dark text-text dark:text-text-dark font-montserrat font-semibold text-sm hover:opacity-90 transition-opacity">
          Track Order
        </motion.button>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => router.push("/products")}
          className="h-12 px-8 rounded-xl border border-text-dark/12 dark:border-text/12 text-text-dark dark:text-text font-montserrat font-medium text-sm hover:bg-text-dark/4 dark:hover:bg-text/4 transition-colors">
          Continue Shopping
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Main Checkout Component ──────────────────────────────────────────────────

export default function CheckoutPage() {
  const router                  = useRouter();
  const { items, total, clearCart } = useCart();
  const { submitOrder }         = useOrders();

  const [step, setStep]               = useState<CheckoutStep>("address");
  const [address, setAddress]         = useState<ShippingAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<{ method: PaymentMethod; cardLastFour?: string } | null>(null);
  const [placedOrder, setPlacedOrder] = useState<{ orderNumber: string; estimatedDelivery: string } | null>(null);
  const [isPlacing, setIsPlacing]     = useState(false);
  const [prevIndex, setPrevIndex]     = useState(0);

  // Redirect if cart is empty and not on confirmation
  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="max-w-md mx-auto text-center py-24 space-y-4">
        <p className="font-playfair text-2xl text-text-dark dark:text-text">Your cart is empty</p>
        <button onClick={() => router.push("/products")}
          className="h-12 px-8 rounded-xl border border-text-dark/12 dark:border-text/12 text-text-dark dark:text-text font-montserrat font-medium text-sm hover:bg-text-dark/4 transition-colors">
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
        paymentDetails: { method: paymentMethod.method, cardLastFour: paymentMethod.cardLastFour },
      });
      clearCart();
      setPlacedOrder({ orderNumber: order.orderNumber, estimatedDelivery: order.estimatedDelivery });
      setStep("confirmation");
    } catch (e) {
      console.error(e);
    } finally {
      setIsPlacing(false);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir * -40, opacity: 0 }),
  };

  const stepIndex = STEPS.findIndex((s) => s.key === step);
  const direction = stepIndex >= prevIndex ? 1 : -1;

  const goToStep = (next: CheckoutStep) => {
    setPrevIndex(stepIndex);
    setStep(next);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold text-text-dark dark:text-text">Checkout</h1>
      </div>

      <StepIndicator current={step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main step content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} custom={direction}
              variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>

              {step === "address" && (
                <AddressStep
                  defaultValues={address ?? {}}
                  onNext={(data) => { setAddress(data); goToStep("payment"); }}
                />
              )}
              {step === "payment" && (
                <PaymentStep
                  selected={paymentMethod?.method}
                  onNext={(method, cardLastFour) => { setPaymentMethod({ method, cardLastFour }); goToStep("review"); }}
                  onBack={() => goToStep("address")}
                />
              )}
              {step === "review" && address && paymentMethod && (
                <ReviewStep
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
              {step === "confirmation" && placedOrder && (
                <ConfirmationStep
                  orderNumber={placedOrder.orderNumber}
                  estimatedDelivery={placedOrder.estimatedDelivery}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sticky order summary */}
        {step !== "confirmation" && (
          <div className="lg:sticky lg:top-24 h-fit">
            <OrderSummary items={items} total={total} />
          </div>
        )}
      </div>
    </div>
  );
}