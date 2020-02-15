import styled from '@emotion/styled';
import { Button, Container, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { DealDetailProps } from '.';
import { LIGHT_GREY, RED } from '../../colors';
import DealDetailBreadCrumb from '../DealDetailBreadCrumb';
import { Link } from '../Link';
import ValueBox from '../ValueBox';
import Header from '../Header';

const LowerDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 20px 5px;
  border-top: 1px solid ${LIGHT_GREY};
  border-bottom: 1px solid ${LIGHT_GREY};
`;

const ImageDiv = styled.div`
  border: 1px solid ${LIGHT_GREY};
`;

const InfoDiv = styled.div`
  padding: 10px 20px;
`;

const Layout: React.FC<{ breadCrumb: React.ReactNode, img: React.ReactNode, info: React.ReactNode, lowerDiv: React.ReactNode }>
  = props => {
    const { breadCrumb, img, info, lowerDiv } = props;
    return <div style={{ marginBottom: '20px' }}>
      <div style={{ height: '70px', display: 'flex', alignItems: 'center' }}>
        {breadCrumb}
      </div>
      <ImageDiv>
        {img}
      </ImageDiv>
      <InfoDiv>
        {info}
      </InfoDiv>
      <LowerDiv>
        {lowerDiv}
      </LowerDiv>
    </div>
  }

const SkeletonBox: React.FC = () => {
  return <Layout breadCrumb={<Skeleton width="200px" />}
    img={<Skeleton height="500px" variant='rect' />}
    info={
      <>
        <Skeleton width='200px' />
        <Skeleton width='80px' style={{ marginTop: '15px' }} />
        <Skeleton width='70px' style={{ marginTop: '15px' }} />
      </>
    }
    lowerDiv={<Skeleton variant='rect' height="44px" width='880px' />} />;
}

const DealDetailTablet: React.FC<DealDetailProps> = props => {
  const { data } = props;
  return <>
    <Header />
    <Container>
      <div style={{ width: '100%', margin: 'auto' }}>
        {
          data ?
            <Layout breadCrumb={<DealDetailBreadCrumb current={data.title} />}
              img={<img alt='deal' style={{ display: 'block', width: '100%' }}
                src={`https://cloud.media-jane.com/q_auto:low,f_auto,w_320,dpr_2/v1/img/deals/${data.dealId}_square.jpg`} />}
              info={<>
                <div style={{ padding: '10px 0' }}>
                  <Typography variant='h5'>
                    {
                      data.title
                    }
                  </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', padding: '10px 0' }}>
                  <Typography variant='body1' style={{ color: RED }}>
                    $
                  {
                      <FormattedNumber value={data.price} />
                    }
                  </Typography>
                  &emsp;
                <Typography variant='body2' style={{ textDecoration: 'linethrough' }}>
                    $
                  {
                      <FormattedNumber value={data.retail} />
                    }
                  </Typography>
                </div>
                <div style={{ padding: '10px 0' }}>
                  <Typography variant='body1'>
                    <FormattedMessage id="sellerName" values={{ name: data.sellerName }} />
                  </Typography>
                </div>
                <div style={{ padding: '20px 0' }}>
                  <Link to="/form">
                    <Button variant='contained' fullWidth color='primary'>
                      <FormattedMessage id="goToForm" />
                    </Button>
                  </Link>
                </div>
              </>}
              lowerDiv={<><ValueBox value={data.likeCount}
                unit={<FormattedMessage id={data.likeCount ? 'likes' : 'like'} />} />
                <ValueBox value={data.soldQuantity}
                  unit={<FormattedMessage id='sold' />} /></>}
            /> :
            <SkeletonBox />
        }
      </div>
    </Container>
  </>
}

export default DealDetailTablet;
