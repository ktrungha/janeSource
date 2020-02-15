import styled from '@emotion/styled';
import { Card, PaperProps, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { FormattedNumber, FormattedMessage } from 'react-intl';
import { some } from '../constants';
import { RED } from '../colors';

const InfoDiv = styled.div`
  padding: 5px 15px;
`;

interface Props {
  data: some;
}

const Wrapper: React.FC<PaperProps> = ({ style, children, ...rest }) => {
  return <Card elevation={2} style={{ minHeight: '360px', width: '300px', borderRadius: '8px' }}
    {...rest}>
    {children}
  </Card>
}

const JobResultItem: React.FC<Props> = props => {
  const { data } = props;
  return (<Wrapper>
    <img style={{ display: 'block', height: '300px', width: '300px', objectFit: 'cover' }}
      src={`https://cloud.media-jane.com/q_auto:low,f_auto,w_320,dpr_2/v1/img/deals/${data.dealId}_square.jpg`} alt='result' />
    <InfoDiv>
      <div>
        <Typography variant='body2'>{data.title}</Typography>
      </div>
      <div style={{ display: 'flex' }}>
        <Typography variant='caption' style={{ color: RED, flex: 1 }}>
          $<FormattedNumber value={data.price} />
        </Typography>
        <Typography variant='caption'>
          <FormattedMessage id="freeShipping" />
        </Typography>
      </div>
    </InfoDiv>
  </Wrapper>);
}

export const SkeletonJobResultItem: React.FC = () => {
  return (<Wrapper >
    <Skeleton variant='rect' height='300px' />
    <InfoDiv>
      <Skeleton width='200px' />
      <Skeleton width='60px' />
    </InfoDiv>
  </Wrapper>);
}

export default JobResultItem;
