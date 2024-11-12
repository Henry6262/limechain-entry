import { CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CollectionPreviews from './nfts-info-previews';
import { SimpleHashCollection } from '../../../../types/types';

interface NFTsInfoCardContentProps {
  collection: SimpleHashCollection;
  collections: Map<string, SimpleHashCollection>;
  onCollectionClick: (collectionId: string) => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export default function NFTsInfoCardContent({ collection, collections, onCollectionClick, expanded, setExpanded }: NFTsInfoCardContentProps) {
  return (
    <CardContent className="pt-20 pb-4">
      <CardTitle className="text-2xl font-bold mb-2">{collection.name}</CardTitle>
      <CardDescription className="dark:text-gray-400 mb-4">
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
  );
}