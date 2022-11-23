import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {backendClient} from "../../common/clients/http/BackendClient";
import {PlaybackState, PlaybackStatusResponse} from "../models/PlaybackState";
import {useAuth} from "../../Auth/hooks/AuthHooks";

type PlaybackStateContextType = {
    playbackState: PlaybackState,
    setPlaybackState: (playbackState: PlaybackState) => void
}
const PlaybackStateContext = createContext<PlaybackStateContextType | null>(null);

export const PlaybackStateProvider = ({children}) => {
    const auth = useAuth()

    const [playbackState, setPlaybackState] = useState<PlaybackState>(PlaybackState.STOPPED)

    const refreshPlaybackState = () => {
        backendClient.get<PlaybackStatusResponse>("/v1/state/playback").then(data => {
            setPlaybackState(data?.playbackState ?? PlaybackState.STOPPED)
        })
    }

    useEffect(() => {
        if (auth.userLoggedIn) {
            refreshPlaybackState()
        }
    }, [auth.userLoggedIn, auth.userName, playbackState])

    const value = useMemo(() => ({
        playbackState, setPlaybackState
    }), [playbackState])

    return <PlaybackStateContext.Provider value={value}>{children}</PlaybackStateContext.Provider>;
}

export const usePlaybackState = () => {
    return useContext(PlaybackStateContext);
};