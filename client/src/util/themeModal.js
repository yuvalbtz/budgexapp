export const themeModal = (theme) => ({
    root: {
      height: 0,
      
    },
    wrapper: {
      width: 100 + theme.spacing(2),
    },
    /* desktop config */
    paper: {
      zIndex:13,
      position: 'absolute',
      bottom:'15%',
      width:'40%',
      left:'130%',
      height:'70%',
     
      
     /* mediun config */
     [theme.breakpoints.only('md')]: {
      top:'8%',
      bottom:'15%',
      width:'50%',
      left:'125%',
      height:'70%',
          
    },
  
         /* small config */
         [theme.breakpoints.only('sm')]: {
          top:'8%',
          bottom:'15%',
          width:'50%',
          left:'125%',
          height:'70%',
              
        },
  
  
  
      /* very small config */
      [theme.breakpoints.only('xs')]: {
          top:'8%',
          bottom:'15%',
          width:'70%',
          left:'115%',
          height:'70%',
              
        },
  },
  
  
   
  })