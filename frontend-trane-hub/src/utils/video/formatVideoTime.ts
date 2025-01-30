export const formatVideoTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const addZero = (num: number) => (num < 10 ? `0${num}` : num);

    if (hours > 0) {
        return `${hours}:${addZero(minutes)}:${addZero(remainingSeconds)}`;
    }

    return `${minutes}:${addZero(remainingSeconds)}`;
};
