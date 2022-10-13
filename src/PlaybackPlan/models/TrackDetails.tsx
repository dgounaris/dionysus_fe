export type TrackDetails = {
    id: string,
    name: string,
    sections: TrackSection[],
    features: TrackAudioFeatures
}

export type TrackAudioFeatures = {
    acousticness: number,
    danceability: number,
    energy: number,
    instrumentalness: number,
    key: number,
    liveness: number,
    loudness: number,
    speechiness: number,
    tempo: number,
    timeSignature: number,
    valence: number
}

export type TrackSection = {
    start: number,
    duration: number,
    end: number,
    confidence: number,
    loudness: number,
    tempo: number,
    key: number,
    mode: number,
    timeSignature: number
}

export const TrackSectionEquals = (that: TrackSection, other: TrackSection) => {
    return that.start === other.start &&
        that.end === other.end
}