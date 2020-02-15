import { useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import DealDetailDesktop from '../components/dealDetail/DealDetailDesktop';
import DealDetailTablet from '../components/dealDetail/DealDetailTablet';
import { some } from '../constants';

export interface DetailRouteProps extends RouteComponentProps {
}

const Detail: React.FC<DetailRouteProps> = props => {
  const { location } = props;

  const theme = useTheme();
  const matchDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [data, setData] = React.useState<some | undefined>();

  React.useEffect(() => {
    const fn = async () => {
      // mock an API request to jane.com since CORS is not turned on
      await new Promise(resolve => setTimeout(resolve, 500));
      const state = location.state as some | undefined;
      setData(state?.item || undefined);
    }
    fn();
  }, [location]);

  return <>
    {matchDesktop ? <DealDetailDesktop data={data} /> : <DealDetailTablet data={data} />}
  </>
};

export default withRouter(Detail);
