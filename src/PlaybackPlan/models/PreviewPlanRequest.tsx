import {OrderSelectionStrategy} from "./OrderSelectionStrategy";

export type PreviewPlanRequest = {
    tracks: Track[],
    selectionOptions: SelectionOptions
}

export type Track = {
    id: string,
    name: string
}

export type SelectionOptions = {
    minimumSelectionDuration: number,
    maximumSelectionDuration: number,
    orderSelectionStrategy: OrderSelectionStrategy
}