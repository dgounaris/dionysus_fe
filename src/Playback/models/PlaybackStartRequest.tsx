export type PlaybackStartRequest = {
    playbackDetails: PlaybackDetails
}

export type PlaybackDetails = {
    selectedDeviceId: string,
    selectedDeviceType: string,
    selectedDeviceVolumePercent: number
}