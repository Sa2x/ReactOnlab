import React from 'react';
import { shallow } from 'enzyme';

import '../../../setupTests';
import ShowList from './ShowList';
import { QueryClientProvider } from 'react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { fetchTvShows } from '../../api/fetchTvShows';
import { useShowQuery } from './useShowQuery';
import { Route } from 'react-router-dom';
import { getByTestId, render } from '@testing-library/react';

jest.mock('axios');

jest.mock('./useShowQuery', () => ({
  useShowQuery: jest.fn(),
}));

jest.mock('notistack', () => ({
  useSnackbar: jest.fn(),
}));

describe('Show List', () => {
  it('renders', () => {
    shallow(
      <QueryClientProvider>
        <ShowList />
      </QueryClientProvider>
    );
  });

  it('TV Shows fetching', async () => {
    const data = {};
    const resp = {
      data: data,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(resp));

    await expect(fetchTvShows(2, '')).resolves.toEqual(data);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.tvmaze.com/shows?page=2`
    );
  });

  describe('renders ', () => {
    beforeEach(() => {
      useShowQuery.mockImplementation(() => ({}));
      useSnackbar.mockImplementation(() => {
        const enqueueSnackbar = jest.fn();
        return [enqueueSnackbar];
      });
    });
    it('loading screen', () => {
      useShowQuery.mockImplementation(() => ({
        isLoading: true,
      }));
      const { getByTestId } = render(<ShowList />);

      expect(getByTestId('loader')).toBeTruthy();
    });

    it('error screen', () => {
      useShowQuery.mockImplementation(() => ({
        error: true,
      }));
      const { getByTestId } = render(<ShowList />);

      expect(getByTestId('error')).toBeTruthy();
    });

    it('data', () => {
      useShowQuery.mockImplementation(() => ({
        data: [
          {
            id: 3,
          },
        ],
      }));
      const { getByTestId } = renderWithRouter(() => <ShowList />, '');

      expect(useShowQuery).toHaveBeenCalledWith(1, '');
      expect(getByTestId('showcard')).toBeTruthy();
    });
  });
});
