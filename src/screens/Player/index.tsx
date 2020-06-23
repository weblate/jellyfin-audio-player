import React from 'react';
import MediaControls from './components/MediaControls';
import ProgressBar from './components/ProgressBar';
import NowPlaying from './components/NowPlaying';
import styled from 'styled-components/native';
import Queue from './components/Queue';

const Container = styled.ScrollView`
    background-color: #fff;
    padding: 25px;
`;

export default function Player() {
    return (
        <Container>
            <NowPlaying />
            <MediaControls />
            <ProgressBar />
            <Queue />
        </Container>
    );
}