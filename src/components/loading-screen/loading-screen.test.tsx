import {render, screen} from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    render(<LoadingScreen textLoading={'Loading'}/>);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
