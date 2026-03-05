import { useRef, useEffect, useState } from 'react';

const VideoBackground = ({ videoSrc, className = "" }) => {
    const videoRef = useRef(null);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8; // Optional: slow down slightly for better ambiance
            videoRef.current.play().catch(error => {
                console.error("Video play failed:", error);
                // Autoplay might be blocked if not muted properly or user interaction required
            });
        }
    }, [videoSrc]);

    return (
        <div className={`absolute inset-0 w-full h-full overflow-hidden bg-black z-0 pointer-events-none ${className}`} style={{ willChange: 'auto' }}>
            {!videoError ? (
                <video
                    ref={videoRef}
                    className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
                    autoPlay
                    loop
                    muted={true}
                    playsInline
                    crossOrigin="anonymous"
                    onError={(e) => {
                        console.error("Video error:", e);
                        setVideoError(true);
                    }}
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                /* Fallback if video fails */
                <div className="absolute inset-0 bg-neutral-900" />
            )}

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        </div>
    );
};

export default VideoBackground;
