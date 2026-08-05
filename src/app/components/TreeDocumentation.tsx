import React, { useState, useRef, useEffect } from 'react';
import { Tree, TreeItem } from './Tree';
import { ChevronDown, ChevronRight, Layers, Film } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface TruncatedLabelProps {
  children: string;
  style?: React.CSSProperties;
  maxLength?: number;
}

function TruncatedLabel({ children, style, maxLength }: TruncatedLabelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const spanRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  
  const shouldTruncate = maxLength && children.length > maxLength;
  const displayText = shouldTruncate ? children.slice(0, maxLength) : children;

  const handleMouseEnter = () => {
    if (shouldTruncate && spanRef.current && measureRef.current) {
      const spanRect = spanRef.current.getBoundingClientRect();
      const measureRect = measureRef.current.getBoundingClientRect();
      
      setTooltipPosition({
        x: spanRect.left + measureRect.width + 9, // 3px for "..." + 6px gap
        y: spanRect.top + spanRect.height / 2
      });
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (!shouldTruncate) {
    return (
      <span 
        style={{ 
          ...style,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <>
      <span 
        ref={spanRef}
        style={{ 
          ...style,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          position: 'relative'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {displayText}...
      </span>
      
      {/* Hidden span to measure actual text width */}
      <span 
        ref={measureRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          ...style
        }}
      >
        {displayText}
      </span>
      
      {isHovered && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translateY(-50%)',
            backgroundColor: 'var(--tooltip-bg)',
            color: 'var(--tooltip-text)',
            fontFamily: 'Inter, var(--font-family)',
            fontSize: '13px',
            lineHeight: '20px',
            letterSpacing: '0.1px',
            fontWeight: 400,
            padding: '6px 12px',
            borderRadius: '6px',
            boxShadow: 'var(--tooltip-shadow)',
            border: 'none',
            zIndex: 9999,
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}

interface InteractiveTreeProps {
  onSelect?: (item: TreeItem) => void;
  selectedId?: string;
}

function InteractiveTreeExample({ onSelect, selectedId }: InteractiveTreeProps) {
  const [expandedIds, setExpandedIds] = useState(new Set(['home', 'trending-now', 'popular-content', 'continue-watching']));
  
  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const handleSelect = (item: TreeItem) => {
    if (onSelect) {
      onSelect(item);
    }
  };

  const isHomeExpanded = expandedIds.has('home');
  const isTrendingExpanded = expandedIds.has('trending-now');
  const isPopularExpanded = expandedIds.has('popular-content');
  const isContinueExpanded = expandedIds.has('continue-watching');

  return (
    <TooltipProvider>
      <div style={{ 
        padding: '8px 0', 
        borderRadius: '6px',
        fontFamily: 'var(--font-family)',
        fontSize: '14px',
        lineHeight: '20px'
      }}>
      {/* Home Page - Level 0 */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          paddingLeft: '8px', 
          paddingRight: '16px', 
          paddingTop: '4px', 
          paddingBottom: '4px',
          minHeight: '28px',
          cursor: 'pointer',
          borderRadius: '4px',
          margin: '2px 0',
          backgroundColor: selectedId === 'home' ? 'var(--tree-item-hover-bg, var(--secondary))' : 'transparent'
        }}
        onClick={() => {
          toggleExpanded('home');
          handleSelect({ id: 'home', label: 'Home Page', type: 'category', count: 3 });
        }}
        onMouseEnter={(e) => {
          if (selectedId !== 'home') {
            e.currentTarget.style.backgroundColor = 'var(--tree-item-hover-bg, var(--muted))';
          }
        }}
        onMouseLeave={(e) => {
          if (selectedId !== 'home') {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <div style={{ width: '16px', height: '16px', marginRight: '8px', color: 'var(--foreground)' }}>
          {isHomeExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
        <div style={{ width: '16px', height: '16px', marginRight: '8px', color: 'var(--foreground)' }}>
          <Layers size={16} />
        </div>
        <span style={{ fontWeight: 400, letterSpacing: '0.15px' }}>Home Page</span>
        <span style={{ marginLeft: '8px', color: 'var(--muted-foreground)', fontWeight: 400 }}>(3)</span>
        <div style={{ flex: 1 }} />
      </div>

      {/* Children of Home Page */}
      {isHomeExpanded && (
        <>
          {/* Trending Now - Level 1 */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              paddingLeft: '33px', 
              paddingRight: '16px', 
              paddingTop: '4px', 
              paddingBottom: '4px',
              minHeight: '28px',
              cursor: 'pointer',
              borderRadius: '4px',
              margin: '2px 0',
              backgroundColor: selectedId === 'trending-now' ? 'var(--tree-item-hover-bg, var(--secondary))' : 'transparent'
            }}
            onClick={() => {
              toggleExpanded('trending-now');
              handleSelect({ id: 'trending-now', label: 'Trending Now', type: 'subcategory', count: 3 });
            }}
            onMouseEnter={(e) => {
              if (selectedId !== 'trending-now') {
                e.currentTarget.style.backgroundColor = 'var(--tree-item-hover-bg, var(--muted))';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedId !== 'trending-now') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
              {isTrendingExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
              <Layers size={14} />
            </div>
            <span style={{ fontWeight: 400, letterSpacing: '0.15px' }}>Trending Now</span>
            <span style={{ marginLeft: '8px', color: 'var(--muted-foreground)', fontWeight: 400 }}>(3)</span>
            <div style={{ flex: 1 }} />
          </div>

          {/* Children of Trending Now */}
          {isTrendingExpanded && (
            <>
              {/* Trending Movies - Level 2 */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  paddingLeft: '52px', 
                  paddingRight: '16px', 
                  paddingTop: '4px', 
                  paddingBottom: '4px',
                  minHeight: '28px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  margin: '2px 0',
                  backgroundColor: selectedId === 'trending-movies' ? 'var(--tree-item-hover-bg, var(--secondary))' : 'transparent'
                }}
                onClick={() => handleSelect({ 
                  id: 'trending-movies', 
                  label: 'Trending Movies', 
                  type: 'item', 
                  status: 'active', 
                  tag: 'RECOMMENDED' 
                })}
                onMouseEnter={(e) => {
                  if (selectedId !== 'trending-movies') {
                    e.currentTarget.style.backgroundColor = 'var(--tree-item-hover-bg, var(--muted))';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedId !== 'trending-movies') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--a11y-status-active)', borderRadius: '50%' }} />
                </div>
                <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
                  <Film size={14} />
                </div>
                <TruncatedLabel 
                  style={{ flex: 1, fontWeight: 400, letterSpacing: '0.15px' }}
                  maxLength={17}
                >
                  Trending Movies
                </TruncatedLabel>
                <div style={{ marginLeft: '16px', fontSize: '13px', fontFamily: 'var(--font-family-mono)', color: 'var(--a11y-rail-recommended)', textTransform: 'uppercase' }}>
                  RECOMMENDED
                </div>
              </div>

              {/* Trending TV Shows - Level 2 */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  paddingLeft: '52px', 
                  paddingRight: '16px', 
                  paddingTop: '4px', 
                  paddingBottom: '4px',
                  minHeight: '28px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  margin: '2px 0',
                  backgroundColor: selectedId === 'trending-tv-shows' ? 'var(--tree-item-hover-bg, var(--secondary))' : 'transparent'
                }}
                onClick={() => handleSelect({ 
                  id: 'trending-tv-shows', 
                  label: 'Trending TV Shows', 
                  type: 'item', 
                  status: 'inactive', 
                  tag: 'RECOMMENDED' 
                })}
                onMouseEnter={(e) => {
                  if (selectedId !== 'trending-tv-shows') {
                    e.currentTarget.style.backgroundColor = 'var(--tree-item-hover-bg, var(--muted))';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedId !== 'trending-tv-shows') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--a11y-status-inactive)', borderRadius: '50%' }} />
                </div>
                <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
                  <Film size={14} />
                </div>
                <TruncatedLabel 
                  style={{ flex: 1, fontWeight: 400, letterSpacing: '0.15px' }}
                  maxLength={17}
                >
                  Trending TV Shows
                </TruncatedLabel>
                <div style={{ marginLeft: '16px', fontSize: '13px', fontFamily: 'var(--font-family-mono)', color: 'var(--a11y-rail-recommended)', textTransform: 'uppercase' }}>
                  RECOMMENDED
                </div>
              </div>

              {/* New & Trending - Level 2 */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  paddingLeft: '52px', 
                  paddingRight: '16px', 
                  paddingTop: '4px', 
                  paddingBottom: '4px',
                  minHeight: '28px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  margin: '2px 0',
                  backgroundColor: selectedId === 'new-trending' ? 'var(--tree-item-hover-bg, var(--secondary))' : 'transparent'
                }}
                onClick={() => handleSelect({ 
                  id: 'new-trending', 
                  label: 'New & Trending', 
                  type: 'item', 
                  status: 'active', 
                  tag: 'EDITORIAL' 
                })}
                onMouseEnter={(e) => {
                  if (selectedId !== 'new-trending') {
                    e.currentTarget.style.backgroundColor = 'var(--tree-item-hover-bg, var(--muted))';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedId !== 'new-trending') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--a11y-status-active)', borderRadius: '50%' }} />
                </div>
                <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
                  <Film size={14} />
                </div>
                <TruncatedLabel 
                  style={{ flex: 1, fontWeight: 400, letterSpacing: '0.15px' }}
                  maxLength={17}
                >
                  New & Trending
                </TruncatedLabel>
                <div style={{ marginLeft: '16px', fontSize: '13px', fontFamily: 'var(--font-family-mono)', color: 'var(--a11y-rail-editorial)', textTransform: 'uppercase' }}>
                  EDITORIAL
                </div>
              </div>
            </>
          )}

          {/* Popular Content - Level 1 */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              paddingLeft: '33px', 
              paddingRight: '16px', 
              paddingTop: '4px', 
              paddingBottom: '4px',
              minHeight: '28px',
              cursor: 'pointer',
              borderRadius: '4px',
              margin: '2px 0',
              backgroundColor: selectedId === 'popular-content' ? 'var(--tree-item-hover-bg, var(--secondary))' : 'transparent'
            }}
            onClick={() => {
              toggleExpanded('popular-content');
              handleSelect({ id: 'popular-content', label: 'Popular Content', type: 'subcategory', count: 2 });
            }}
            onMouseEnter={(e) => {
              if (selectedId !== 'popular-content') {
                e.currentTarget.style.backgroundColor = 'var(--tree-item-hover-bg, var(--muted))';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedId !== 'popular-content') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
              {isPopularExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
              <Layers size={14} />
            </div>
            <span style={{ fontWeight: 400, letterSpacing: '0.15px' }}>Popular Content</span>
            <span style={{ marginLeft: '8px', color: 'var(--muted-foreground)', fontWeight: 400 }}>(2)</span>
            <div style={{ flex: 1 }} />
          </div>

          {/* Children of Popular Content */}
          {isPopularExpanded && (
            <>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  paddingLeft: '52px', 
                  paddingRight: '16px', 
                  paddingTop: '4px', 
                  paddingBottom: '4px',
                  minHeight: '28px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  margin: '2px 0',
                  backgroundColor: selectedId === 'popular-worldwide' ? 'var(--tree-item-hover-bg, var(--secondary))' : 'transparent'
                }}
                onClick={() => handleSelect({ 
                  id: 'popular-worldwide', 
                  label: 'Popular Worldwide', 
                  type: 'item', 
                  status: 'active', 
                  tag: 'EDITORIAL' 
                })}
                onMouseEnter={(e) => {
                  if (selectedId !== 'popular-worldwide') {
                    e.currentTarget.style.backgroundColor = 'var(--tree-item-hover-bg, var(--muted))';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedId !== 'popular-worldwide') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--a11y-status-active)', borderRadius: '50%' }} />
                </div>
                <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
                  <Film size={14} />
                </div>
                <TruncatedLabel 
                  style={{ flex: 1, fontWeight: 400, letterSpacing: '0.15px' }}
                  maxLength={17}
                >
                  Popular Worldwide
                </TruncatedLabel>
                <div style={{ marginLeft: '16px', fontSize: '13px', fontFamily: 'var(--font-family-mono)', color: 'var(--a11y-rail-editorial)', textTransform: 'uppercase' }}>
                  EDITORIAL
                </div>
              </div>

              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  paddingLeft: '52px', 
                  paddingRight: '16px', 
                  paddingTop: '4px', 
                  paddingBottom: '4px',
                  minHeight: '28px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  margin: '2px 0',
                  backgroundColor: selectedId === 'popular-country' ? 'var(--tree-item-hover-bg, var(--secondary))' : 'transparent'
                }}
                onClick={() => handleSelect({ 
                  id: 'popular-country', 
                  label: 'Popular in Your Cou...', 
                  type: 'item', 
                  status: 'active', 
                  tag: 'EDITORIAL' 
                })}
                onMouseEnter={(e) => {
                  if (selectedId !== 'popular-country') {
                    e.currentTarget.style.backgroundColor = 'var(--tree-item-hover-bg, var(--muted))';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedId !== 'popular-country') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--a11y-status-active)', borderRadius: '50%' }} />
                </div>
                <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
                  <Film size={14} />
                </div>
                <TruncatedLabel 
                  style={{ flex: 1, fontWeight: 400, letterSpacing: '0.15px' }}
                  maxLength={17}
                >
                  Popular in Your Country
                </TruncatedLabel>
                <div style={{ marginLeft: '16px', fontSize: '13px', fontFamily: 'var(--font-family-mono)', color: 'var(--a11y-rail-editorial)', textTransform: 'uppercase' }}>
                  EDITORIAL
                </div>
              </div>
            </>
          )}

          {/* Continue Watching - Level 1 */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              paddingLeft: '33px', 
              paddingRight: '16px', 
              paddingTop: '4px', 
              paddingBottom: '4px',
              minHeight: '28px',
              cursor: 'pointer',
              borderRadius: '4px',
              margin: '2px 0',
              backgroundColor: selectedId === 'continue-watching' ? 'var(--tree-item-hover-bg, var(--secondary))' : 'transparent'
            }}
            onClick={() => {
              toggleExpanded('continue-watching');
              handleSelect({ id: 'continue-watching', label: 'Continue Watching', type: 'subcategory', count: 2 });
            }}
            onMouseEnter={(e) => {
              if (selectedId !== 'continue-watching') {
                e.currentTarget.style.backgroundColor = 'var(--tree-item-hover-bg, var(--muted))';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedId !== 'continue-watching') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
              {isContinueExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
              <Layers size={14} />
            </div>
            <span style={{ fontWeight: 400, letterSpacing: '0.15px' }}>Continue Watching</span>
            <span style={{ marginLeft: '8px', color: 'var(--muted-foreground)', fontWeight: 400 }}>(2)</span>
            <div style={{ flex: 1 }} />
          </div>

          {/* Children of Continue Watching */}
          {isContinueExpanded && (
            <>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  paddingLeft: '52px', 
                  paddingRight: '16px', 
                  paddingTop: '4px', 
                  paddingBottom: '4px',
                  minHeight: '28px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  margin: '2px 0',
                  backgroundColor: selectedId === 'continue-for-you' ? 'var(--tree-item-hover-bg, var(--secondary))' : 'transparent'
                }}
                onClick={() => handleSelect({ 
                  id: 'continue-for-you', 
                  label: 'Continue Watching F...', 
                  type: 'item', 
                  status: 'active', 
                  tag: 'RECOMMENDED' 
                })}
                onMouseEnter={(e) => {
                  if (selectedId !== 'continue-for-you') {
                    e.currentTarget.style.backgroundColor = 'var(--tree-item-hover-bg, var(--muted))';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedId !== 'continue-for-you') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--a11y-status-active)', borderRadius: '50%' }} />
                </div>
                <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
                  <Film size={14} />
                </div>
                <TruncatedLabel 
                  style={{ flex: 1, fontWeight: 400, letterSpacing: '0.15px' }}
                  maxLength={17}
                >
                  Continue Watching For You
                </TruncatedLabel>
                <div style={{ marginLeft: '16px', fontSize: '13px', fontFamily: 'var(--font-family-mono)', color: 'var(--a11y-rail-recommended)', textTransform: 'uppercase' }}>
                  RECOMMENDED
                </div>
              </div>

              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  paddingLeft: '52px', 
                  paddingRight: '16px', 
                  paddingTop: '4px', 
                  paddingBottom: '4px',
                  minHeight: '28px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  margin: '2px 0',
                  backgroundColor: selectedId === 'new-episodes' ? 'var(--tree-item-hover-bg, var(--secondary))' : 'transparent'
                }}
                onClick={() => handleSelect({ 
                  id: 'new-episodes', 
                  label: 'New Episodes', 
                  type: 'item', 
                  status: 'inactive', 
                  tag: 'EDITORIAL' 
                })}
                onMouseEnter={(e) => {
                  if (selectedId !== 'new-episodes') {
                    e.currentTarget.style.backgroundColor = 'var(--tree-item-hover-bg, var(--muted))';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedId !== 'new-episodes') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--a11y-status-inactive)', borderRadius: '50%' }} />
                </div>
                <div style={{ width: '14px', height: '14px', marginRight: '8px', color: 'var(--muted-foreground)' }}>
                  <Film size={14} />
                </div>
                <TruncatedLabel 
                  style={{ flex: 1, fontWeight: 400, letterSpacing: '0.15px' }}
                  maxLength={17}
                >
                  New Episodes
                </TruncatedLabel>
                <div style={{ marginLeft: '16px', fontSize: '13px', fontFamily: 'var(--font-family-mono)', color: 'var(--a11y-rail-editorial)', textTransform: 'uppercase' }}>
                  EDITORIAL
                </div>
              </div>
            </>
          )}
        </>
      )}
      </div>
    </TooltipProvider>
  );
}

export function TreeDocumentation() {
  const [selectedNavigationItem, setSelectedNavigationItem] = useState<TreeItem | null>(null);
  const [selectedTwoLevelItem, setSelectedTwoLevelItem] = useState<TreeItem | null>(null);

  // Data that matches the three-level hierarchy from the screenshot
  const navigationData: TreeItem[] = [
    {
      id: 'home',
      label: 'Home Page',
      type: 'category',
      count: 3,
      children: [
        {
          id: 'trending-now',
          label: 'Trending Now',
          type: 'subcategory',
          count: 3,
          children: [
            { id: 'trending-movies', label: 'Trending Movies', type: 'item', status: 'active', tag: 'RECOMMENDED' },
            { id: 'trending-tv-shows', label: 'Trending TV Shows', type: 'item', status: 'inactive', tag: 'RECOMMENDED' },
            { id: 'new-trending', label: 'New & Trending', type: 'item', status: 'active', tag: 'EDITORIAL' }
          ]
        },
        {
          id: 'popular-content',
          label: 'Popular Content',
          type: 'subcategory',
          count: 2,
          children: [
            { id: 'popular-worldwide', label: 'Popular Worldwide', type: 'item', status: 'active', tag: 'EDITORIAL' },
            { id: 'popular-country', label: 'Popular in Your Cou...', type: 'item', status: 'active', tag: 'EDITORIAL' }
          ]
        },
        {
          id: 'continue-watching',
          label: 'Continue Watching',
          type: 'subcategory',
          count: 2,
          children: [
            { id: 'continue-for-you', label: 'Continue Watching F...', type: 'item', status: 'active', tag: 'RECOMMENDED' },
            { id: 'new-episodes', label: 'New Episodes', type: 'item', status: 'inactive', tag: 'EDITORIAL' }
          ]
        }
      ]
    }
  ];

  const twoLevelData: TreeItem[] = [
    {
      id: 'content-categories',
      label: 'Content Categories',
      type: 'category',
      count: 4,
      children: [
        { id: 'action-movies', label: 'Action Movies', type: 'item', status: 'active', tag: 'RECOMMENDED' },
        { id: 'drama-series', label: 'Drama Series', type: 'item', status: 'active', tag: 'EDITORIAL' },
        { id: 'comedy-specials', label: 'Comedy Specials', type: 'item', status: 'inactive', tag: 'RECOMMENDED' },
        { id: 'documentaries', label: 'Documentaries', type: 'item', status: 'active', tag: 'EDITORIAL' }
      ]
    },
    {
      id: 'user-preferences',
      label: 'User Preferences',
      type: 'category',
      count: 3,
      children: [
        { id: 'watchlist', label: 'My Watchlist', type: 'item', status: 'active', tag: 'RECOMMENDED' },
        { id: 'recently-viewed', label: 'Recently Viewed', type: 'item', status: 'active', tag: 'EDITORIAL' },
        { id: 'favorites', label: 'Favorites', type: 'item', status: 'inactive', tag: 'RECOMMENDED' }
      ]
    }
  ];

  return (
    <div style={{ padding: '48px', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ marginBottom: '16px' }}>Tree</h1>
        <p style={{ 
          fontSize: 'var(--type-scale-l-size)',
          lineHeight: 'var(--type-scale-l-line-height)',
          color: 'var(--muted-foreground)',
          marginBottom: '24px'
        }}>
          A modular hierarchical navigation tree component system with separate TreeItem, TreeGroupHeader, TreeGroup, and TreeNode components. Features comprehensive design system tokens, status indicators, tooltips for truncated text, and tags. Perfect for media libraries, content organization, and navigation menus.
        </p>
        
        {/* Status badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          backgroundColor: 'var(--color-green-800)',
          color: 'var(--color-green-200)',
          borderRadius: '16px',
          fontSize: 'var(--type-scale-xs-regular-size)',
          fontWeight: 'var(--font-weight-medium)'
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            backgroundColor: 'var(--color-green-400)',
            borderRadius: '50%'
          }} />
          Stable
        </div>
      </div>

      {/* Live Example */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Examples</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          padding: '32px',
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px'
        }}>
          <div>
            <h4 style={{ marginBottom: '16px' }}>Three-Level Content Navigation</h4>
            <InteractiveTreeExample 
              onSelect={setSelectedNavigationItem}
              selectedId={selectedNavigationItem?.id}
            />
          </div>
          <div className="hide-in-light-theme">
            <h4 style={{ marginBottom: '16px' }}>Two-Level Content Navigation</h4>
            <Tree
              data={twoLevelData}
              onSelect={setSelectedTwoLevelItem}
              selectedId={selectedTwoLevelItem?.id}
              initialExpanded={['content-categories']}
            />
          </div>
        </div>
        
        <style>{`
          @media (prefers-color-scheme: light) {
            .hide-in-light-theme {
              display: none;
            }
          }
        `}</style>
        
        {(selectedNavigationItem || selectedTwoLevelItem) && (
          <div style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: 'var(--muted)',
            borderRadius: '6px',
            fontSize: 'var(--type-scale-s-size)',
            color: 'var(--muted-foreground)'
          }}>
            {selectedNavigationItem && (
              <>
                Selected from Navigation: <strong style={{ color: 'var(--foreground)' }}>{selectedNavigationItem.label}</strong>
                {selectedNavigationItem.tag && (
                  <span style={{ 
                    marginLeft: '8px',
                    color: selectedNavigationItem.tag === 'RECOMMENDED' ? 'var(--a11y-rail-recommended)' : 'var(--a11y-rail-editorial)'
                  }}>
                    ({selectedNavigationItem.tag})
                  </span>
                )}
                {selectedNavigationItem.status && (
                  <span style={{ 
                    marginLeft: '8px',
                    color: selectedNavigationItem.status === 'active' ? 'var(--a11y-status-active)' : 'var(--a11y-status-inactive)'
                  }}>
                    • {selectedNavigationItem.status}
                  </span>
                )}
              </>
            )}
            {selectedTwoLevelItem && (
              <>
                Selected from Two-Level: <strong style={{ color: 'var(--foreground)' }}>{selectedTwoLevelItem.label}</strong>
                {selectedTwoLevelItem.tag && (
                  <span style={{ 
                    marginLeft: '8px',
                    color: selectedTwoLevelItem.tag === 'RECOMMENDED' ? 'var(--a11y-rail-recommended)' : 'var(--a11y-rail-editorial)'
                  }}>
                    ({selectedTwoLevelItem.tag})
                  </span>
                )}
                {selectedTwoLevelItem.status && (
                  <span style={{ 
                    marginLeft: '8px',
                    color: selectedTwoLevelItem.status === 'active' ? 'var(--a11y-status-active)' : 'var(--a11y-status-inactive)'
                  }}>
                    • {selectedTwoLevelItem.status}
                  </span>
                )}
              </>
            )}
          </div>
        )}
      </section>

      {/* Features */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Features</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              title: 'Category Structure',
              description: 'Organized with stack icons for categories and document icons for items'
            },
            {
              title: 'Status Indicators',
              description: 'Visual status dots showing active (green) or inactive (gray) states'
            },
            {
              title: 'Content Tags',
              description: 'Right-aligned tags for RECOMMENDED and EDITORIAL content categorization'
            },
            {
              title: 'Item Counts',
              description: 'Display the number of items within each category with consistent styling (14px Inter, Gray-400)'
            },
            {
              title: 'Hierarchical Icon Sizing',
              description: 'Top-level icons are 16px, sub-level icons are 14px for visual hierarchy'
            },
            {
              title: 'Expandable Categories',
              description: 'Click category headers to expand or collapse child items'
            },
            {
              title: 'Tooltip Support',
              description: 'Hover over truncated text to see full content in tooltips'
            },
            {
              title: 'Dark Theme Optimized',
              description: 'Designed specifically for dark interfaces with proper contrast'
            }
          ].map((feature) => (
            <div key={feature.title} style={{
              padding: '20px',
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px'
            }}>
              <h4 style={{ marginBottom: '12px', color: 'var(--foreground)' }}>{feature.title}</h4>
              <p style={{ 
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--type-scale-s-line-height)'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Specifications */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Specifications</h2>
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--muted)' }}>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: 'var(--type-scale-s-size)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  borderBottom: '1px solid var(--border-default)'
                }}>
                  Property
                </th>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: 'var(--type-scale-s-size)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  borderBottom: '1px solid var(--border-default)'
                }}>
                  Value
                </th>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: 'var(--type-scale-s-size)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  borderBottom: '1px solid var(--border-default)'
                }}>
                  Token
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { property: 'Font size', value: '14px', token: 'Inter, sans-serif' },
                { property: 'Font family', value: 'Inter, sans-serif', token: 'Inter, sans-serif' },
                { property: 'Font weight', value: '400', token: 'Regular' },
                { property: 'Line height', value: '20px', token: '20px' },
                { property: 'Row height (min)', value: '28px', token: '--spacing * 7' },
                { property: 'Vertical padding', value: '4px', token: '--spacing * 1' },
                { property: 'Horizontal padding', value: '8px - 16px', token: '--spacing * 2-4' },
                { property: 'Level 0 padding', value: '8px', token: '--spacing * 2' },
                { property: 'Level 1 padding', value: '33px (8 + 25)', token: '--spacing * 8.25' },
                { property: 'Level 2 padding', value: '52px (8 + 22 + 22)', token: '--spacing * 13' },
                { property: 'Maximum levels', value: '3', token: 'Top > Sub > Items' },
                { property: 'Border radius', value: '6px', token: '--border-radius-md' },
                { property: 'Background color', value: '#19191b', token: '--card-bg' },
                { property: 'Text color', value: '#ffffff', token: '--foreground' },
                { property: 'Icon size (top level)', value: '16px', token: '--icon-size-md' },
                { property: 'Icon size (sub levels)', value: '14px', token: '--icon-size-sm' },
                { property: 'Icon color (top level)', value: '#ffffff', token: '--color-white' },
                { property: 'Icon color (sub levels)', value: '#bbbbbb', token: '--color-gray-400' },
                { property: 'Status dot size', value: '8px', token: '--spacing * 2' },
                { property: 'Active status color', value: '#3dc155', token: '--a11y-status-active' },
                { property: 'Inactive status color', value: '#a1a1a8', token: '--a11y-status-inactive' },
                { property: 'Recommended tag color', value: '#67b3fb', token: '--a11y-rail-recommended' },
                { property: 'Editorial tag color', value: '#c084fc', token: '--a11y-rail-editorial' },
                { property: 'Hover background', value: '#292a2e', token: '--muted' },
                { property: 'Selected background', value: '#292a2e', token: '--secondary' },
                { property: 'Transition duration', value: '0.2s', token: '--transition-duration' },
                { property: 'Count text color', value: '#bbb', token: '--color-gray-400' },
                { property: 'Count font size', value: '14px', token: 'Inter, sans-serif' },
                { property: 'Count font weight', value: '400', token: 'Regular' },
                { property: 'Tag font size', value: '13px (0.813rem)', token: 'Typescale S Regular' },
                { property: 'Tag font family', value: 'Inconsolata, monospace', token: 'Inconsolata' },
                { property: 'Tag font weight', value: '400 (normal)', token: 'Regular' },
                { property: 'Tag line height', value: '20px', token: '20px' },
                { property: 'Tag letter spacing', value: '+0.1px', token: '0.1px' },
                { property: 'Tooltip Background Color', value: '#292a2e', token: '--secondary' },
                { property: 'Tooltip Text Color', value: '#ffffff', token: '--foreground' },
                { property: 'Tooltip Font Family', value: 'Inter, sans-serif', token: '--font-family' },
                { property: 'Tooltip Font Size', value: '13px', token: '--type-scale-s-regular-size' },
                { property: 'Tooltip Font Weight', value: '400', token: '--type-scale-s-regular-weight' },
                { property: 'Tooltip Line Height', value: '20px', token: '--type-scale-s-regular-line-height' },
                { property: 'Tooltip Letter Spacing', value: '0.1px', token: '--type-scale-s-regular-letter-spacing' },
                { property: 'Tooltip Padding', value: '6px 12px', token: 'N/A' },
                { property: 'Tooltip Border Radius', value: '6px', token: '--radius' },
                { property: 'Tooltip Box Shadow', value: '0 2px 8px -1px rgba(0, 0, 0, 0.1), 0 1px 3px -1px rgba(0, 0, 0, 0.15)', token: 'N/A' },
                { property: 'Tooltip Z-Index', value: '9999', token: 'N/A' },
                { property: 'Tooltip Position', value: 'Fixed, calculated dynamically', token: 'N/A' },
                { property: 'Tooltip Gap from Text', value: '6px', token: 'N/A' },
                { property: 'Tooltip Trigger', value: 'Hover on truncated text with ellipsis', token: 'N/A' },
                { property: 'Tooltip Content', value: 'Full text when truncated', token: 'N/A' },
                { property: 'Tooltip Alignment', value: 'Vertically centered with truncated text', token: 'N/A' }
              ].map((row, index) => (
                <tr key={index}>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 'var(--type-scale-s-size)',
                    color: 'var(--foreground)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>
                    {row.property}
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 'var(--type-scale-s-size)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-family-mono)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>
                    {row.value}
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 'var(--type-scale-s-size)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-family-mono)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>
                    {row.token}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* API Reference */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>API Reference</h2>
        
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>Component Architecture</h3>
          <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: '16px', color: 'var(--muted-foreground)' }}>
            The Tree system is built with four main components for maximum modularity and customization:
          </p>
          <ul style={{ 
            fontSize: 'var(--type-scale-s-size)', 
            color: 'var(--muted-foreground)',
            marginBottom: '24px',
            paddingLeft: '20px'
          }}>
            <li style={{ marginBottom: '8px' }}><strong>Tree:</strong> Root container with design system tokens and state management</li>
            <li style={{ marginBottom: '8px' }}><strong>TreeNode:</strong> Smart wrapper that decides whether to render groups or items</li>
            <li style={{ marginBottom: '8px' }}><strong>TreeGroupHeader:</strong> Expandable headers with chevrons, icons, and counts</li>
            <li style={{ marginBottom: '8px' }}><strong>TreeItem:</strong> Individual leaf items with status dots and tags</li>
            <li><strong>TreeGroup:</strong> Container for organizing child nodes with proper nesting</li>
          </ul>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>TreeItem Interface</h3>
          <div style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--muted)' }}>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: 'var(--type-scale-s-size)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>
                    Property
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: 'var(--type-scale-s-size)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>
                    Type
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: 'var(--type-scale-s-size)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)',
                    borderBottom: '1px solid var(--border-default)'
                  }}>
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { prop: 'id', type: 'string', description: 'Unique identifier for the item' },
                  { prop: 'label', type: 'string', description: 'Display text for the item' },
                  { prop: 'children', type: 'TreeItem[]', description: 'Optional array of child items' },
                  { prop: 'type', type: '"category" | "subcategory" | "item"', description: 'Determines icon and behavior (category/subcategory = stack icon, item = document icon)' },
                  { prop: 'status', type: '"active" | "inactive"', description: 'Status indicator shown as colored dot (green/gray)' },
                  { prop: 'tag', type: '"RECOMMENDED" | "EDITORIAL"', description: 'Right-aligned tag with specific color coding' },
                  { prop: 'count', type: 'number', description: 'Number of items in category (shown in parentheses)' }
                ].map((row, index) => (
                  <tr key={index}>
                    <td style={{
                      padding: '12px 16px',
                      fontSize: 'var(--type-scale-s-size)',
                      color: 'var(--foreground)',
                      borderBottom: '1px solid var(--border-default)',
                      fontFamily: 'var(--font-family-mono)'
                    }}>
                      {row.prop}
                    </td>
                    <td style={{
                      padding: '12px 16px',
                      fontSize: 'var(--type-scale-s-size)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-family-mono)',
                      borderBottom: '1px solid var(--border-default)'
                    }}>
                      {row.type}
                    </td>
                    <td style={{
                      padding: '12px 16px',
                      fontSize: 'var(--type-scale-s-size)',
                      color: 'var(--muted-foreground)',
                      borderBottom: '1px solid var(--border-default)'
                    }}>
                      {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Design Specifications */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Design Specifications</h2>
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          padding: '24px'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ marginBottom: '16px' }}>Visual Elements</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: '8px' }}>
                  <strong>Categories/Subcategories:</strong> Stack icon + chevron indicator + item count
                </p>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: '8px' }}>
                  <strong>Items:</strong> Status dot + document icon + optional tag
                </p>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: '8px' }}>
                  <strong>Typography:</strong> 14px Inter, Regular (400), 20px line height
                </p>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: '8px' }}>
                  <strong>Count Labels:</strong> 14px Inter, Regular (400), #bbb color
                </p>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: '8px' }}>
                  <strong>Icons:</strong> 16px (foreground) for top level, 14px (muted-foreground) for sub-levels
                </p>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: '8px' }}>
                  <strong>Tags:</strong> 13px Inconsolata, Regular (400), 20px line height, +0.1px letter spacing, uppercase
                </p>
                <p style={{ fontSize: 'var(--type-scale-s-size)' }}>
                  <strong>Spacing:</strong> Level 0: 8px, Level 1: 33px, Level 2: 52px padding
                </p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: '8px' }}>
                  <strong>Active Status:</strong> Green dot (a11y-status-active)
                </p>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: '8px' }}>
                  <strong>Inactive Status:</strong> Gray dot (a11y-status-inactive)
                </p>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: '8px' }}>
                  <strong>Recommended Tag:</strong> Blue text (a11y-rail-recommended), 13px Inconsolata Regular
                </p>
                <p style={{ fontSize: 'var(--type-scale-s-size)', marginBottom: '8px' }}>
                  <strong>Editorial Tag:</strong> Purple text (a11y-rail-editorial), 13px Inconsolata Regular
                </p>
                <p style={{ fontSize: 'var(--type-scale-s-size)' }}>
                  <strong>Tooltips:</strong> 13px Inter Regular, tooltip-bg background, 6px gap from text
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px' }}>Interaction States</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              Categories can be expanded/collapsed by clicking anywhere on the row. Items can be selected for navigation. Hover states provide subtle background color changes for better usability. Truncated text displays tooltips on hover to show the full content.
            </p>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px' }}>Usage Guidelines</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}>
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--color-green-800)',
            borderRadius: '8px'
          }}>
            <h4 style={{ 
              color: 'var(--color-green-400)', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                width: '16px',
                height: '16px',
                backgroundColor: 'var(--color-green-600)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: 'white'
              }}>✓</span>
              Best Practices
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              margin: 0,
              color: 'var(--foreground)'
            }}>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Use for content libraries and media organization
              </li>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Apply consistent status indicators across categories
              </li>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Use tags sparingly for important categorization
              </li>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Implement tooltips for truncated text to maintain readability
              </li>
              <li style={{ fontSize: 'var(--type-scale-s-size)' }}>
                • Keep category labels concise and descriptive
              </li>
            </ul>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--color-red-700)',
            borderRadius: '8px'
          }}>
            <h4 style={{ 
              color: 'var(--color-red-400)', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                width: '16px',
                height: '16px',
                backgroundColor: 'var(--color-red-600)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: 'white'
              }}>✕</span>
              Avoid
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              margin: 0,
              color: 'var(--foreground)'
            }}>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Overusing tags - they should indicate importance
              </li>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Creating too many nesting levels (3 levels as shown in examples)
              </li>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Mixing different status systems within the same tree
              </li>
              <li style={{ marginBottom: '8px', fontSize: 'var(--type-scale-s-size)' }}>
                • Truncating text without providing tooltip alternatives
              </li>
              <li style={{ fontSize: 'var(--type-scale-s-size)' }}>
                • Using unclear or overly technical category names
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 style={{ marginBottom: '24px' }}>Accessibility</h2>
        <div style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          padding: '24px'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '12px' }}>Keyboard Navigation</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--type-scale-s-line-height)',
              marginBottom: '8px'
            }}>
              Tree items can be navigated using arrow keys and activated with Space or Enter. Categories can be expanded/collapsed with the right/left arrow keys respectively.
            </p>
            <ul style={{
              fontSize: 'var(--type-scale-s-size)',
              color: 'var(--muted-foreground)',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li>↑/↓ arrows: Navigate between items</li>
              <li>→ arrow: Expand category</li>
              <li>← arrow: Collapse category</li>
              <li>Space/Enter: Select item or toggle category</li>
              <li>Tab: Move to next focusable element</li>
            </ul>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '12px' }}>Screen Reader Support</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              Tree structure is properly announced with ARIA roles (tree, treeitem, group). Expansion states, item counts, and status information are communicated to assistive technologies. Tooltips provide additional context for truncated content.
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '12px' }}>Visual Indicators</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              Status is conveyed through multiple visual cues: colored dots for active/inactive states, distinct icons for categories vs. items, and color-coded tags for content classification. Tooltips ensure no information is lost due to text truncation.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '12px' }}>Color Accessibility</h4>
            <p style={{ 
              fontSize: 'var(--type-scale-s-size)', 
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--type-scale-s-line-height)'
            }}>
              All color combinations meet WCAG 2.1 AA contrast requirements. Status information is not conveyed by color alone - icons and positioning provide additional context for users with color vision deficiencies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}