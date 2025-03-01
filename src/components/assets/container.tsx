"use client";

import { useState, useEffect, useRef } from "react";

import AssetList from "@/components/assets/list";
import { Asset } from "@/lib/definitions";
import { fetchMoreAssetsData } from "@/actions/market";
import Loading from "../loading";

type Props = {
  initialAssets: Asset[];
};

export default function Container({ initialAssets }: Props) {
  const [assets, setItems] = useState<Asset[]>(initialAssets);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMoreAssets = async () => {
      if (page > 1) {
        setLoading(true);
        const newItems = await fetchMoreAssetsData({ page });
        setItems((prev) => [...prev, ...newItems]);
        setLoading(false);
      }
    };

    loadMoreAssets();
  }, [page]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AssetList assets={assets} /> <div ref={loaderRef} className='h-1' /> <Loading active={loading} />
    </>
  );
}
