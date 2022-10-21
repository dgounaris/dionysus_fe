export type PlaybackStartRequest = {
    playbackDetails: PlaybackDetails
}

export type PlaybackDetails = {
    selectedDeviceId: string,
    selectedDeviceType: string,
    selectedDeviceVolumePercent: number,
    fadeDetails: FadeDetails
}

export type FadeDetails = {
    fadeMilliseconds: number,
    volumeChangeIntervalMilliseconds: number,
    volumeTotalReduction: number
}