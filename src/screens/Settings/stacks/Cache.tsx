import React, { useCallback } from 'react';
import TrackPlayer from 'react-native-track-player';
import music from 'store/music';
import { t } from '@localisation';
import Button from 'components/Button';
import styled from 'styled-components/native';
import { Paragraph } from 'components/Typography';
import { useAppDispatch } from 'store';
import Container from '../components/Container';

const ClearCache = styled(Button)`
    margin-top: 16px;
`;

export default function CacheSettings() {
    const dispatch = useAppDispatch();
    const handleClearCache = useCallback(() => {
        // Dispatch an action to reset the music subreducer state
        dispatch(music.actions.reset());

        // Also clear the TrackPlayer queue
        TrackPlayer.reset();
    }, [dispatch]);

    return (
        <Container>
            <Paragraph>{t('setting-cache-description')}</Paragraph>
            <ClearCache title={t('reset-cache')} onPress={handleClearCache} />
        </Container>
    );
}