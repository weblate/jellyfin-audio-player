import { createAction, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { AppState } from '@/store';
import { generateTrackUrl } from '@/utility/JellyfinApi';
import { downloadFile, unlink, DocumentDirectoryPath, exists } from 'react-native-fs';
import { DownloadEntity } from './types';
import MimeTypes from '@/utility/MimeTypes';

export const downloadAdapter = createEntityAdapter<DownloadEntity>();

export const queueTrackForDownload = createAction<string>('download/queue');
export const initializeDownload = createAction<{ id: string, size?: number, jobId?: number, location: string }>('download/initialize');
export const progressDownload = createAction<{ id: string, progress: number, jobId?: number }>('download/progress');
export const completeDownload = createAction<{ id: string, location: string, size?: number }>('download/complete');
export const failDownload = createAction<{ id: string }>('download/fail');

export const downloadTrack = createAsyncThunk(
    '/downloads/track',
    async (id: string, { dispatch, getState }) => {
        // Get the credentials from the store
        const { settings: { jellyfin: credentials } } = (getState() as AppState);

        // Generate the URL we can use to download the file
        const url = generateTrackUrl(id as string, credentials);

        // Get the content-type from the URL by doing a HEAD-only request
        const contentType = (await fetch(url, { method: 'HEAD' })).headers.get('Content-Type');
        if (!contentType) {
            throw new Error('Jellyfin did not return a Content-Type for a streaming URL.');
        }

        // Then convert the MIME-type to an extension
        const extension = MimeTypes[contentType as keyof typeof MimeTypes];
        if (!extension) {
            throw new Error(`Unsupported MIME-type ${contentType}`);
        }

        // Then generate the proper location
        const location = `${DocumentDirectoryPath}/${id}${extension}`;

        // Actually kick off the download
        const { promise } = await downloadFile({
            fromUrl: url,
            progressInterval: 250,
            background: true,
            begin: ({ jobId, contentLength }) => {
                // Dispatch the initialization
                dispatch(initializeDownload({ id, jobId, size: contentLength, location }));
            },
            progress: (result) => {
                // Dispatch a progress update
                dispatch(progressDownload({ id, progress: result.bytesWritten / result.contentLength }));
            },
            toFile: location,
        });

        // Await job completion
        const result = await promise;
        dispatch(completeDownload({ id, location, size: result.bytesWritten }));
    },
);

export const removeDownloadedTrack = createAsyncThunk(
    '/downloads/remove/track',
    async(id: string, { getState }) => {
        // Retrieve the state
        const { downloads: { entities }} = getState() as AppState;

        // Attempt to retrieve the entity from the state
        const download = entities[id];
        if (!download) {
            throw new Error('Attempted to remove unknown downloaded track.');
        }

        // Then unlink the file, if it exists
        if (download.location && await exists(download.location)) {
            return unlink(download.location);
        }
    }
);

