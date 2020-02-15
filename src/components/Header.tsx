import React from 'react'
import { Typography } from '@material-ui/core';
import { PRIMARY } from '../colors';

const Header: React.FC = () => {
  return <div style={{ textAlign: 'center', padding: '10px 0', backgroundColor: PRIMARY, color: 'white' }}>
  <Typography variant="h4">
    JANE
  </Typography>
</div>
}

export default Header;
