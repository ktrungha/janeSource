import React from 'react';
import { FormattedNumber } from 'react-intl';
import { Typography } from '@material-ui/core';

interface Props {
  value: number;
  unit: React.ReactNode;
}

const ValueBox: React.FC<Props> = props => {
  const { value, unit } = props;
  return <div style={{ padding: '10px 0', margin: '0 40px' }}>
    <div style={{ textAlign: 'center' }}>
      <Typography variant='h5'>
        <FormattedNumber value={value} />
      </Typography>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Typography variant='body1' color='textSecondary' style={{ textTransform: 'uppercase' }}>
        {unit}
      </Typography>
    </div>
  </div>
}

export default ValueBox;
