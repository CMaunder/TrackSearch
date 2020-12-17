import express, { Application, Request, Response } from 'express';
const tracksJson = require('../resources/tracks.json')
const cors = require('cors');

const app: Application = express();

app.use(cors());

interface ITrack {
   id: number,
   title: string,
   artist: string
};

const trackArray: ITrack[] = tracksJson.tracks;

let idToTrackMap: Record<number, ITrack> = {};
let artistToTrackMap: Record<string, ITrack[]> = {};

trackArray.forEach(track => {
   idToTrackMap[track.id] = track;
   if(artistToTrackMap[track.artist] === undefined) {
      artistToTrackMap[track.artist] = [track];
   } else {
      artistToTrackMap[track.artist].push(track);
   }
});

app.get('/track-details/:trackId', (req: Request, res: Response) => {
   const trackId: number = Number(req.params.trackId);
   if(idToTrackMap[trackId] !== undefined) {
      res.send(idToTrackMap[trackId]);
   } else {
      res.sendStatus(404);
   }
});

app.get('/tracks-details-by-artist/:artist', (req: Request, res: Response) => {
   const artist: string = req.params.artist;
   if(artistToTrackMap[artist] !== undefined) {
      res.send(artistToTrackMap[artist]);
   } else {
      res.sendStatus(404);
   }
});

const port: number = 5000;

app.listen(port, () => {
   console.log(`Server running on port ${port}`); 
});