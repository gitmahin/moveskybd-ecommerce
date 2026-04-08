"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { Quantity } from "./Quantity";
import Image from "next/image";
import { productStore } from "@/services/stores";
import { getPriceDiscountValue } from "@/utils";
import { observer } from "mobx-react";

type VariationDataType = {
  id: string;
  name?: string;
  image?: string;
  price?: number;
  stock_count?: number;
  unit_count?: number;
};

const VARIATIONS: VariationDataType[] = [
  {
    id: "v-001",
    name: "Crimson Red - Slim Fit",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200",
    price: 3200,
    stock_count: 12,
    unit_count: 1,
  },
  {
    id: "v-002",
    name: "Ocean Blue - Regular",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=200",
    price: 3000,
    stock_count: 48,
    unit_count: 1,
  },
  {
    id: "v-003",
    name: "Matte Black - Large",
    price: 3500,
    stock_count: 5,
    unit_count: 1,
  },
  {
    id: "v-004",
    name: "Forest Green - Medium",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200",
    price: 2800,
    stock_count: 0, // Testing Out of Stock
    unit_count: 1,
  },
  {
    id: "v-005",
    name: "Pure White - Pack of 3",
    price: 1500,
    stock_count: 25,
    unit_count: 3, // A bundle unit
  },
  {
    id: "v-006",
    name: "Space Grey - 256GB",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200",
    price: 95000,
    stock_count: 8,
    unit_count: 1,
  },
  {
    id: "v-007",
    name: "Titanium - Limited Edition",
    price: 120000,
    stock_count: 2,
    unit_count: 1,
  },
  {
    id: "v-008",
    name: "Soft Yellow - XS",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200",
    price: 2500,
    stock_count: 15,
    unit_count: 1,
  },
  {
    id: "v-009",
    name: "Royal Purple - XXL",
    price: 3800,
    stock_count: 10,
    unit_count: 1,
  },
  {
    id: "v-010",
    name: "Charcoal Grey - Bundle",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200",
    price: 5000,
    stock_count: 30,
    unit_count: 2,
  },
];

export const VariationTable = () => {
  const handleQuantityChange = (
    id: string,
    price: number,
    items_count: number,
    unit: number
  ) => {
    productStore.setTotalAddedItemsToBuy({
      id,
      price,
      quantity: items_count,
      unit,
    });
  };

  // -- Move to mobx and group in settings
  const [showImageVariation, setShowImageVariation] = useState<boolean>(true);

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Stocks</TableHead>
            <TableHead className="text-center">Unit</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {VARIATIONS.map((item, i) => {
            return (
              <TableRow key={i}>
                {!showImageVariation ? (
                  <TableCell>{item.name}</TableCell>
                ) : (
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="rounded-md p-0.5 bg-white w-fit border">
                          <Image
                            src={item.image ?? ""}
                            width={200}
                            height={200}
                            className="object-cover object-center w-[40px] h-[40px] rounded-sm "
                            alt={item.id}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                )}
                <TableCell className="text-center">
                  <span className="text-xs">৳</span> {item.price}
                </TableCell>
                <TableCell className="text-center">
                  {item.stock_count}
                </TableCell>
                <TableCell className="text-center">{item.unit_count}</TableCell>
                <TableCell className="text-center">
                  <Quantity
                    stock_count={Number(item.stock_count)}
                    onQuantityChange={(qty) =>
                      handleQuantityChange(
                        item.id,
                        Number(item.price),
                        qty,
                        item.unit_count as number
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
