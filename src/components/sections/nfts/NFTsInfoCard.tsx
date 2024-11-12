'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Twitter, Instagram, ExternalLink, MessageCircle } from 'lucide-react';
import CollectionPreviews from './CollectionPreviews';
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
      <CardHeader className="relative p-0">
        <img src={collection.banner_image_url} alt={`${collection.name} banner`} className="w-full h-48 object-cover" />
        <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2 w-24 h-24 border-4 border-primary">
          <img src={collection.image_url} alt={collection.name} className="object-cover" />
        </Avatar>
        <div className="absolute bottom-0 right-4 transform translate-y-1/2 flex gap-2">
          {collection.twitter_username && (
            <a href={`https://twitter.com/${collection.twitter_username}`} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="border-purple-700 text-purple-400">
                <Twitter className="w-4 h-4" />
              </Button>
            </a>
          )}
          {collection.discord_url && (
            <a href={collection.discord_url} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="border-purple-700 text-purple-400">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </a>
          )}
          {collection.instagram_username && (
            <a href={`https://instagram.com/${collection.instagram_username}`} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="border-purple-700 text-purple-400">
                <Instagram className="w-4 h-4" />
              </Button>
            </a>
          )}
          {collection.marketplace_pages[0] && (
            <a href={collection.marketplace_pages[0].collection_url} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="border-purple-700 text-purple-400">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-20 pb-4">
        <CardTitle className="text-2xl font-bold mb-2">{collection.name}</CardTitle>
        <CardDescription className="text-gray-400 mb-4">
          {expanded ? collection.description : `${collection.description.slice(0, 100)}...`}
          <Button variant="link" className="text-purple-400 p-0 h-auto" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show less' : 'Show more'}
          </Button>
        </CardDescription>
        <Separator className="my-4 bg-purple-700" />
        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-between gap-4">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">Owners</p>
            <p className="text-lg font-bold">{collection.distinct_owner_count.toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">Items</p>
            <p className="text-lg font-bold">{collection.distinct_nft_count.toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">Total Supply</p>
            <p className="text-lg font-bold">{collection.total_quantity.toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">Royalty</p>
            <p className="text-lg font-bold">
              {collection.collection_royalties[0]?.total_creator_fee_basis_points
                ? `${collection.collection_royalties[0].total_creator_fee_basis_points / 100}%`
                : 'N/A'}
            </p>
          </div>
        </div>
        <CollectionPreviews collections={collections} onCollectionClick={onCollectionClick} />
      </CardContent>
    </Card>
  );
}