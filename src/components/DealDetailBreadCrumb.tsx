import { Breadcrumbs, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import { backableToResultKey, some } from '../constants';
import { Link } from './Link';

interface Props extends RouteComponentProps {
  current: string;
}

const DealDetailBreadCrumb: React.FC<Props> = props => {
  const { current, location } = props;

  const locationState = location.state as some | undefined;
  const history = useHistory();
  const backableToResult = (locationState && locationState[backableToResultKey]) || false;

  return <Breadcrumbs>
    {
      backableToResult ?
        <span style={{ cursor: 'pointer' }} onClick={() => history.goBack()}>
          <Typography >
            <FormattedMessage id="resultSummary" />
          </Typography>
        </span>
        :
        <Link to="/">
          <Typography >
            <FormattedMessage id="resultSummary" />
          </Typography>
        </Link>
    }
    <Typography color="textPrimary">{current}</Typography>
  </Breadcrumbs>
}

export default withRouter(DealDetailBreadCrumb);
