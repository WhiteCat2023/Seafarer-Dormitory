import React, { useEffect, useState } from 'react';

const AutoCarousel = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const length = items.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [length]);

    return (
        <Carousel
            className="sm:rounded-xl"
            navigation={({ setActiveIndex }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                            }`}
                            onClick={() => {
                                setActiveIndex(i);
                                setActiveIndex(i); // Update active index
                            }}
                        />
                    ))}
                </div>
            )}
        >
            {items.map((item, index) => (
                <img
                    key={index}
                    src={item}
                    className="h-full w-full object-cover"
                    style={{ display: activeIndex === index ? 'block' : 'none' }} // Show only the active image
                />
            ))}
        </Carousel>
    );
};

export default AutoCarousel;