"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import servicesData from "@/data/services.json";

interface BannerItem {
  id: number;
  image: string;
  active?: boolean;
}

interface ServiceBannerProps {
  banners?: BannerItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ServiceBanner({
  banners,
  autoPlay = true,
  autoPlayInterval = 4000,
}: ServiceBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  // Enhanced touch states for mobile swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const effectiveBanners: BannerItem[] = useMemo(() => {
    const source = Array.isArray(banners) && banners.length > 0
      ? banners
      : ((servicesData as unknown as { banners?: BannerItem[] })?.banners ?? []);
    const actives = source.filter((b) => b.active !== false);
    return actives.length > 0 ? actives : source;
  }, [banners]);

  const totalBanners = effectiveBanners.length;

  // Calculate transform value - fix for last slide
  const getTransformValue = useCallback(() => {
    if (totalBanners <= 1) return 0;
    
    // For the last slide, adjust to show it fully
    if (currentSlide === totalBanners - 1) {
      return `translateX(calc(-${currentSlide * 85}% + ${15}%))`;
    }
    
    // Normal slides with 85% movement to show next slide preview
    return `translateX(-${currentSlide * 85}%)`;
  }, [currentSlide, totalBanners]);

  // Progress bar animation
  useEffect(() => {
    if (!autoPlay || totalBanners <= 1 || isHovered || isTransitioning || isDragging) {
      return;
    }

    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressPercent = (elapsed / autoPlayInterval) * 100;

      if (progressPercent >= 100) {
        setProgress(100);
        clearInterval(progressInterval);
      } else {
        setProgress(progressPercent);
      }
    }, 16);

    return () => clearInterval(progressInterval);
  }, [currentSlide, autoPlay, autoPlayInterval, totalBanners, isHovered, isTransitioning, isDragging]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || totalBanners <= 1 || isHovered || isTransitioning || isDragging) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalBanners);
      setProgress(0);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, totalBanners, isHovered, isTransitioning, isDragging]);

  // Slide navigation
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;

    setIsTransitioning(true);
    setProgress(0);
    setCurrentSlide(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [currentSlide, isTransitioning]);

  // Enhanced touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 20; // Very sensitive threshold
    const isRightSwipe = distance < -20;

    if (isLeftSwipe && totalBanners > 1) {
      goToSlide((currentSlide + 1) % totalBanners);
    } else if (isRightSwipe && totalBanners > 1) {
      goToSlide((currentSlide - 1 + totalBanners) % totalBanners);
    }

    setIsDragging(false);
  };

  // Mouse drag functionality for desktop
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [mouseEnd, setMouseEnd] = useState<number | null>(null);
  const [isMouseDragging, setIsMouseDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseEnd(null);
    setMouseStart(e.clientX);
    setIsMouseDragging(true);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDragging) return;
    setMouseEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!mouseStart || !mouseEnd) {
      setIsMouseDragging(false);
      setIsDragging(false);
      return;
    }

    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > 30;
    const isRightSwipe = distance < -30;

    if (isLeftSwipe && totalBanners > 1) {
      goToSlide((currentSlide + 1) % totalBanners);
    } else if (isRightSwipe && totalBanners > 1) {
      goToSlide((currentSlide - 1 + totalBanners) % totalBanners);
    }

    setIsMouseDragging(false);
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsMouseDragging(false);
    setIsDragging(false);
    setIsHovered(false);
  };

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (totalBanners <= 1) return;
    
    if (e.key === 'ArrowLeft') {
      goToSlide((currentSlide - 1 + totalBanners) % totalBanners);
    } else if (e.key === 'ArrowRight') {
      goToSlide((currentSlide + 1) % totalBanners);
    }
  }, [currentSlide, totalBanners, goToSlide]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (totalBanners === 0) return null;

  return (
    <div className="w-full">
      {/* Main Slider Container */}
      <div
        className="relative overflow-hidden pl-4 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Sliding Container */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: getTransformValue(),
            transitionDuration: isDragging ? '0ms' : '500ms',
          }}
        >
          {effectiveBanners.map((banner, index) => (
            <div
              key={banner.id}
              className="flex-shrink-0"
              style={{ 
                width: '85%',
                paddingRight: index === effectiveBanners.length - 1 ? '16px' : '8px'
              }}
            >
              {/* Image Container */}
              <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src={banner.image}
                  alt={`Service banner ${index + 1}`}
                  fill
                  className="object-cover pointer-events-none"
                  priority={index === 0}
                  quality={90}
                  draggable={false}
                />
                
                {/* Slide number indicator */}
                <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {index + 1}/{totalBanners}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Touch/Swipe instruction overlay (optional) */}
        {totalBanners > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full opacity-50 pointer-events-none">
            Swipe to navigate
          </div>
        )}
      </div>

      {/* Dots Indicator */}
      {totalBanners > 1 && (
        <div className="flex justify-center mt-6 space-x-3 px-4">
          {effectiveBanners.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`
                relative transition-all duration-300 ease-out
                hover:scale-125 active:scale-90 rounded-full overflow-hidden
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                ${index === currentSlide
                  ? 'w-8 h-2'
                  : 'w-2 h-2 bg-gray-400 hover:bg-gray-600'
                }
              `}
            >
              {/* Active dot with progress animation */}
              {index === currentSlide ? (
                <>
                  {/* Background */}
                  <div className="absolute inset-0 bg-gray-400 rounded-full" />

                  {/* Progress fill */}
                  <div
                    className="absolute inset-0 bg-gray-700 rounded-full transition-all ease-linear"
                    style={{
                      width: autoPlay && !isHovered && !isDragging ? `${progress}%` : '100%',
                      transition: autoPlay && !isHovered && !isDragging ? 'width 0.1s linear' : 'width 0.3s ease',
                    }}
                  />
                </>
              ) : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
