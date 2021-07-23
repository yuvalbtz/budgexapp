import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
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
import history from '../../../util/history';
import { DataGrid } from '@material-ui/data-grid';







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
    bottom:theme.spacing(1),
    zIndex:3,
  
  },

  stasWrapper:{
    height:'100%', 
    width:'100%', 
    [theme.breakpoints.up('md')]:{
      display:'flex', 
      alignItems:'center', 
      justifyContent:'center'
    }
  },

  datagridEarning:{
    height:400, 
    width: '100%', 
    direction:'rtl', 
    margin:'0 auto',
   
     [theme.breakpoints.up('sm')]:{
      width:'90%'
     },
     
  },

  datagridSpending:{
    height:400, 
    width: '100%', 
    direction:'rtl', 
    margin:'0 auto',
    
    
     [theme.breakpoints.up('sm')]:{
      width:'90%'
     },
    

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
								return `${data.item}\n${Number(data.percent * 100).toFixed(1)}%`;
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

   
    function getEarningSumDuplicateDataGrid(){
      
      if(accountData){
        let result = []
        const filteredList = accountData.list.filter(i => i.amount > 0)
   
    filteredList.forEach(function (a,i) {
       if (!this[a.title]) {
         this[a.title] = { id:i,title: a.title, amount: 0, date:a.updatedAt};
         result.push(this[a.title]);
      }
          this[a.title].amount += a.amount;
     }, Object.create(null));
        
      return result    
   }
    
     
    }
 

    function getSpendingSumDuplicateDataGrid(){
      
      if(accountData){
        let result = []
        const filteredList = accountData.list.filter(i => i.amount < 0)
   
    filteredList.forEach(function (a,i) {
       if (!this[a.title]) {
         this[a.title] = { id:i,title: a.title, amount: 0, date:a.updatedAt};
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
        Sarray.map(i => array2.push({ item:i.title, percent:Math.abs((i.amount / totalSpending).toFixed(4))}))
        
      }
    }


    function getDataEarning(){
     
      let Earray = getEarningSumDuplicateTitleData();
     
      if(Earray){
        Earray.map(i => array3.push({ item:i.title, percent:Math.abs((i.amount / totalEarning).toFixed(4))}))
        
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
 
 

const cols = {
  percent: {
    formatter: (val) => {
      val = Number(val * 100).toFixed(2) + "%";
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
        <AppBar color='secondary' className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              פילוח נתונים
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
        
          <div className={classes.stasWrapper}>
          
          {totalEarning > 0 && (<div style={{display:'flex', flexDirection:'column', height:'100%',  width:'100%'}}>
            <DialogTitle style={{position:'relative', margin:'0 auto', textDecoration:'underline'}}> ₪{' '}{Math.abs(totalEarning).toFixed(2)} :הכנסות</DialogTitle>
            <PieChart data={array3} cols={cols} />
            
            <div className={classes.datagridEarning}>
            <div style={{height:'100%'}}>
              <DataGrid
              columns={[
                { field: 'id', hide:true },
                { field: 'title', width: 130, headerName: 'קטגוריה',align:'right',type:'string' },
                { field: 'amount',
                width: 125, 
                headerName: 'סכום',
                align:'right',type: 'number',
                headerAlign:'center',
                valueFormatter: (params) => {
                  const valueFormatted = Number(params.value).toLocaleString();
                  return `${valueFormatted} ₪`;
                },  },
                { field: 'date',
                width: 125, 
                headerName: 'תאריך',
                align:'right',
                valueFormatter: (params) => {
                  const date = new Date(parseInt(params.value))
                  const valueFormatted = date.toLocaleDateString();
                  return `${valueFormatted}`;
                }, },
                
                ]}
                rows={!getEarningSumDuplicateDataGrid() ? [] : getEarningSumDuplicateDataGrid()}
              />
              </div> 
            </div>
            
            </div>
          )}
            
          {totalSpending < 0 && (<div style={{display:'flex', flexDirection:'column', height:'100%', width:'100%'}}>
            <DialogTitle  style={{position:'relative', margin:'0 auto', textDecoration:'underline'}}> ₪{' '}{ -Math.abs(totalSpending).toFixed(2)} :הוצאות</DialogTitle>
          <PieChart data={array2} cols={cols} />
          
          <div className={classes.datagridSpending}>
          <div style={{height:'100%'}}>
              <DataGrid
              columns={[
                { field: 'id', hide:true },
                { field: 'title', width: 130, headerName: 'קטגוריה',align:'right',type:'string' },
                { field: 'amount',width: 125,
                 headerName: 'סכום',
                 align:'right',
                 type: 'number',
                 headerAlign:'center',
                 valueFormatter: (params) => {
                  const valueFormatted = Number(params.value).toLocaleString();
                  return `${valueFormatted} ₪`;
                }, 
              },
                { field: 'date',
                width: 125, 
                headerName: 'תאריך',
                align:'right',
                valueFormatter: (params) => {
                  const date = new Date(parseInt(params.value))
                  const valueFormatted = date.toLocaleDateString();
                  return `${valueFormatted}`;
                }, },
                
                ]}
                rows={!getSpendingSumDuplicateDataGrid() ? [] : getSpendingSumDuplicateDataGrid()}
              />
             </div>
            </div>
          
          
          </div>) }
          
          </div>
       
       
        </div>
      </Dialog>
    </div>
  );
}