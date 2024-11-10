'use client'

import { useEffect, useRef } from 'react';
import { useNFTStore } from '../../../store/useNFTStore';
import NFTsDistributionCard from './NFTsDistributionCard';
import NFTsFloorPricesCard from './NFTsFloorPricesCard';
import NFTsInfoCard from './NFTsInfoCard';

export default function NFTsPage() {
  const { collections, selectedCollection, loading, fetchCollections, fetchSelectedCollectionData, setSelectedCollection } = useNFTStore();

  const prevSelectedCollectionRef = useRef(selectedCollection);

  useEffect(() => {
    if (!collections) {
      fetchCollections();
    }
  }, [collections, fetchCollections]);

  useEffect(() => {
    if (selectedCollection && selectedCollection !== prevSelectedCollectionRef.current) {
      console.log('Selected collection changed:', selectedCollection.collection_id);
      fetchSelectedCollectionData(selectedCollection.collection_id);
      prevSelectedCollectionRef.current = selectedCollection;
    }
  }, [selectedCollection, fetchSelectedCollectionData]);

  const handleCollectionClick = (collectionId: string) => {
    if (collections) {
      const collection = collections.get(collectionId);
      if (collection) {
        setSelectedCollection(collection);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6">NFT Collections Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {selectedCollection && collections && (
          <NFTsInfoCard
            collection={selectedCollection}
            collections={collections}
            onCollectionClick={handleCollectionClick}
          />
        )}
        <NFTsDistributionCard />
      </div>
      <div className="mt-8">
        <NFTsFloorPricesCard />
      </div>
    </div>
  );
}
