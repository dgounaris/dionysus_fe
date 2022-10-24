export type PlaybackUpdateResponse = {
    playbackState: PlaybackState
}

export enum PlaybackState {
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
    STOPPED = 'STOPPED'
}