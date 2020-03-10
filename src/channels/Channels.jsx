import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Button from '../components/Button';
import { useSnackbar } from '../components/Snackbar';

import { LoadMoreContainer } from './Layout';
import Loading from './Loading';
import {
  ListContainer,
  ListTitle,
  List,
  ListItemLink,
  ListItemText
} from './ChannelList';

import { useChannels } from './ChannelsContext';
import useFetchChannels from './use-fetch-channels';

const PAGE_LIMIT = 10;

const MenuButton = styled(Button)`
  padding: 0.1em 0.2em;
`;

export function PureChannels({ isLoading, cursor, fetchNextPage, channels }) {
  if (isLoading && !cursor) {
    return <Loading />;
  }

  const handleLoadMore = () => {
    fetchNextPage(cursor);
  };

  return (
    <div>
      <ListContainer>
        <ListTitle>CHANNELS</ListTitle>

        <List>
          {channels.map(channel => {
            const { id } = channel;
            return (
              <ListItemLink key={id} to={`/channels/${id}`}>
                <ListItemText>{channel.name}</ListItemText>

                <MenuButton
                  size="small"
                  tertiary
                  disabled
                  title="not implemented yet"
                >
                  <FontAwesomeIcon icon="ellipsis-h" />
                </MenuButton>
              </ListItemLink>
            );
          })}
        </List>
      </ListContainer>

      {cursor && (
        <LoadMoreContainer>
          <Button
            size="small"
            tertiary
            disabled={isLoading}
            onClick={handleLoadMore}
          >
            {isLoading ? (
              <FontAwesomeIcon icon="circle-notch" spin />
            ) : (
              'Load more'
            )}
          </Button>
        </LoadMoreContainer>
      )}
    </div>
  );
}

PureChannels.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  cursor: PropTypes.string,
  fetchNextPage: PropTypes.func.isRequired,
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isPrivate: PropTypes.bool.isRequired
    })
  )
};

function Channels() {
  const [channelState, channelDispatch] = useChannels();
  const [
    fetchChannels,
    abortFetchChannels,
    isFetching,
    err,
    nextPageCursor
  ] = useFetchChannels(channelDispatch);
  const [, snackbarDispatch] = useSnackbar();

  React.useEffect(() => {
    fetchChannels(PAGE_LIMIT);

    return () => {
      abortFetchChannels();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!err) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to fetch channels',
        text: err.details ? `${err.message}: ${err.details}` : err.message
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchNextPage = cursor => {
    fetchChannels(PAGE_LIMIT, cursor);
  };

  return (
    <PureChannels
      isLoading={isFetching}
      cursor={nextPageCursor}
      fetchNextPage={fetchNextPage}
      channels={channelState}
    />
  );
}

export default Channels;
