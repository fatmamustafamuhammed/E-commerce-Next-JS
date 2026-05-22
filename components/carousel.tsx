"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];

  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="overflow-hidden rounded-lg shadow-md border-gray-300">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative h-80 w-full">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            fill
            className="transition-opacity duration-500 ease-in-out"
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <CardContent className="p-4 bg-white">
        <CardTitle className="text-xl font-semibold text-gray-800 mb-2">
          {currentProduct.name}
        </CardTitle>
        {price && price.unit_amount && (
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          </div>
        )}
        {currentProduct.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {currentProduct.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
