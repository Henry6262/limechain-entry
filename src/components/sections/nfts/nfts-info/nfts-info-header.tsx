import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, ExternalLink, MessageCircle } from 'lucide-react';
import { SimpleHashCollection } from '../../../../types/types';
import Image from 'next/image';

interface NFTsInfoCardHeaderProps {
  collection: SimpleHashCollection;
}

export default function NFTsInfoCardHeader({ collection }: NFTsInfoCardHeaderProps) {
  return (
    <div className="relative p-0">
      <Image src={collection.banner_image_url} alt={`${collection.name} banner`} width={800} height={192} className="w-full h-48 object-cover" />
      <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2 w-24 h-24 border-4 border-primary">
        <Image src={collection.image_url} alt={collection.name} width={96} height={96} className="object-cover" />
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
    </div>
  );
}