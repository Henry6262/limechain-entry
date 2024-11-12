'use client'

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import NFTsInfoCardHeader from './nfts-info/nfts-info-header';
import NFTsInfoCardContent from './nfts-info/nfts-info-card-content';
import { SimpleHashCollection } from '../../../types/types';

interface NFTsInfoCardProps {
  collection: SimpleHashCollection;
  collections: Map<string, SimpleHashCollection>;
  onCollectionClick: (collectionId: string) => void;
}

export default function NFTsInfoCard({ collection, collections, onCollectionClick }: NFTsInfoCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="w-full max-w-3xl border">
      <NFTsInfoCardHeader collection={collection} />
      <NFTsInfoCardContent 
        collection={collection} 
        collections={collections} 
        onCollectionClick={onCollectionClick} 
        expanded={expanded} 
        setExpanded={setExpanded} 
      />
    </Card>
  );
}