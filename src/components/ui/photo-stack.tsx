import * as React from "react";
import { cn } from "@/lib/utils";
import { Linkedin, Github, Twitter, Sparkles } from "lucide-react";

export interface PhotoStackItem {
  src: string;
  name: string;
  role?: string;
  bio?: string;
  skills?: string[];
  social?: { linkedin?: string; github?: string; twitter?: string };
}

export interface InteractivePhotoStackProps {
  items: PhotoStackItem[];
  title: React.ReactNode;
  className?: string;
  onSelectMember?: (item: PhotoStackItem) => void;
}

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateNonOverlappingTransforms = (items: PhotoStackItem[]) => {
  const positions: { x: number; y: number; r: number }[] = [];
  const displayedItems = items.slice(0, 5);

  const cardWidthVW = 22;
  const cardHeightVH = 35;
  const maxRetries = 100;

  displayedItems.forEach(() => {
    let newPos;
    let collision;
    let retries = 0;

    do {
      collision = false;
      const x = random(-35, 35);
      const y = random(-20, 20);
      const r = random(-20, 20);
      newPos = { x, y, r };

      for (const pos of positions) {
        const dx = Math.abs(newPos.x - pos.x);
        const dy = Math.abs(newPos.y - pos.y);
        if (dx < cardWidthVW && dy < cardHeightVH) {
          collision = true;
          break;
        }
      }
      retries++;
    } while (collision && retries < maxRetries);

    positions.push(newPos);
  });

  return positions.map(pos => `translate(${pos.x}vw, ${pos.y}vh) rotate(${pos.r}deg)`);
};

const InteractivePhotoStack = React.forwardRef<
  HTMLDivElement,
  InteractivePhotoStackProps
>(({ items, title, className, onSelectMember, ...props }, ref) => {
  const [topCardIndex, setTopCardIndex] = React.useState(0);
  const [isGroupHovered, setIsGroupHovered] = React.useState(false);
  const [clickedIndex, setClickedIndex] = React.useState<number | null>(null);
  const [spreadTransforms, setSpreadTransforms] = React.useState<string[]>([]);

  const displayedItems = items.slice(0, 5);
  const baseRotations = ["rotate-2", "-rotate-2", "rotate-4", "-rotate-4", "rotate-6"];

  const handleMouseEnter = () => {
    const newTransforms = generateNonOverlappingTransforms(items);
    setSpreadTransforms(newTransforms);
    setIsGroupHovered(true);
  };

  const handleCardClick = (index: number) => {
    if (onSelectMember) {
      onSelectMember(displayedItems[index]);
    }

    if (isGroupHovered) {
      setClickedIndex(index);
      setTimeout(() => {
        setIsGroupHovered(false);
        setTopCardIndex(index);
        setClickedIndex(null);
      }, 700);
    } else {
      setTopCardIndex(index);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-12 relative",
        className,
      )}
      {...props}
    >
      <div
        className="relative h-96 w-full max-w-4xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => !clickedIndex && setIsGroupHovered(false)}
      >
        <div className="relative left-1/2 top-1/2 h-80 w-64 -translate-x-1/2 -translate-y-1/2">
          {displayedItems.map((item, index) => {
            const isTopCard = index === topCardIndex;
            const numItems = displayedItems.length;
            let stackPosition = index - topCardIndex;
            if (stackPosition < 0) stackPosition += numItems;
            const isClicked = index === clickedIndex;

            const transform = isGroupHovered
              ? spreadTransforms[index] || `translateY(0) rotate(0)`
              : `translateY(${stackPosition * 0.5}rem) scale(${1 - stackPosition * 0.05})`;

            return (
              <div
                key={item.name + index}
                onClick={() => handleCardClick(index)}
                className={cn(
                  "absolute inset-0 h-80 w-64 cursor-pointer rounded-lg bg-white p-2.5 border border-[#0B0D12]/15 shadow-md transition-all duration-500 ease-in-out group/card overflow-hidden",
                  {
                    "rotate-0": isGroupHovered,
                    [baseRotations[stackPosition]]: !isGroupHovered && !isTopCard,
                    "hover:scale-105 hover:shadow-xl hover:border-[#FF4A1C]": isGroupHovered && !isClicked,
                    "animate-spin-y": isClicked,
                  }
                )}
                style={{
                  transform: transform,
                  zIndex: isClicked ? 200 : isGroupHovered ? 100 : isTopCard ? numItems : numItems - stackPosition,
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-between">
                  {/* Photo Container with Hover Details Overlay */}
                  <div className="h-62 w-full overflow-hidden rounded relative group/img">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="h-full w-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />

                    {/* Role Badge (visible when not hovered or as overlay header) */}
                    {item.role && (
                      <div className="absolute top-2 left-2 right-2 z-10">
                        <span className="px-2.5 py-1 rounded bg-[#0B0D12]/90 text-white text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md inline-block shadow-sm">
                          {item.role}
                        </span>
                      </div>
                    )}

                    {/* Hover Info Overlay */}
                    <div className="absolute inset-0 bg-[#0B0D12]/95 opacity-0 group-hover/card:opacity-100 transition-all duration-300 p-3.5 flex flex-col justify-end text-white backdrop-blur-[2px]">
                      <div className="space-y-2 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                        
                        <h4 className="font-bold text-base leading-tight text-white flex items-center justify-between">
                          <span>{item.name}</span>
                          <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C] shrink-0" />
                        </h4>

                        {item.role && (
                          <p className="text-[10px] font-mono font-semibold text-[#FF4A1C] uppercase tracking-widest">
                            {item.role}
                          </p>
                        )}

                        {item.bio && (
                          <p className="text-[11px] text-[#FAF8F5]/80 line-clamp-3 leading-relaxed font-sans">
                            {item.bio}
                          </p>
                        )}

                        {item.skills && item.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {item.skills.slice(0, 3).map((s, i) => (
                              <span key={i} className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/10">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.social && (
                          <div className="flex items-center gap-2 pt-1.5 text-white/70">
                            {item.social.linkedin && <Linkedin className="w-3.5 h-3.5 hover:text-[#FF4A1C]" />}
                            {item.social.github && <Github className="w-3.5 h-3.5 hover:text-[#FF4A1C]" />}
                            {item.social.twitter && <Twitter className="w-3.5 h-3.5 hover:text-[#FF4A1C]" />}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Bar */}
                  <div className="flex h-12 flex-grow items-center justify-center text-center px-1">
                    <p className="font-bold text-base text-[#0B0D12] tracking-tight group-hover/card:text-[#FF4A1C] transition-colors">
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h3 className="text-center text-h3 text-[#0B0D12]">
          {title}
        </h3>
        <p className="text-xs font-mono text-[#0B0D12]/60 uppercase tracking-widest font-medium">
          Hover over photo stack to scatter &amp; reveal member details
        </p>
      </div>
    </div>
  );
});

InteractivePhotoStack.displayName = "InteractivePhotoStack";

export { InteractivePhotoStack };
