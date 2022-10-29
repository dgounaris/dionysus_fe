import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {backendClient} from "../../common/clients/http/BackendClient";
import {PlaybackState, PlaybackStatusResponse} from "../models/PlaybackState";
import {useAuth} from "../../Auth/hooks/AuthHooks";

type PlaybackStateContextType = {
    playbackState: PlaybackState
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
        const playbackStatusRefreshInterval = setInterval(() => {
            if (auth.userLoggedIn) {
                refreshPlaybackState()
            }
        }, 2000)

        return () => { clearInterval(playbackStatusRefreshInterval) }
    }, [auth.userLoggedIn, auth.userName, playbackState])

    const value = useMemo(() => ({
        playbackState
    }), [playbackState])

    return <PlaybackStateContext.Provider value={value}>{children}</PlaybackStateContext.Provider>;
}

export const usePlaybackState = () => {
    return useContext(PlaybackStateContext);
};