import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Grid, Paper, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    infoHeader: {
      padding: `${theme.spacing(2.5)}px ${theme.spacing(3.5)}px`,
      marginBottom: theme.spacing(1)
    },
    title: {
      marginRight: theme.spacing(2)
    },
    subtitle: {
      color: 'var(--color-jetBlack)'
    },
    subtitleValue: {
      fontWeight: 600
    }
  };
});

function TopInfoHeader({title, subtitles = [], className}) {
  const classes = useStyles();
  return (
    <Paper
      elevation={1}
      square={true}
      className={clsx(classes.infoHeader, {className})}
    >
      <Grid container alignItems="center" spacing={1} wrap="nowrap">
        <Grid item className={classes.title}>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        {subtitles?.length
          ? subtitles.map((subtitle, index) => {
              const {key, value} = subtitle;
              return (
                <React.Fragment key={key}>
                  <Grid item className={classes.subtitle}>
                    <Typography variant="body2" display="inline">
                      {`${key} : `}
                    </Typography>
                    <Typography
                      variant="body1"
                      display="inline"
                      className={classes.subtitleValue}
                    >
                      {value}
                    </Typography>
                  </Grid>
                  {index + 1 === subtitles.length ? null : (
                    <Grid item>
                      <Typography variant="body2" display="inline">
                        |
                      </Typography>
                    </Grid>
                  )}
                </React.Fragment>
              );
            })
          : null}
      </Grid>
    </Paper>
  );
}

TopInfoHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitles: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.elementType
      ])
    })
  )
};

export default TopInfoHeader;
