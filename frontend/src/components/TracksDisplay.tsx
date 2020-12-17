import { Grow } from '@material-ui/core';
import React from 'react';

interface TracksDisplayProps {
    tracks: ITrack[] | undefined,
    noTracksFound: boolean
};

interface ITrack {
    id: number,
    title: String,
    artist: String
 };

const TracksDisplay: React.FC<TracksDisplayProps> = (props: TracksDisplayProps ) => {

    const renderNotFound = () => <div className="TracksDisplay-noTracks">Sorry, no tracks found.</div>;
    
    if(!props.noTracksFound) {
        if(props.tracks === undefined) {
            return <React.Fragment />;
        } else if(props.tracks.length !== 0) {
            return <div className="TracksDisplay-Results"><br/> {props.tracks.map((track, index) => 
            <Grow 
                key={index}
                in={props.tracks?.length !== 0}
                style={{ transformOrigin: '0 0 0' }}
                {...(props.tracks?.length !== 0 ? { timeout: Math.sqrt(1000000 * (index + 2) )} : {})}
            >
                <div className="TracksDisplay-TrackArtist" key={track.id}>
                    <b>{track.title}</b> by <b>{track.artist}</b>
                </div>
            </Grow>)}
        </div>
        } else {
            return renderNotFound();
        }
    } else {
        return renderNotFound();
    }
};

export default TracksDisplay;