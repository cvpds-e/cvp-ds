import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, Grid3X3, List, Filter, ChevronDown, ChevronUp, Film } from 'lucide-react';
import { IconButton } from './IconButton';
import { IconSmallButton } from './IconSmallButton';
import { OutlineButton } from './OutlineButton';
import { PrimaryButton } from './PrimaryButton';
import { TextInput } from './TextInput';
import { TextButton } from './TextButton';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

export interface ContentItem {
  id: string;
  title: string;
  year: string;
  genre?: string;
  rating?: string;
  provider?: string;
  thumbnail: string;
}

export interface ContentBrowserModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal subtitle */
  subtitle?: string;
  /** Available content items */
  items?: ContentItem[];
  /** Selected item IDs */
  selectedItems?: string[];
  /** Callback when selection changes */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Callback when content is confirmed */
  onConfirm?: (selectedIds: string[]) => void;
  /** Available filter options */
  filterOptions?: {
    genres?: string[];
    years?: string[];
    ratings?: string[];
    providers?: string[];
  };
}

export function ContentBrowserModal({
  isOpen,
  onClose,
  title = "BROWSE CONTENT - BECAUSE YOU WATCHED",
  subtitle = "Select content to add to your editorial rail",
  items = [],
  selectedItems = [],
  onSelectionChange,
  onConfirm,
  filterOptions = {}
}: ContentBrowserModalProps) {
  // Utility function to check if thumbnail is valid
  const hasValidThumbnail = (thumbnail: string) => {
    return thumbnail && 
           thumbnail.trim() !== '' && 
           thumbnail !== 'undefined' && 
           thumbnail !== 'null' &&
           thumbnail.startsWith('http');
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAllOnPage, setSelectAllOnPage] = useState(false);
  const [selectionReferenceExpanded, setSelectionReferenceExpanded] = useState(true);

  // Sample data for demo - balanced across all filter categories
  const sampleItems: ContentItem[] = [
    // ACTION Genre (15 items) - Most popular, ensure good coverage
    { id: '1', title: 'Ant-Man 2', year: '2024', genre: 'Action', rating: 'PG-13', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80' },
    { id: '2', title: 'Captain Marvel 2', year: '2023', genre: 'Action', rating: 'PG-13', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1478720568477-b0c8b7e0e518?auto=format&fit=crop&w=300&q=80' },
    { id: '3', title: 'Die Hard', year: '2018', genre: 'Action', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=300&q=80' },
    { id: '4', title: 'Die Hard 3', year: '2020', genre: 'Action', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80' },
    { id: '5', title: 'Guardians of the Galaxy', year: '2019', genre: 'Action', rating: 'PG-13', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?auto=format&fit=crop&w=300&q=80' },
    { id: '6', title: 'The Matrix 4', year: '2024', genre: 'Action', rating: 'PG-13', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '7', title: 'Avatar 3', year: '2023', genre: 'Action', rating: 'PG-13', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80' },
    { id: '8', title: 'John Wick 5', year: '2024', genre: 'Action', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=300&q=80' },
    { id: '9', title: 'Fast & Furious 11', year: '2022', genre: 'Action', rating: 'PG-13', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80' },
    { id: '10', title: 'The Terminator 7', year: '2021', genre: 'Action', rating: 'R', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=300&q=80' },
    { id: '31', title: 'The Dark Knight', year: '2023', genre: 'Action', rating: 'PG-13', provider: 'HBO Max', thumbnail: '' },
    { id: '34', title: 'The Avengers', year: '2022', genre: 'Action', rating: 'PG-13', provider: 'Disney+', thumbnail: '' },
    { id: '36', title: 'Mission Impossible 8', year: '2024', genre: 'Action', rating: 'PG-13', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '37', title: 'Mad Max: Wasteland', year: '2023', genre: 'Action', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1489599317593-3b62f9a61c5b?auto=format&fit=crop&w=300&q=80' },
    { id: '38', title: 'Spider-Man: New Era', year: '2024', genre: 'Action', rating: 'PG-13', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80' },

    // SCI-FI Genre (10 items)
    { id: '11', title: 'Alien', year: '2023', genre: 'Sci-Fi', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '12', title: 'Dune', year: '2024', genre: 'Sci-Fi', rating: 'PG-13', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=300&q=80' },
    { id: '13', title: 'Dune 2', year: '2021', genre: 'Sci-Fi', rating: 'PG-13', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?auto=format&fit=crop&w=300&q=80' },
    { id: '14', title: 'Blade Runner 2099', year: '2024', genre: 'Sci-Fi', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1489599317593-3b62f9a61c5b?auto=format&fit=crop&w=300&q=80' },
    { id: '15', title: 'Star Wars: Episode X', year: '2024', genre: 'Sci-Fi', rating: 'PG-13', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?auto=format&fit=crop&w=300&q=80' },
    { id: '16', title: 'Interstellar 3', year: '2018', genre: 'Sci-Fi', rating: 'PG-13', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80' },
    { id: '33', title: 'Unknown Film', year: '2022', genre: 'Sci-Fi', rating: 'PG-13', provider: 'Disney+', thumbnail: '' },
    { id: '39', title: 'The Expanse: Horizon', year: '2023', genre: 'Sci-Fi', rating: 'PG-13', provider: 'Amazon Prime', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '40', title: 'Foundation: Legacy', year: '2024', genre: 'Sci-Fi', rating: 'PG-13', provider: 'Apple TV+', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80' },
    { id: '41', title: 'Arrival 2', year: '2022', genre: 'Sci-Fi', rating: 'PG-13', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?auto=format&fit=crop&w=300&q=80' },

    // COMEDY Genre (8 items)
    { id: '17', title: 'Beverly Hills Cop', year: '2019', genre: 'Comedy', rating: 'R', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1489599317593-3b62f9a61c5b?auto=format&fit=crop&w=300&q=80' },
    { id: '18', title: 'The Hangover 4', year: '2022', genre: 'Comedy', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=300&q=80' },
    { id: '19', title: 'Superbad 2', year: '2020', genre: 'Comedy', rating: 'PG-13', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?auto=format&fit=crop&w=300&q=80' },
    { id: '20', title: 'Step Brothers 2', year: '2021', genre: 'Comedy', rating: 'PG-13', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1478720568477-b0c8b7e0e518?auto=format&fit=crop&w=300&q=80' },
    { id: '29', title: 'Finding Nemo 3', year: '2024', genre: 'Comedy', rating: 'G', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80' },
    { id: '42', title: 'Anchorman 3', year: '2023', genre: 'Comedy', rating: 'PG-13', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=300&q=80' },
    { id: '43', title: 'Bridesmaids 2', year: '2022', genre: 'Comedy', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1489599317593-3b62f9a61c5b?auto=format&fit=crop&w=300&q=80' },
    { id: '44', title: 'Zoolander 3', year: '2021', genre: 'Comedy', rating: 'PG-13', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?auto=format&fit=crop&w=300&q=80' },

    // DRAMA Genre (8 items)
    { id: '21', title: 'Forrest Gump 2', year: '2019', genre: 'Drama', rating: 'PG-13', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=300&q=80' },
    { id: '22', title: 'The Pursuit of Happyness 2', year: '2022', genre: 'Drama', rating: 'PG', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1566043975481-5c9c9b3d9d6f?auto=format&fit=crop&w=300&q=80' },
    { id: '23', title: 'A Beautiful Mind 2', year: '2020', genre: 'Drama', rating: 'PG-13', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80' },
    { id: '24', title: 'The Social Network 2', year: '2023', genre: 'Drama', rating: 'PG-13', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '32', title: 'Mystery Movie', year: '2024', genre: 'Drama', rating: 'R', provider: 'Netflix', thumbnail: '' },
    { id: '35', title: 'Hidden Gem', year: '2021', genre: 'Drama', rating: 'R', provider: 'Netflix', thumbnail: '' },
    { id: '45', title: 'The King\'s Speech 2', year: '2023', genre: 'Drama', rating: 'PG-13', provider: 'Amazon Prime', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '46', title: 'Moonlight: Rising', year: '2024', genre: 'Drama', rating: 'R', provider: 'Apple TV+', thumbnail: 'https://images.unsplash.com/photo-1566043975481-5c9c9b3d9d6f?auto=format&fit=crop&w=300&q=80' },

    // WAR Genre (6 items) 
    { id: '25', title: 'Dunkirk', year: '2022', genre: 'War', rating: 'PG-13', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1566043975481-5c9c9b3d9d6f?auto=format&fit=crop&w=300&q=80' },
    { id: '26', title: 'Saving Private Ryan 2', year: '2021', genre: 'War', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=300&q=80' },
    { id: '27', title: 'Platoon: Return', year: '2019', genre: 'War', rating: 'R', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?auto=format&fit=crop&w=300&q=80' },
    { id: '28', title: 'Band of Brothers: Legacy', year: '2023', genre: 'War', rating: 'R', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1478720568477-b0c8b7e0e518?auto=format&fit=crop&w=300&q=80' },
    { id: '47', title: '1917: Aftermath', year: '2024', genre: 'War', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1566043975481-5c9c9b3d9d6f?auto=format&fit=crop&w=300&q=80' },
    { id: '48', title: 'Hacksaw Ridge 2', year: '2023', genre: 'War', rating: 'R', provider: 'Amazon Prime', thumbnail: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=300&q=80' },

    // HORROR Genre (8 items)
    { id: '49', title: 'A Quiet Place 3', year: '2024', genre: 'Horror', rating: 'PG-13', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=300&q=80' },
    { id: '50', title: 'The Conjuring 4', year: '2023', genre: 'Horror', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=300&q=80' },
    { id: '51', title: 'It Chapter 3', year: '2024', genre: 'Horror', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=300&q=80' },
    { id: '52', title: 'Hereditary 2', year: '2022', genre: 'Horror', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=300&q=80' },
    { id: '53', title: 'Get Out 2', year: '2023', genre: 'Horror', rating: 'R', provider: 'Amazon Prime', thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=300&q=80' },
    { id: '54', title: 'The Ring: Reborn', year: '2021', genre: 'Horror', rating: 'R', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=300&q=80' },
    { id: '55', title: 'Insidious 5', year: '2024', genre: 'Horror', rating: 'PG-13', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=300&q=80' },
    { id: '56', title: 'Smile 2', year: '2023', genre: 'Horror', rating: 'R', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=300&q=80' },

    // THRILLER Genre (8 items)
    { id: '57', title: 'Gone Girl 2', year: '2024', genre: 'Thriller', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '58', title: 'Se7en: Resurrection', year: '2023', genre: 'Thriller', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '59', title: 'Shutter Island 2', year: '2022', genre: 'Thriller', rating: 'R', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '60', title: 'The Girl on the Train 2', year: '2021', genre: 'Thriller', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '61', title: 'Prisoners: Return', year: '2024', genre: 'Thriller', rating: 'R', provider: 'Amazon Prime', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '62', title: 'Zodiac: Revealed', year: '2023', genre: 'Thriller', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '63', title: 'The Silence of the Lambs 2', year: '2019', genre: 'Thriller', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '64', title: 'Nightcrawler 2', year: '2020', genre: 'Thriller', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },

    // ROMANCE Genre (6 items)
    { id: '65', title: 'The Notebook 2', year: '2024', genre: 'Romance', rating: 'PG-13', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '66', title: 'La La Land 2', year: '2023', genre: 'Romance', rating: 'PG-13', provider: 'Amazon Prime', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '67', title: 'Pride & Prejudice: Darcy Returns', year: '2022', genre: 'Romance', rating: 'PG', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '68', title: 'Crazy Rich Asians 2', year: '2024', genre: 'Romance', rating: 'PG-13', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '69', title: 'Before Sunrise 4', year: '2021', genre: 'Romance', rating: 'PG-13', provider: 'Apple TV+', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '70', title: 'Eternal Sunshine 2', year: '2023', genre: 'Romance', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },

    // ANIMATION Genre (8 items)
    { id: '30', title: 'The Incredibles 3', year: '2023', genre: 'Animation', rating: 'PG', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1489599317593-3b62f9a61c5b?auto=format&fit=crop&w=300&q=80' },
    { id: '71', title: 'Toy Story 5', year: '2024', genre: 'Animation', rating: 'G', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80' },
    { id: '72', title: 'Frozen 3', year: '2024', genre: 'Animation', rating: 'G', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1489599317593-3b62f9a61c5b?auto=format&fit=crop&w=300&q=80' },
    { id: '73', title: 'Spider-Verse 3', year: '2023', genre: 'Animation', rating: 'PG', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80' },
    { id: '74', title: 'Moana 2', year: '2024', genre: 'Animation', rating: 'PG', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1489599317593-3b62f9a61c5b?auto=format&fit=crop&w=300&q=80' },
    { id: '75', title: 'Inside Out 3', year: '2023', genre: 'Animation', rating: 'PG', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80' },
    { id: '76', title: 'How to Train Your Dragon 4', year: '2022', genre: 'Animation', rating: 'PG', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1489599317593-3b62f9a61c5b?auto=format&fit=crop&w=300&q=80' },
    { id: '77', title: 'Zootopia 2', year: '2024', genre: 'Animation', rating: 'PG', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80' },

    // DOCUMENTARY Genre (6 items)
    { id: '78', title: 'Planet Earth III', year: '2024', genre: 'Documentary', rating: 'G', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80' },
    { id: '79', title: 'Blue Planet III', year: '2023', genre: 'Documentary', rating: 'G', provider: 'Apple TV+', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80' },
    { id: '80', title: 'The Last Dance 2', year: '2022', genre: 'Documentary', rating: 'PG', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '81', title: 'Cosmos: New Horizons', year: '2024', genre: 'Documentary', rating: 'PG', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80' },
    { id: '82', title: 'Making a Murderer 3', year: '2023', genre: 'Documentary', rating: 'PG-13', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '83', title: 'Our Planet 2', year: '2021', genre: 'Documentary', rating: 'G', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80' },

    // FANTASY Genre (6 items)
    { id: '84', title: 'The Hobbit: New Journey', year: '2024', genre: 'Fantasy', rating: 'PG-13', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?auto=format&fit=crop&w=300&q=80' },
    { id: '85', title: 'Harry Potter: Legacy', year: '2023', genre: 'Fantasy', rating: 'PG-13', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?auto=format&fit=crop&w=300&q=80' },
    { id: '86', title: 'Game of Thrones: Rise', year: '2024', genre: 'Fantasy', rating: 'R', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?auto=format&fit=crop&w=300&q=80' },
    { id: '87', title: 'The Witcher: Destiny', year: '2023', genre: 'Fantasy', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?auto=format&fit=crop&w=300&q=80' },
    { id: '88', title: 'Pan\'s Labyrinth 2', year: '2022', genre: 'Fantasy', rating: 'R', provider: 'Amazon Prime', thumbnail: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?auto=format&fit=crop&w=300&q=80' },
    { id: '89', title: 'Stardust 2', year: '2021', genre: 'Fantasy', rating: 'PG-13', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1546900703-cf06143d1239?auto=format&fit=crop&w=300&q=80' },

    // MYSTERY Genre (6 items)
    { id: '90', title: 'Knives Out 3', year: '2024', genre: 'Mystery', rating: 'PG-13', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '91', title: 'Murder on the Orient Express 2', year: '2023', genre: 'Mystery', rating: 'PG-13', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '92', title: 'Sherlock Holmes 3', year: '2024', genre: 'Mystery', rating: 'PG-13', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '93', title: 'The Girl with the Dragon Tattoo 2', year: '2022', genre: 'Mystery', rating: 'R', provider: 'Amazon Prime', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '94', title: 'Death on the Nile 2', year: '2023', genre: 'Mystery', rating: 'PG-13', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
    { id: '95', title: 'The Prestige 2', year: '2021', genre: 'Mystery', rating: 'PG-13', provider: 'HBO Max', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },

    // WESTERN Genre (4 items)
    { id: '96', title: 'The Magnificent Seven 2', year: '2024', genre: 'Western', rating: 'PG-13', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1566043975481-5c9c9b3d9d6f?auto=format&fit=crop&w=300&q=80' },
    { id: '97', title: 'Django Unchained 2', year: '2023', genre: 'Western', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1566043975481-5c9c9b3d9d6f?auto=format&fit=crop&w=300&q=80' },
    { id: '98', title: 'True Grit 2', year: '2022', genre: 'Western', rating: 'PG-13', provider: 'Paramount+', thumbnail: 'https://images.unsplash.com/photo-1566043975481-5c9c9b3d9d6f?auto=format&fit=crop&w=300&q=80' },
    { id: '99', title: 'The Hateful Eight 2', year: '2021', genre: 'Western', rating: 'R', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1566043975481-5c9c9b3d9d6f?auto=format&fit=crop&w=300&q=80' },

    // MUSICAL Genre (4 items)
    { id: '100', title: 'The Greatest Showman 2', year: '2024', genre: 'Musical', rating: 'PG', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '101', title: 'Moulin Rouge 2', year: '2023', genre: 'Musical', rating: 'PG-13', provider: 'Amazon Prime', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '102', title: 'Mamma Mia! 3', year: '2022', genre: 'Musical', rating: 'PG-13', provider: 'Netflix', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
    { id: '103', title: 'Hamilton: The Sequel', year: '2024', genre: 'Musical', rating: 'PG-13', provider: 'Disney+', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80' },
  ];

  const displayItems = items.length > 0 ? items : sampleItems;

  // Filter logic
  const filteredItems = displayItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === '' || item.genre === selectedGenre;
    const matchesYear = selectedYear === '' || item.year === selectedYear;
    const matchesRating = selectedRating === '' || item.rating === selectedRating;
    const matchesProvider = selectedProvider === '' || item.provider === selectedProvider;
    
    return matchesSearch && matchesGenre && matchesYear && matchesRating && matchesProvider;
  });

  // Responsive items per page based on screen size
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 480) {
        setItemsPerPage(12); // More items with smaller posters on mobile
      } else if (window.innerWidth < 768) {
        setItemsPerPage(15); // More items with smaller posters on mobile
      } else if (window.innerWidth < 1200) {
        setItemsPerPage(18); // More items with smaller posters on tablet
      } else {
        setItemsPerPage(21); // More items with smaller posters on desktop
      }
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);
  
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const hasActiveFilters = searchQuery || selectedGenre || selectedYear || selectedRating || selectedProvider;
  const showEmptyState = !hasActiveFilters;
  const showNoResults = hasActiveFilters && filteredItems.length === 0;
  
  // Selection reference logic - show selected items that are not currently visible
  const selectedItemsData = displayItems.filter(item => selectedItems.includes(item.id));
  const visibleSelectedItems = paginatedItems.filter(item => selectedItems.includes(item.id));
  const hiddenSelectedItems = selectedItemsData.filter(item => !filteredItems.some(filteredItem => filteredItem.id === item.id));
  const showSelectionReference = selectedItemsData.length > 0 && hiddenSelectedItems.length > 0;

  const handleItemSelection = (itemId: string) => {
    const newSelection = selectedItems.includes(itemId)
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    onSelectionChange?.(newSelection);
  };

  const handleSelectAllOnPage = () => {
    const pageItemIds = paginatedItems.map(item => item.id);
    if (selectAllOnPage) {
      const newSelection = selectedItems.filter(id => !pageItemIds.includes(id));
      onSelectionChange?.(newSelection);
    } else {
      const newSelection = [...new Set([...selectedItems, ...pageItemIds])];
      onSelectionChange?.(newSelection);
    }
    setSelectAllOnPage(!selectAllOnPage);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSortBy('title');
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedRating('');
    setSelectedProvider('');
    setCurrentPage(1);
  };

  const handleConfirm = () => {
    onConfirm?.(selectedItems);
    onClose();
  };

  const handleRemoveFromSelection = (itemId: string) => {
    const newSelection = selectedItems.filter(id => id !== itemId);
    onSelectionChange?.(newSelection);
  };

  // Update select all state based on current page selection
  useEffect(() => {
    const pageItemIds = paginatedItems.map(item => item.id);
    const allPageItemsSelected = pageItemIds.length > 0 && pageItemIds.every(id => selectedItems.includes(id));
    setSelectAllOnPage(allPageItemsSelected);
  }, [paginatedItems, selectedItems]);

  if (!isOpen) return null;

  const modalContent = (
    <>
      <style>{`
        .content-browser-modal {
          /* Design System Tokens */
          --modal-overlay-bg: var(--content-browser-overlay-bg);
          --modal-bg: var(--content-browser-modal-bg);
          --modal-border: var(--content-browser-modal-border);
          --modal-border-radius: 12px;
          --modal-max-width: 60vw;
          --modal-height: 80vh;
          --modal-max-height: 90vh;
          --modal-padding: 0;
          --modal-z-index: 1000;
          
          /* Responsive Modal Tokens */
          --modal-max-width-desktop: 60vw;
          --modal-max-width-tablet: 80vw;
          --modal-max-width-mobile: 95vw;
          --modal-height-desktop: 80vh;
          --modal-height-tablet: 85vh;
          --modal-height-mobile: 90vh;

          /* Header Tokens */
          --header-padding: 20px 24px;
          --header-border-bottom: 1px solid var(--content-browser-border);
          --header-gap: 16px;
          --header-title-font-size: 18px;
          --header-title-font-weight: 500;
          --header-title-color: var(--foreground);
          --header-title-transform: none;
          --header-subtitle-font-size: 14px;
          --header-subtitle-color: var(--muted-foreground);

          /* Filter Bar Tokens */
          --filter-bar-padding: 16px 24px;
          --filter-bar-border-bottom: 1px solid var(--content-browser-border);
          --filter-bar-gap: 12px;
          --filter-bar-bg: var(--content-browser-filter-bar-bg);

          /* Filter Section Tokens */
          --filter-section-padding: 20px 24px;
          --filter-section-border-bottom: 1px solid var(--content-browser-border);
          --filter-section-bg: transparent;
          --filter-section-gap: 16px;
          --filter-label-font-size: 13px;
          --filter-label-color: var(--muted-foreground);
          --filter-label-transform: none;
          --filter-label-font-weight: 400;
          --filter-label-line-height: 20px;
          --filter-label-letter-spacing: 0.1px;

          /* Content Tokens */
          --content-padding: 24px;
          --content-min-height: 400px;
          --content-max-height: 50vh;
          --content-overflow: auto;

          /* Grid Tokens - 30% smaller posters */
          --grid-gap: 20px;
          --grid-columns: repeat(auto-fill, minmax(84px, 1fr));
          --item-border-radius: 6px;
          --item-aspect-ratio: 2/3;
          
          /* Responsive Grid Tokens - 30% smaller posters */
          --grid-columns-desktop: repeat(auto-fill, minmax(84px, 1fr));
          --grid-columns-tablet: repeat(auto-fill, minmax(70px, 1fr));
          --grid-columns-mobile: repeat(auto-fill, minmax(56px, 1fr));
          --grid-gap-desktop: 20px;
          --grid-gap-tablet: 16px;
          --grid-gap-mobile: 12px;

          /* Footer Tokens */
          --footer-padding: 18px 24px;
          --footer-border-top: 1px solid var(--content-browser-border);
          --footer-gap: 16px;
          --footer-bg: transparent;
          --footer-flex-shrink: 0;
          --footer-margin-bottom: 20px;

          /* Empty State Tokens */
          --empty-state-text-color: var(--muted-foreground);
          --empty-state-icon-color: var(--content-browser-empty-icon);
          --empty-state-gap: 16px;

          /* No Results State Tokens */
          --no-results-text-color: var(--muted-foreground);
          --no-results-icon-color: var(--content-browser-empty-icon);
          --no-results-gap: 16px;
          --no-results-padding: 40px 24px;

          /* Selection Reference Tokens */
          --selection-ref-bg: var(--content-browser-selection-ref-bg);
          --selection-ref-border: var(--content-browser-modal-border);
          --selection-ref-padding: 16px 24px;
          --selection-ref-gap: 12px;
          --selection-ref-item-size: 60px;
          --selection-ref-item-border-radius: 4px;
          --selection-ref-item-gap: 8px;

          /* Placeholder Tokens - Matching RailContentGallery */
          --placeholder-bg: var(--content-browser-placeholder-bg);
          --placeholder-icon-color: var(--content-browser-placeholder-icon);
          --placeholder-icon-size: 28px;
          --selection-ref-placeholder-icon-size: 16px;

          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background: var(--modal-overlay-bg);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--modal-z-index);
          padding: 20px;
          box-sizing: border-box;
        }

        .content-browser-modal__dialog {
          background: var(--modal-bg);
          border: 1px solid var(--modal-border);
          border-radius: var(--modal-border-radius);
          box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.35);
          width: 100%;
          max-width: var(--modal-max-width);
          height: var(--modal-height);
          max-height: var(--modal-max-height);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        .content-browser-modal__dialog::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom right, rgba(61, 99, 221, 0.04), transparent);
          pointer-events: none;
          z-index: 0;
        }

        .content-browser-modal__header {
          padding: var(--header-padding);
          border-bottom: var(--header-border-bottom);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--header-gap);
          position: relative;
          z-index: 1;
        }

        .content-browser-modal__header-content {
          flex: 1;
        }

        .content-browser-modal__title {
          font-size: var(--header-title-font-size);
          font-weight: var(--header-title-font-weight);
          color: var(--header-title-color);
          text-transform: var(--header-title-transform);
          line-height: 1.4;
          margin: 0 0 4px 0;
        }

        .content-browser-modal__subtitle {
          font-size: var(--header-subtitle-font-size);
          color: var(--header-subtitle-color);
          line-height: 1.5;
          margin: 0;
        }

        .content-browser-modal__filter-bar {
          padding: var(--filter-bar-padding);
          border-bottom: var(--filter-bar-border-bottom);
          background: var(--filter-bar-bg);
          display: flex;
          align-items: center;
          gap: var(--filter-bar-gap);
          position: relative;
          z-index: 1;
        }

        .content-browser-modal__search-container {
          position: relative;
          flex: 1;
          max-width: 320px;
        }

        .content-browser-modal__search {
          width: 100%;
          background: var(--input-bg);
          border: 1px solid var(--input-border);
          border-radius: 6px;
          color: var(--input-text);
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.15px;
          min-height: var(--input-min-height);
          padding: 6px 4px 6px 32px;
          transition: border-color 150ms, box-shadow 150ms;
          font-family: var(--font-family);
          outline: none;
        }

        .content-browser-modal__search::placeholder {
          color: var(--input-placeholder);
        }

        .content-browser-modal__search:hover {
          border-color: var(--input-hover-border);
        }

        .content-browser-modal__search:focus {
          border: 2px solid var(--input-focus-border);
          box-shadow: var(--input-focus-glow);
          padding: 5px 3px 5px 31px;
        }

        .content-browser-modal__search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--input-placeholder);
          pointer-events: none;
          z-index: 1;
        }

        .content-browser-modal__view-controls {
          display: flex;
          gap: 4px;
        }

        .content-browser-modal__filter-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--border-default);
          color: var(--foreground);
          padding: 6px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 13px;
          font-weight: 500;
          outline: none;
        }

        .content-browser-modal__filter-toggle:hover {
          background: var(--content-browser-btn-hover-bg);
          border: 1px solid var(--foreground);
        }

        .content-browser-modal__filter-toggle:focus {
          background: var(--content-browser-btn-hover-bg);
          border: 1px solid var(--border-default);
          box-shadow: 0 0 0 2px var(--focus-ring);
        }

        .content-browser-modal__filter-toggle--active {
          background: var(--content-browser-btn-hover-bg);
          color: var(--foreground);
        }

        .content-browser-modal__filter-section {
          padding: var(--filter-section-padding);
          border-bottom: var(--filter-section-border-bottom);
          background: var(--filter-section-bg);
          display: flex;
          flex-wrap: wrap;
          gap: var(--filter-section-gap);
          align-items: end;
          position: relative;
          z-index: 1;
        }

        .content-browser-modal__filter-section--collapsed {
          display: none;
        }

        .content-browser-modal__filter-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 140px;
          flex: 1 1 160px;
          max-width: 200px;
        }

        .content-browser-modal__filter-label {
          font-size: var(--filter-label-font-size);
          color: var(--filter-label-color);
          text-transform: var(--filter-label-transform);
          font-weight: var(--filter-label-font-weight);
          line-height: var(--filter-label-line-height);
          letter-spacing: var(--filter-label-letter-spacing);
          margin: 0;
        }

        .content-browser-modal__filter-select {
          background: var(--input-bg);
          border: 1px solid var(--input-border);
          color: var(--input-text);
          padding: 6px 8px;
          border-radius: 4px;
          font-size: 13px;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .content-browser-modal__filter-select:focus {
          border: 2px solid var(--border-focus);
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
          padding: 5px 7px;
        }

        .content-browser-modal__filter-select option {
          background: var(--filter-menu-bg);
          color: var(--foreground);
        }



        .content-browser-modal__content {
          padding: var(--content-padding);
          min-height: var(--content-min-height);
          overflow: var(--content-overflow);
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
          position: relative;
          z-index: 1;
        }

        .content-browser-modal__empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          gap: var(--empty-state-gap);
          text-align: center;
        }

        .content-browser-modal__empty-icon {
          width: 48px;
          height: 48px;
          color: var(--empty-state-icon-color);
        }

        .content-browser-modal__empty-title {
          font-size: 16px;
          font-weight: 500;
          color: var(--foreground);
          margin: 0;
        }

        .content-browser-modal__empty-subtitle {
          font-size: 13px;
          color: var(--empty-state-text-color);
          margin: 0;
          max-width: 400px;
        }

        .content-browser-modal__show-filters {
          margin-top: 8px;
          padding: 6px 16px !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
        }

        .content-browser-modal__show-filters svg {
          width: 14px !important;
          height: 14px !important;
        }

        .content-browser-modal__no-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--no-results-padding);
          gap: var(--no-results-gap);
          text-align: center;
          flex: 1;
        }

        .content-browser-modal__no-results-icon {
          width: 48px;
          height: 48px;
          color: var(--no-results-icon-color);
        }

        .content-browser-modal__no-results-title {
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          margin: 0;
        }

        .content-browser-modal__no-results-subtitle {
          font-size: 13px;
          color: var(--no-results-text-color);
          margin: 0;
          max-width: 400px;
        }

        .content-browser-modal__no-results-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 8px;
          align-items: center;
        }

        .content-browser-modal__grid-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          font-size: 13px;
          color: #bbb;
        }

        .content-browser-modal__grid {
          display: grid;
          grid-template-columns: var(--grid-columns-desktop);
          gap: var(--grid-gap-desktop);
        }

        .content-browser-modal__item {
          position: relative;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .content-browser-modal__item:hover {
          transform: translateY(-2px);
        }

        .content-browser-modal__item-image-container {
          position: relative;
          aspect-ratio: var(--item-aspect-ratio);
          border-radius: var(--item-border-radius);
          overflow: hidden;
          background: #2e2e30;
        }

        .content-browser-modal__item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content-browser-modal__item-checkbox {
          position: absolute;
          top: 8px;
          left: 8px;
          width: 20px;
          height: 20px;
          background: var(--checkbox-default-bg);
          border: 1px solid var(--checkbox-default-border);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.2s ease;
        }

        .content-browser-modal__item:hover .content-browser-modal__item-checkbox {
          opacity: 1;
        }

        .content-browser-modal__item-checkbox--selected {
          background: var(--checkbox-checked-bg-color);
          border-color: var(--checkbox-checked-border-color);
          opacity: 1;
        }

        .content-browser-modal__item-checkbox--selected::after {
          content: "✓";
          color: var(--checkbox-checked-text-color);
          font-size: 12px;
          font-weight: bold;
        }

        .content-browser-modal__item-info {
          margin-top: 8px;
        }

        .content-browser-modal__item-title {
          font-size: 13px;
          color: var(--foreground);
          margin: 0 0 2px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .content-browser-modal__item-year {
          font-size: 12px;
          color: var(--muted-foreground);
          margin: 0;
        }

        .content-browser-modal__footer {
          padding: var(--footer-padding);
          border-top: var(--footer-border-top);
          background: transparent;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--footer-gap);
          flex-shrink: 0;
          min-height: 60px;
          margin-top: auto;
          padding-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .content-browser-modal__footer-left {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          color: var(--muted-foreground);
        }

        .content-browser-modal__pagination {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          color: var(--muted-foreground);
        }

        .content-browser-modal__pagination-button {
          background: none;
          border: none;
          color: var(--color-link);
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 3px;
          transition: all 0.2s ease;
        }

        .content-browser-modal__pagination-button:hover:not(:disabled) {
          background: var(--content-browser-btn-hover-bg);
          color: var(--color-link-hover);
        }

        .content-browser-modal__pagination-button:disabled {
          color: var(--muted-foreground);
          cursor: not-allowed;
        }

        .content-browser-modal__footer-right {
          display: flex;
          gap: 12px;
        }

        .content-browser-modal__select-all {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--muted-foreground);
          cursor: pointer;
        }

        .content-browser-modal__select-all-checkbox {
          width: 16px;
          height: 16px;
          background: transparent;
          border: 1px solid #666;
          border-radius: 3px;
          position: relative;
          cursor: pointer;
        }

        .content-browser-modal__select-all-checkbox--checked {
          background: #3d63dd;
          border-color: var(--border-focus);
        }

        .content-browser-modal__select-all-checkbox--checked::after {
          content: "✓";
          color: white;
          font-size: 10px;
          font-weight: bold;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .content-browser-modal__selection-reference {
          background: var(--selection-ref-bg);
          border-bottom: 1px solid var(--selection-ref-border);
          padding: var(--selection-ref-padding);
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        .content-browser-modal__selection-reference-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .content-browser-modal__selection-reference-title {
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-medium-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          color: #fff;
          margin: 0;
        }

        .content-browser-modal__selection-reference-toggle {
          background: none;
          border: none;
          color: #67b3fb;
          cursor: pointer;
          font-size: var(--type-scale-s-size);
          padding: 4px 8px;
          border-radius: 4px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .content-browser-modal__selection-reference-toggle:hover {
          background: #292a2e;
          color: #359afa;
        }

        .content-browser-modal__selection-reference-content {
          display: flex;
          flex-wrap: wrap;
          gap: var(--selection-ref-gap);
          max-height: 100px;
          overflow-y: auto;
        }

        .content-browser-modal__selection-reference-content--collapsed {
          display: none;
        }

        .content-browser-modal__selection-reference-item {
          position: relative;
          width: var(--selection-ref-item-size);
          height: calc(var(--selection-ref-item-size) * 1.5);
          border-radius: var(--selection-ref-item-border-radius);
          overflow: hidden;
          background: #2e2e30;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .content-browser-modal__selection-reference-item:hover {
          transform: scale(1.05);
        }

        .content-browser-modal__selection-reference-item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content-browser-modal__selection-reference-item:hover .icon-small-button--remove {
          opacity: 1 !important;
        }

        .content-browser-modal__selection-reference-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 8px 4px 4px 4px;
          font-size: 10px;
          color: #fff;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .content-browser-modal__placeholder {
          width: 100%;
          height: 100%;
          background: var(--placeholder-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--item-border-radius);
        }

        .content-browser-modal__placeholder-icon {
          color: var(--placeholder-icon-color);
          opacity: 0.8;
        }

        .content-browser-modal__selection-reference-placeholder {
          width: 100%;
          height: 100%;
          background: var(--placeholder-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--selection-ref-item-border-radius);
        }

        .content-browser-modal__selection-reference-placeholder-icon {
          color: var(--placeholder-icon-color);
          opacity: 0.8;
        }

        /* Responsive Breakpoints */
        
        /* Large Desktop - Default (> 1200px) */
        .content-browser-modal__dialog {
          max-width: var(--modal-max-width-desktop);
          height: var(--modal-height-desktop);
        }
        
        .content-browser-modal__grid {
          grid-template-columns: var(--grid-columns-desktop);
          gap: var(--grid-gap-desktop);
        }

        /* Tablet (768px - 1200px) */
        @media (max-width: 1200px) {
          .content-browser-modal__dialog {
            max-width: var(--modal-max-width-tablet);
            height: var(--modal-height-tablet);
          }
          
          .content-browser-modal__grid {
            grid-template-columns: var(--grid-columns-tablet);
            gap: var(--grid-gap-tablet);
          }
        }

        /* Mobile (< 768px) */
        @media (max-width: 768px) {
          .content-browser-modal {
            padding: 10px;
          }
          
          .content-browser-modal__dialog {
            max-width: var(--modal-max-width-mobile);
            height: var(--modal-height-mobile);
          }
          
          .content-browser-modal__grid {
            grid-template-columns: var(--grid-columns-mobile);
            gap: var(--grid-gap-mobile);
          }
          
          .content-browser-modal__header {
            padding: 16px 20px;
          }
          
          .content-browser-modal__filter-bar {
            padding: 12px 20px;
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          
          .content-browser-modal__search-container {
            max-width: 100%;
          }
          
          .content-browser-modal__view-controls {
            align-self: center;
          }
          
          .content-browser-modal__filter-section {
            padding: 16px 20px;
          }
          
          .content-browser-modal__content {
            padding: 20px;
          }
          
          .content-browser-modal__footer {
            padding: 14px 20px;
            flex-direction: column;
            gap: 12px;
          }
          
          .content-browser-modal__selection-reference {
            padding: 12px 20px;
          }
          
          .content-browser-modal__selection-ref-content {
            flex-direction: column;
            gap: 12px;
          }
          
          .content-browser-modal__selection-ref-items {
            justify-content: center;
          }
        }

        /* Small Mobile (< 480px) */
        @media (max-width: 480px) {
          .content-browser-modal {
            padding: 5px;
          }
          
          .content-browser-modal__grid {
            grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
            gap: 8px;
          }
          
          .content-browser-modal__header {
            padding: 12px 16px;
          }
          
          .content-browser-modal__filter-bar {
            padding: 10px 16px;
          }
          
          .content-browser-modal__filter-section {
            padding: 12px 16px;
          }
          
          .content-browser-modal__content {
            padding: 16px;
          }
          
          .content-browser-modal__footer {
            padding: 12px 16px;
          }
          
          .content-browser-modal__selection-reference {
            padding: 10px 16px;
          }
          
          .content-browser-modal__title {
            font-size: 12px;
          }
          
          .content-browser-modal__subtitle {
            font-size: 12px;
          }
        }

      `}</style>

      <div className="content-browser-modal" onClick={onClose}>
        <div className="content-browser-modal__dialog" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="content-browser-modal__header">
            <div className="content-browser-modal__header-content">
              <h2 className="content-browser-modal__title" style={{ textTransform: 'none' }}>Browse Content</h2>
              <p className="content-browser-modal__subtitle">{subtitle}</p>
            </div>
            <IconButton onClick={onClose} aria-label="Close modal">
              <X size={16} />
            </IconButton>
          </div>

          {/* Filter Bar */}
          <div className="content-browser-modal__filter-bar" style={{ boxShadow: 'none', border: '1px solid var(--border-default)', background: 'transparent' }}>
            <div className="content-browser-modal__search-container" style={{ boxShadow: 'none' }}>
              <Search size={16} className="content-browser-modal__search-icon" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="content-browser-modal__search"
              />
            </div>

            <div className="content-browser-modal__view-controls" style={{ boxShadow: 'none' }}>
              <IconButton
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                aria-label="Grid view"
              >
                <Grid3X3 size={16} />
              </IconButton>
              <IconButton
                onClick={() => setViewMode('list')}
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                aria-label="List view"
              >
                <List size={16} />
              </IconButton>
            </div>

            <button
              className={`content-browser-modal__filter-toggle ${filtersExpanded ? 'content-browser-modal__filter-toggle--active' : ''}`}
              onClick={() => setFiltersExpanded(!filtersExpanded)}
              style={{ boxShadow: 'none' }}
            >
              <Filter size={14} />
              Filters
              {filtersExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Filter Section */}
          <div className={`content-browser-modal__filter-section ${!filtersExpanded ? 'content-browser-modal__filter-section--collapsed' : ''}`}>
            <div className="content-browser-modal__filter-group">
              <label className="content-browser-modal__filter-label">Sort By</label>
              <select
                className="content-browser-modal__filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="title">Title</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div className="content-browser-modal__filter-group">
              <label className="content-browser-modal__filter-label">Genre</label>
              <select
                className="content-browser-modal__filter-select"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">Select a Genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="War">War</option>
              </select>
            </div>

            <div className="content-browser-modal__filter-group">
              <label className="content-browser-modal__filter-label">Year</label>
              <select
                className="content-browser-modal__filter-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select a Year</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
            </div>

            <div className="content-browser-modal__filter-group">
              <label className="content-browser-modal__filter-label">Rating</label>
              <select
                className="content-browser-modal__filter-select"
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
              >
                <option value="">Select a Rating</option>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
              </select>
            </div>

            <div className="content-browser-modal__filter-group">
              <label className="content-browser-modal__filter-label">Provider</label>
              <select
                className="content-browser-modal__filter-select"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
              >
                <option value="">Select a Provider</option>
                <option value="Netflix">Netflix</option>
                <option value="Disney+">Disney+</option>
                <option value="HBO Max">HBO Max</option>
                <option value="Paramount+">Paramount+</option>
              </select>
            </div>

            <TextButton onClick={clearAllFilters}>
              Clear All
            </TextButton>
          </div>

          {/* Selection Reference */}
          {showSelectionReference && (
            <div className="content-browser-modal__selection-reference">
              <div className="content-browser-modal__selection-reference-header">
                <h3 className="content-browser-modal__selection-reference-title">
                  Selected Items ({selectedItemsData.length}) • {hiddenSelectedItems.length} hidden by filters
                </h3>
                <TextButton
                  className="text-button--toggle"
                  onClick={() => setSelectionReferenceExpanded(!selectionReferenceExpanded)}
                >
                  {selectionReferenceExpanded ? 'Hide' : 'Show'}
                  {selectionReferenceExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </TextButton>
              </div>
              
              <div className={`content-browser-modal__selection-reference-content ${!selectionReferenceExpanded ? 'content-browser-modal__selection-reference-content--collapsed' : ''}`}>
                {hiddenSelectedItems.map((item) => (
                  <Tooltip key={`ref-${item.id}`}>
                    <TooltipTrigger asChild>
                      <div
                        className="content-browser-modal__selection-reference-item"
                      >
                        {hasValidThumbnail(item.thumbnail) ? (
                          <ImageWithFallback
                            src={item.thumbnail}
                            alt={`${item.title} (${item.year})`}
                            className="content-browser-modal__selection-reference-item-image"
                          />
                        ) : (
                          <div className="content-browser-modal__selection-reference-placeholder">
                            <Film size={16} className="content-browser-modal__selection-reference-placeholder-icon" />
                          </div>
                        )}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <IconSmallButton
                              variant="remove"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFromSelection(item.id);
                              }}
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                width: '18px',
                                height: '18px',
                                opacity: 0,
                                transition: 'all 0.2s ease'
                              }}
                            >
                              <X size={10} />
                            </IconSmallButton>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            Remove from selection
                          </TooltipContent>
                        </Tooltip>
                        <div className="content-browser-modal__selection-reference-info">
                          {item.title}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {item.title} ({item.year})
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="content-browser-modal__content">
            {showEmptyState ? (
              <div className="content-browser-modal__empty-state">
                <Search className="content-browser-modal__empty-icon" />
                <h3 className="content-browser-modal__empty-title">
                  Apply filters to find content
                </h3>
                <p className="content-browser-modal__empty-subtitle">
                  Use the search bar or filters above to browse and discover content for your rail.
                </p>
                {!filtersExpanded && (
                  <OutlineButton
                    className="content-browser-modal__show-filters"
                    onClick={() => setFiltersExpanded(true)}
                  >
                    <Filter size={14} />
                    Show Filters
                  </OutlineButton>
                )}
              </div>
            ) : showNoResults ? (
              <div className="content-browser-modal__no-results">
                <Search className="content-browser-modal__no-results-icon" />
                <h3 className="content-browser-modal__no-results-title">
                  No matching content found
                </h3>
                <p className="content-browser-modal__no-results-subtitle">
                  Try adjusting your filters or search terms to find more content that matches your criteria.
                </p>
                <div className="content-browser-modal__no-results-actions">
                  <TextButton onClick={clearAllFilters}>
                    Clear All Filters
                  </TextButton>
                </div>
              </div>
            ) : (
              <>
                <div className="content-browser-modal__grid-header">
                  <span>{filteredItems.length} items found</span>
                  {filteredItems.length > 0 && (
                    <div className="content-browser-modal__select-all" onClick={handleSelectAllOnPage}>
                      <div className={`content-browser-modal__select-all-checkbox ${selectAllOnPage ? 'content-browser-modal__select-all-checkbox--checked' : ''}`} />
                      Select all on page
                    </div>
                  )}
                </div>

                <div style={{ flex: 1, overflow: 'auto' }}>
                  <div className="content-browser-modal__grid">
                    {paginatedItems.map((item) => (
                      <div
                        key={item.id}
                        className="content-browser-modal__item"
                        onClick={() => handleItemSelection(item.id)}
                      >
                        <div className="content-browser-modal__item-image-container">
                          {hasValidThumbnail(item.thumbnail) ? (
                            <ImageWithFallback
                              src={item.thumbnail}
                              alt={`${item.title} (${item.year})`}
                              className="content-browser-modal__item-image"
                            />
                          ) : (
                            <div className="content-browser-modal__placeholder">
                              <Film size={28} className="content-browser-modal__placeholder-icon" />
                            </div>
                          )}
                          <div
                            className={`content-browser-modal__item-checkbox ${
                              selectedItems.includes(item.id) ? 'content-browser-modal__item-checkbox--selected' : ''
                            }`}
                          />
                        </div>
                        <div className="content-browser-modal__item-info">
                          <h4 className="content-browser-modal__item-title">{item.title}</h4>
                          <p className="content-browser-modal__item-year">{item.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="content-browser-modal__footer">
            <div className="content-browser-modal__footer-left">
              <span>
                {showNoResults 
                  ? 'No matching results'
                  : hasActiveFilters 
                    ? `${selectedItems.length} items selected`
                    : 'No filters applied'
                }
              </span>
              
              {!showEmptyState && !showNoResults && totalPages > 1 && (
                <div className="content-browser-modal__pagination">
                  <span>Page {currentPage} of {totalPages}</span>
                  <button
                    className="content-browser-modal__pagination-button"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="content-browser-modal__pagination-button"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            <div className="content-browser-modal__footer-right">
              <OutlineButton onClick={onClose}>
                Cancel
              </OutlineButton>
              <PrimaryButton onClick={handleConfirm}>
                Add Selected ({selectedItems.length})
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}