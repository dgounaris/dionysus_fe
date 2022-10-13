import {TrackDetails, TrackSection} from "./TrackDetails";

export type PreviewPlan = {
    tracks: TrackDetails[]
    selections: TrackSelection[]
}

export type TrackSelection = {
    id: string
    name: string,
    sections: TrackSection[]
}