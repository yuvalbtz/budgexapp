import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import PieChartRoundedIcon from '@material-ui/icons/PieChartRounded';
import {useSelector} from 'react-redux'

import {
	Chart,
	Interval,
	Tooltip,
	Axis,
	Coordinate,
} from "bizcharts";
import { DialogTitle } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import history from '../../util/history';








const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
  flex: 1,
  },
  Fab:{
    position:'fixed',
    right:theme.spacing(2),
    bottom:theme.spacing(2),
    zIndex:3,
  
  }
}));


const PieChart = ({data, cols}) => {
 
 return (
   
    <Chart height={'50%'} width={'100%'}  data={data} scale={cols} interactions={['element-single-selected']} autoFit>
		<Coordinate type="theta" radius={0.70} />
			<Tooltip showTitle={false} />
			<Axis visible={false} />
			<Interval
				position="percent"
				adjust="stack"
				color="item"
        style={{
					lineWidth: 1,
					stroke: "#fff",
				}}
				label={[
					"item",
					(item) => {
						return {
							offset: 15,
							content: (data) => {
								return `${data.item}\n ${parseInt(data.percent * 100)}%`;
							},
							
						};
					},
				]}
			/>
		</Chart>
   
  )
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({totalSpending, totalEarning}) {
  
  const params = useParams()
  
  const accountData = useSelector(state => state.uiReducer.getCurrentAccountUi)
  
  let array2 = []
  let array3 =[]
  
    function getSpendingSumDuplicateTitleData(){
     
      if(accountData){
        let result = []
        const filteredList = accountData.list.filter(i => i.amount < 0)

    filteredList.forEach(function (a) {
       if (!this[a.title]) {
         this[a.title] = { title: a.title, amount: 0 };
         result.push(this[a.title]);
      }
          this[a.title].amount += a.amount;
     }, Object.create(null));
        
      return result    
   }
      
    }

   

 

    function getEarningSumDuplicateTitleData(){
      
      if(accountData){
        let result = []
        const filteredList = accountData.list.filter(i => i.amount > 0)

    filteredList.forEach(function (a) {
       if (!this[a.title]) {
         this[a.title] = { title: a.title, amount: 0 };
         result.push(this[a.title]);
      }
          this[a.title].amount += a.amount;
     }, Object.create(null));
        
      return result    
   }
    
     
    }
   


    function getDataSpending(){
      
      let Sarray = getSpendingSumDuplicateTitleData();
     
      if(Sarray){
        Sarray.map(i => array2.push({ item:i.title, percent:parseFloat((Math.abs(Math.abs(i.amount) / Math.abs(totalSpending))).toFixed(2))}))
        
      }
    }


    function getDataEarning(){
     
      let Earray = getEarningSumDuplicateTitleData();
     
      if(Earray){
        Earray.map(i => array3.push({ item:i.title, percent:parseFloat((Math.abs(Math.abs(i.amount) / Math.abs(totalEarning))).toFixed(2))}))
        
      }
      
    }

  const classes = useStyles();
  const open = window.location.pathname === `/myAccounts/${params.accountId}/statis`

  

  const handleClose = () => {
    history.goBack()
  };

 
  React.useEffect(() => {
    if(open){
      
    getDataEarning()
    getDataSpending()
    
    
    
  } 
  }, [open])
 
  console.log("spending", array2);
  console.log("earning", array3); 

//pie chart
const data = [
  { item: "ביגוד והלבשה", percent: 0.4 },
  { item: "class 2", percent: 0.21 },
  { item: "class 3", percent: 0.17 },
  { item: "class 4", percent: 0.13 },
  { item: "משכורת", percent: 0.09 },
  { item: "אוכל ופירות", percent: 0.04 },
];

const cols = {
  percent: {
    formatter: (val) => {
      val = val * 100 + "%";
      return val;
    },
  },
};






  return (
    
    <div>
      
      <Fab  className={classes.Fab} size="medium" color="secondary" aria-label="statistics" >
     <IconButton component={Link} style={{color:'white'}} to={`/myAccounts/${params.accountId}/statis`}><PieChartRoundedIcon /></IconButton> 
      </Fab>
      <Dialog dir='rtl' style={{textAlign:'center'}} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              סטטיסטיקה
            </Typography>
          </Toolbar>  
        </AppBar>
        <div style={{height:'100%', width:'100%'}} dir='ltr' >
           
           <Typography 
           variant='h5'
           style={{textDecoration:'underline'}}
           >
           ₪ {totalEarning + totalSpending } :מאזן נוכחי
           </Typography>
        

          {totalEarning > 0 && (<>
            <DialogTitle style={{position:'relative', margin:'0 auto', textDecoration:'underline'}}> ₪{' '}{Math.abs(totalEarning).toFixed(2)} :הכנסות</DialogTitle>
            <PieChart data={array3} cols={cols} />
            </>
          )}
          
       

       
          
          {totalSpending < 0 && (<>
            <DialogTitle  style={{position:'relative', margin:'0 auto', textDecoration:'underline'}}> ₪{' '}{ -Math.abs(totalSpending).toFixed(2)} :הוצאות</DialogTitle>
          <PieChart data={array2} cols={cols} /></>) }
       
       
       
        </div>
      </Dialog>
    </div>
  );
}