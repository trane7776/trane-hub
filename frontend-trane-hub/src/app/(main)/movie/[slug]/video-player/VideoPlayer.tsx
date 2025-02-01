import React from 'react';
import { IVideoPlayer } from './video.interface';
import { useVideo } from './useVideo';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';
import styles from './VideoPlayer.module.scss';
import { Loader } from '@/components/ui/Loader';
import {
    MdFullscreen,
    MdHistory,
    MdPause,
    MdPlayArrow,
    MdUpdate,
    MdVolumeUp,
    MdVolumeOff,
} from 'react-icons/md';
import { formatVideoTime } from '@/utils/video/formatVideoTime';
import { PremiumPlaceholder } from './premium-placeholder/PremiumPlaceholder';

interface Props extends IVideoPlayer {
    className?: string;
}

export const VideoPlayer: React.FC<Props> = ({ className, videoSource }) => {
    const { actions, video, videoRef, containerRef } = useVideo();

    const { user, isLoading } = useProfile();

    return (
        <div className={cn(className, styles.wrapper)}>
            {isLoading ? (
                <div className={styles.loading}>
                    <Loader />
                </div>
            ) : (
                <div ref={containerRef} className={styles.video_container}>
                    <video
                        ref={videoRef}
                        className={styles.video}
                        src={`${videoSource}#t=0.1`}
                        preload="metadata"
                    />
                    <div
                        className={styles.video_overlay}
                        onClick={actions.toggleVideo}
                    />
                    <div
                        className={styles.progress_bar_container}
                        onClick={actions.handleSeek}
                    >
                        <div
                            className={styles.progress_bar}
                            style={{ width: `${video.progress}%` }}
                        />
                    </div>

                    <div className={styles.controls}>
                        <div>
                            <button onClick={actions.rewind}>
                                <MdHistory />
                            </button>
                            <button
                                className={styles.play_button}
                                onClick={actions.toggleVideo}
                            >
                                {video.isPlaying ? (
                                    <MdPause />
                                ) : (
                                    <MdPlayArrow />
                                )}
                            </button>

                            <button onClick={actions.fastForward}>
                                <MdUpdate />
                            </button>

                            <div className={styles.volume_controls}>
                                <button onClick={actions.toggleMute}>
                                    {video.isMuted ? (
                                        <MdVolumeOff />
                                    ) : (
                                        <MdVolumeUp />
                                    )}
                                </button>
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={video.volume}
                                    onChange={actions.handleVolumeChange}
                                    className={styles.volume_slider}
                                />
                            </div>

                            <div className={styles.time_controls}>
                                <p className={styles.controls_time}>
                                    {formatVideoTime(video.currentTime)}
                                </p>
                                <p> / </p>
                                <p className={styles.controls_time}>
                                    {formatVideoTime(video.videoTime)}
                                </p>
                            </div>
                        </div>
                        <div>
                            <button onClick={actions.toggleFullscreen}>
                                <MdFullscreen />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
