import { useCallback, useEffect, useRef, useState } from 'react';
import { IVideoElement } from './video.interface';

interface IContainerRef extends HTMLDivElement {
    mozRequestFullScreen?: () => void;
    webkitRequestFullscreen?: () => void;
    msRequestFullscreen?: () => void;
}

export const useVideo = () => {
    const videoRef = useRef<IVideoElement>(null);
    const containerRef = useRef<IContainerRef>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoTime, setVideoTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

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

    const toggleFullscreen = () => {
        const container = containerRef.current;
        if (!container) return;

        if (!isFullscreen) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).mozCancelFullScreen) {
                (document as any).mozCancelFullScreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(
                Boolean(
                    document.fullscreenElement ||
                        (document as any).mozFullScreenElement ||
                        (document as any).webkitFullscreenElement ||
                        (document as any).msFullscreenElement
                )
            );
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener(
            'mozfullscreenchange',
            handleFullscreenChange
        );
        document.addEventListener(
            'webkitfullscreenchange',
            handleFullscreenChange
        );
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange
            );
            document.removeEventListener(
                'mozfullscreenchange',
                handleFullscreenChange
            );
            document.removeEventListener(
                'webkitfullscreenchange',
                handleFullscreenChange
            );
            document.removeEventListener(
                'MSFullscreenChange',
                handleFullscreenChange
            );
        };
    }, []);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setVolume(value);
        if (videoRef.current) {
            videoRef.current.volume = value / 100;
            setIsMuted(value === 0);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            const newMuted = !isMuted;
            videoRef.current.muted = newMuted;
            setIsMuted(newMuted);
            if (!newMuted && volume === 0) {
                setVolume(50);
                videoRef.current.volume = 0.5;
            }
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const progressBar = e.currentTarget;
        const clickPosition = e.nativeEvent.offsetX;
        const progressBarWidth = progressBar.clientWidth;
        const seekTime = (clickPosition / progressBarWidth) * videoTime;

        if (videoRef.current) {
            videoRef.current.currentTime = seekTime;
            setProgress((seekTime / videoTime) * 100);
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
                    toggleFullscreen();
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
        containerRef,
        actions: {
            toggleFullscreen,
            rewind,
            fastForward,
            toggleVideo,
            handleVolumeChange,
            toggleMute,
            handleSeek,
        },
        video: {
            isPlaying,
            currentTime,
            videoTime,
            progress,
            volume,
            isMuted,
            isFullscreen,
        },
    };
};
