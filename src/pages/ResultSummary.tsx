import styled from '@emotion/styled';
import { Button, Container, Typography } from '@material-ui/core';
import { css } from 'emotion';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import DealResultItem, { SkeletonJobResultItem as SkeletonDealResultItem } from '../components/DealResultItem';
import Header from '../components/Header';
import { Link } from '../components/Link';
import { backableToResultKey, some, ROUTES } from '../constants';

const ResultWrapper = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  margin: 10px 15px;
`;

const ResultSummary: React.FC = props => {
  const [items, setItems] = React.useState<some[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fn = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://jane.com/mock/deals?page=${page}`);
        if (res.ok) {
          const json = await res.json();
          if (page === 0) {
            setTotalPages(json.totalPages);
            setItems(json.deals);
          } else {
            setItems(old => old?.concat(json.deals))
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fn();
  }, [page]);

  return <div>
    <Header />
    <Container>
      <div className={css`
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 10px auto;
    `}>
        {
          items.map(item => <ResultWrapper>
            <Link to={{
              pathname: ROUTES.detail.gen(item.dealId),
              state: { item, [backableToResultKey]: true }
            }}>
              <DealResultItem data={item} key={item.dealId} />
            </Link>
          </ResultWrapper>)
        }
        {
          loading &&
          (new Array(10).fill(1)).map((v, i) => <ResultWrapper>
            <SkeletonDealResultItem key={i} />
          </ResultWrapper>)
        }
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button color='primary' disabled={loading || page === totalPages} onClick={() => setPage(old => old + 1)}>
          <Typography variant='body1'>
            <FormattedMessage id="loadMore" />
          </Typography>
        </Button>
      </div>
    </Container>
  </div>;
};

export default ResultSummary;
