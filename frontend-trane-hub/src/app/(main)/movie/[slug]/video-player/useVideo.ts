import { useCallback, useEffect, useRef, useState } from 'react';
import { IVideoElement } from './video.interface';

export const useVideo = () => {
    const videoRef = useRef<IVideoElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoTime, setVideoTime] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (videoRef.current?.duration) {
            setVideoTime(videoRef.current.duration);
        }
    }, [videoRef.current?.duration]);

    const toggleVideo = () => {
        if (isPlaying) {
            videoRef.current?.pause();
        } else {
            videoRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const fastForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10;
        }
    };

    const rewind = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 10;
        }
    };

    const fullscreen = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const updateProgress = () => {
            setCurrentTime(video.currentTime);
            setProgress((video.currentTime / videoTime) * 100);
        };

        video.addEventListener('timeupdate', updateProgress);

        return () => {
            video.removeEventListener('timeupdate', updateProgress);
        };
    }, [videoTime]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowRight':
                    fastForward();
                    break;
                case 'ArrowLeft':
                    rewind();
                    break;
                case 'p': {
                    e.preventDefault();
                    toggleVideo();
                    break;
                }

                case 'f': {
                    fullscreen();
                    break;
                }

                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [toggleVideo]);

    return {
        videoRef,
        actions: {
            fullscreen,
            rewind,
            fastForward,
            toggleVideo,
        },
        video: {
            isPlaying,
            currentTime,
            videoTime,
            progress,
        },
    };
};
