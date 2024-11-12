'use client'

import { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import { useNFTStore } from '../../../store/useNFTStore';
import NFTsDistributionCard from './nfts-distribution';
import NFTsFloorPricesCard from './nft-floor-prices';
import NFTsInfoCard from './nfts-overview';
import { fetchFloorPricesForAllRanges } from '../../../handlers/getNFTCollectionData';
import { generateDateRangeParams } from '../../../lib/utils';
import nftsAnimation from '../../../../public/lottie/nfts.json';

export default function NFTsPage() {
  const { collections, selectedCollection, loading, fetchCollections, fetchSelectedCollectionData, setSelectedCollection, setFloorPricesData } = useNFTStore();

  const prevSelectedCollectionRef = useRef(selectedCollection);

  useEffect(() => {
    if (!collections) {
      fetchCollections();
    }
  }, [collections, fetchCollections]);

  useEffect(() => {
    const fetchFloorPrices = async () => {
      if (selectedCollection && selectedCollection !== prevSelectedCollectionRef.current) {
        console.log('Selected collection changed:', selectedCollection.collection_id);
        fetchSelectedCollectionData(selectedCollection.collection_id);
        prevSelectedCollectionRef.current = selectedCollection;

        const dateRangeParams = generateDateRangeParams();
        const dataMap = await fetchFloorPricesForAllRanges(selectedCollection.collection_id, dateRangeParams);
        setFloorPricesData(dataMap);
      }
    };

    fetchFloorPrices();
  }, [selectedCollection, fetchSelectedCollectionData, setFloorPricesData]);

  const handleCollectionClick = (collectionId: string) => {
    if (collections) {
      const collection = collections.get(collectionId);
      if (collection) {
        setSelectedCollection(collection);
      }
    }
  };

  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: nftsAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen ">
      <div className="flex items-center mb-6">
        <Lottie 
          options={lottieDefaultOptions} 
          height={80} 
          width={100} 
          style={{ margin: 0 }}
        />
        <h2 className="text-3xl text-tertiary font-bold pl-4">NFTs Overview</h2>
      </div>
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
