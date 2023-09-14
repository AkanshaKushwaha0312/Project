import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Button } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({
  card: {
    marginTop: 0,
    marginRight: spacing40,
    marginBottom: 0,
    marginLeft: spacing40,
  },
});

const ExpenseTrackerCard = (props) => {
  const {
    classes,
    cardControl: { navigateToPage },
  } = props;

  return (
    <div className={classes.card}>
      <Typography variant='h2'>Cohort Student ExpenseTracker</Typography>
      <Typography>
        <Button onClick={() => navigateToPage({ route: '/' })}>
          Click Here
        </Button>
      </Typography>
    </div>
  );
};

ExpenseTrackerCard.propTypes = {
  classes: PropTypes.object.isRequired,
  cardControl: PropTypes.object,
};

export default withStyles(styles)(ExpenseTrackerCard);
