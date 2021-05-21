import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import images from '../../util/bg-images.json'
import Grid from '@material-ui/core/Grid';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import MatualAccountModal from '../../components/ModalMatualAccount'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
   
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.up('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 200,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(6)}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});



function ButtonBases(props) {
  const { classes } = props;
   console.log("myMatual page");
  return (
    <div className={classes.root}>
      <Grid  container 
        direction="row"
        justify="center"
        alignItems="center"
       >
      
      <Grid container spacing={0} justify="center" >
      {images.map(image => (
        <Grid key={image.title} item xs={12} sm={4}>
       
       <ButtonBase
          focusRipple
          
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
         
        >
         
       <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.img})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          
            
       
         
          <GridListTileBar
              title={image.title}
              subtitle={<span>created by: {image.author}</span>}
             
            />
        
        </ButtonBase>
        
        </Grid>
       
    ))}
  </Grid>
  
</Grid>
   
<MatualAccountModal/>
    </div>
  );
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonBases);

