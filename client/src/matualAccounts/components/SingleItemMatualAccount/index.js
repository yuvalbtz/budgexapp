import React from 'react'
import { SRLWrapper } from "simple-react-lightbox";
import {options} from '../../../util/lightboxConfig'
import AddItemImageButton from '../AddItemImageButton'
import NoImage from '../../../util/assets/no-image.svg'
import MoreOptionsItem from '../MoreOptionsButtonItem' 
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NumericLabel from 'react-pretty-numbers';
import Badge from '@material-ui/core/Badge';
import { makeStyles} from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';

import { IconButton } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
   
   details: {
      display: 'flex',
      width:'100%',
      height:'fit-content',
     

    },
    content: {
     display:'flex',
     width:'100%',
     height:'100%',
     

    
    },
    cover: {
     zIndex:3, 
     width: '10%',
      position:'absolute',
      right:'130px'

    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  

   
    

    itemCard:{
      display:'flex',
      justifyContent:'center',
      width:'100%',
      height:'fit-content'
      },

    MainCard:{
         marginTop:'60px',
        justifyContent:'center',
        display:'flex',
        alignItems:'center,'
        
         },
    
    spending:{
        display:'flex',
        width:'100%',
        flexDirection:'column',
        background:'#242333',
        color:'white',
        whiteSpace:'nowrap',
       
       
      },


      earning:{
        display:'flex',
        width:'100%',
        alignItems:'center',
        flexDirection:'column',
        background:'#242333',
        color:'white',
        whiteSpace:'nowrap',
       
      },

      column1:{
        display:'flex',
        width:'100%',
        justifyContent:'flex-start',
        flexDirection:'column',
        
      },

      column2:{
        display:'flex',
        width:'30%',
        alignItems:'center',
        flexDirection:'column',
        
      },

      ItemsWrapper:{
          width:'100%',
          height:'73vh',
          overflowY:'scroll',
          
       },
       
       customBadgePlus: {
        backgroundColor: "#43a047",
        color: "white",
        fontSize:'16px',
        fontWeight:'bold',
        fontFamily:'Varela Round'
      },
      customBadgeMinus: {
        backgroundColor: "#d50000",
        color: "white",
        fontSize:'16px',
        fontWeight:'bold',
        fontFamily:'Varela Round',
       
      },
      
      addImageBadge:{
        '&.MuiBadge-anchorOriginBottomLeftRectangle': {
           transform:'translate(-20%, -10%)',
          }
      },

      amountDetail:{
        display:'flex',
        justifyContent:'center', 
        alignItems:'center',
        whiteSpace:'nowrap', 
        wordBreak:'keep-all', 
        paddingLeft:'calc(100% - 60px)',
        [theme.breakpoints.up('sm')]:{
          paddingLeft:0,
          
        }

       
        
      },
     
      descriptionDetail:{
        display:'flex',
        lineClamp:'2', 
        boxOrient:'vertical',
        justifyContent:'flex-end',
        margin:'2px 4% 15px 2px',
        wordBreak:'break-word',
        whiteSpace:'break-spaces'
      },
      
       createdAtDetail:{
        position:'sticky',
        display:'flex',
        justifyContent:'flex-end',
        top:'95%',
        zIndex:0,
        margin:'2px 3% 2px 2px'
       },

       titleDetail:{
        display:'flex',
        justifyContent:'flex-end',
        margin:'2px 1% 2px 2px',
       fontFamily:'Varela Round'
       },

       Fab:{
        position:'relative',
        margin:'0 auto',
        display:'flex',
        background:'transparent',
        bottom:'3%',
        border:'white solid 2px'
       },
       FabWrapper:{
        width:'100%',
        height:'12%', 
        zIndex:3, 
        display:'flex', 
        flex:'wrap',
        justifyContent:'center', 
        alignItems:'center'
       }
      
     

  }));





function Index({item, accountId}) {
   
   const classes = useStyles() 
   
   

//Number Format Options
const FormatOptions = {
    'justification':'L',
    'locales':'en-AU',
    'currency':false,
    'currencyIndicator':'AUD',
    'percentage':false,
    'precision':0,
    'wholenumber':null,
    'commafy':true,
    'shortFormat':true,
    'shortFormatMinValue': 1000000,
    'shortFormatPrecision': 2,
    'title':true,
    
  };


    return (
        <Badge 
         component='div' 
         style={{
           display:'flex', 
           flexDirection:'column', 
           marginTop:'16px'
          }}   
         
         invisible={item.amount === 0}
         classes={{badge: item.amount > 0 ? classes.customBadgePlus : classes.customBadgeMinus}}
         badgeContent={item.amount > 0 ? '+' : '-'} 
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>
          
            <Card  className={classes.itemCard}>
        
            <div className={classes.details}>
             <div className={classes.content}>
             
            
             <div className={classes.column2}>
             
            
             <Typography 
               component="h6" 
               variant="h6" 
               className={classes.amountDetail}>
              <span >₪ {item.amount < 0 && '-'}</span>
             <NumericLabel params={FormatOptions}>{item.amount < 0 ? Math.abs(item.amount):item.amount}</NumericLabel> 
               </Typography>
               
              
               <CardMedia 
                key={item.id}
                style={{
                 display:'flex', 
                 borderTop:'1px solid rgba(0,0,0,1)',
                 width:'100%',
                 height:'100%',
                 borderRight:'1px solid rgba(0,0,0,1)',
                 padding:0,
                 margin:0,
                 backgroundSize:'cover'}}
                 image={NoImage}
                
                >
                
                <SRLWrapper  options={options} >
                 {item.media && ( <img 
                 style={{
                 display:'flex', 
                 
                 
                 cursor:'pointer',  
                 }} height='100%' width='100%'  src={item.media} alt={item.description} />)}
                </SRLWrapper>
              
                </CardMedia>
                  
              {!item.media && ( <AddItemImageButton accountId={accountId} itemId={item.id}/>)}
               
             
             </div>
           
              <div className={classes.column1}>
             
              <Typography 
               component="h6" 
               variant="h6" 
               className={classes.titleDetail}>
               {item.title} 
                 
              <MoreOptionsItem 
               accountId={accountId} 
               itemId={item.id}   
               item={item}
               />
           
            </Typography>
               
               <Typography 
                 variant="subtitle1" 
                 color="textSecondary" 
                 className={classes.descriptionDetail}>
               {item.description}
                <span 
                style={{
                  whiteSpace:'nowrap'}}>:תיאור</span>
              </Typography>
               
               <Typography 
                variant="subtitle2" 
                color="textSecondary" 
                className={classes.createdAtDetail}>
                 {item.createdAt} :נוצר לאחרונה
               </Typography>
              </div>
              
              
              </div>
            </div>
           
           
         </Card>
       
         </Badge>
    )
}

export default Index