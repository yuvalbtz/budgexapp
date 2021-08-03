import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import useWindowPosition from '../hook/useWindowPosition';
import { Typography } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: 'whitesmoke',   
    padding: '50px 0 50px 0'
},

 images:{
   
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
 }
}));
export default function Info() {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
   <div dir='rtl' className={classes.root} id="place-to-visit">
      <Typography style={{display:'flex', justifyContent:'center',fontWeight:'bold', padding:50}} variant='h4' component='h4'>
          אז איך עובדת האפליקצייה ?
      </Typography>
      <div className={classes.images}>
      <ImageCard place={places[1]} checked={checked} />
      <ImageCard place={places[0]} checked={checked} />
   </div>
    </div>
  );
}



const places = [
    {
        title: 'חשבונות משותפים',
        description:
          'בחשבונות משותפים אתם יכולים להוסיף חברים לחשבון שלכם ולהוסיף או לעדכן פריטים לרשימת הוצאות והכנסות בזמן אמת!',
        imageUrl: "https://creditkarma-cms-ca.imgix.net/wp-content/uploads/sites/2/2020/08/50-30-20-rule932275488.jpg?w=1024&auto=compress",
        time: 1500,
      },
    
    {
      title: 'החשבונות שלי',
      description:
        "דף החשבונות שלי נועד למעקב אחר הוצאות והכנסות באופן פרטי ולראות בדיוק כמה הוצאתם או הכנסתם בגרף מסודר.",
      imageUrl: "https://www.moneycrashers.com/wp-content/uploads/2011/02/woman-making-budget.jpg",
      time: 1500,
    },
    
  ];