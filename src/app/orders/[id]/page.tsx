"use client";
import OrderDetailPage from "@/features/orders/order-detail";
import { useParams } from "next/navigation";
export default function OrderDetailRoute() {
  const { id } = useParams();
  return <OrderDetailPage orderId={id as string} />;
}
