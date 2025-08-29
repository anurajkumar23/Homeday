"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import servicesData from "@/data/services.json";

interface BannerItem {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  active?: boolean;
  backgroundColor?: string;
  textColor?: string;
  buttonText?: string;
  buttonLink?: string;
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

  // Touch states for mobile swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const effectiveBanners: BannerItem[] = useMemo(() => {
    const source = Array.isArray(banners) && banners.length > 0
      ? banners
      : ((servicesData as unknown as { banners?: BannerItem[] })?.banners ?? []);
    const actives = source.filter((b) => b.active !== false);
    return actives.length > 0 ? actives : source;
  }, [banners]);

  const totalBanners = effectiveBanners.length;

  // Progress bar animation - exactly like the Intel banner
  useEffect(() => {
    if (!autoPlay || totalBanners <= 1 || isHovered || isTransitioning) {
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
    }, 16); // 60fps for smooth animation

    return () => clearInterval(progressInterval);
  }, [currentSlide, autoPlay, autoPlayInterval, totalBanners, isHovered, isTransitioning]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || totalBanners <= 1 || isHovered || isTransitioning) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalBanners);
      setProgress(0);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, totalBanners, isHovered, isTransitioning]);

  // Slide navigation
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;

    setIsTransitioning(true);
    setProgress(0);
    setCurrentSlide(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [currentSlide, isTransitioning]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && totalBanners > 1) {
      goToSlide((currentSlide + 1) % totalBanners);
    } else if (isRightSwipe && totalBanners > 1) {
      goToSlide((currentSlide - 1 + totalBanners) % totalBanners);
    }
  };

  const handleButtonClick = useCallback(() => {
    const currentBanner = effectiveBanners[currentSlide];
    if (currentBanner?.buttonLink) {
      window.open(currentBanner.buttonLink, '_blank');
    }
  }, [effectiveBanners, currentSlide]);

  if (totalBanners === 0) return null;

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 mt-4 md:mt-6 lg:mt-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Main Banner Card with Intel-style sliding */}
        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full">

            {/* SLIDING CONTENT CONTAINER - Like Intel banner */}
            <div
              className="flex h-full w-full transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {effectiveBanners.map((banner, index) => (
                <div
                  key={banner.id}
                  className="relative min-w-full h-full items-center"
                >
                  {/* Right Side - Image */}
                  <div className= "h-full w-full ">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      quality={90}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots and Progress Bar - Intel Style */}
        {totalBanners > 1 && (
          <div className="flex justify-center mt-6 space-x-3">
            {effectiveBanners.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`
          relative transition-all duration-300 ease-out
          hover:scale-125 active:scale-90 rounded-full overflow-hidden
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
                        width: autoPlay && !isHovered ? `${progress}%` : '100%',
                        transition: autoPlay && !isHovered ? 'width 0.1s linear' : 'width 0.3s ease',
                      }}
                    />
                  </>
                ) : null}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
