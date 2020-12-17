import React, { useState } from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from '@material-ui/core';
import TracksDisplay from './TracksDisplay'

interface ITrack {
    id: number,
    title: String,
    artist: String
 };

const TrackSearch: React.FC = () => {

    const [searchType, setSearchType] = useState<String>('id');
    const [searchValue, setSearchValue] = useState<String | null>();
    const [returnedTracks, setReturnedTracks] = useState<ITrack[] | undefined>();
    const [noTracksFound, setNoTracksFound] = useState<boolean>(false);

    const fetchTrackDetailsById = () => {
        fetch(`http://localhost:5000/track-details/${searchValue}`,  {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            if (!response.ok) { throw Error(response.statusText); }
            return response.json();
        }).then(response => {
            setNoTracksFound(false);
            //convert to single array for more conisitent data formatting
            const retunedTracksArray: ITrack[] = [];
            retunedTracksArray.push(response);
            setReturnedTracks(retunedTracksArray);
        }).catch(() => {
            setNoTracksFound(true);
        });
    };

    const fetchTracksDetailsByArtist = () => {
        fetch(`http://localhost:5000/tracks-details-by-artist/${searchValue}`,  {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            if (!response.ok) { throw Error(response.statusText); }
            return response.json();
        }).then(response => {
            setNoTracksFound(false);
            setReturnedTracks(response);
        }).catch(() => {
            setNoTracksFound(true);
        });
    };

    const handleSearchTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchType((event.target as HTMLInputElement).value);
    };

    const renderLabel = () => {
        return `Type ${searchType} and hit enter`;
    };

    const handleSearchFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            if( searchValue === '' || searchValue === undefined) {
                setReturnedTracks(undefined);
                setNoTracksFound(false);
                return;
            }
            if(searchType === 'id') {
                fetchTrackDetailsById();
            } else if (searchType === 'artist') {
                fetchTracksDetailsByArtist();
            }
        };
    };

    return <React.Fragment>
        <div className={(returnedTracks === undefined || returnedTracks.length === 0) ? "TrackSearch-ContentsUndefined" : "TrackSearch-Contents"}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Search by Track Id or Artist</FormLabel>
                <RadioGroup aria-label="searchType" name="searchType1" value={searchType} onChange={handleSearchTypeChange}>
                    <FormControlLabel 
                        value="id" 
                        control={<Radio color="primary"/>} 
                        label="Track Id" 
                    />
                    <FormControlLabel 
                        value="artist" 
                        control={<Radio color="primary"/>} 
                        label="Artist" 
                    />
                </RadioGroup>
            </FormControl><br/>
            <TextField 
                id="outlined-basic" 
                label={renderLabel()} 
                variant="outlined"
                onChange={handleSearchFieldChange}
                onKeyDown={event => handleSearch(event)}
            />
            <TracksDisplay 
                tracks={returnedTracks} 
                noTracksFound={noTracksFound}
            />
        </div>
    </React.Fragment>
};

export default TrackSearch;