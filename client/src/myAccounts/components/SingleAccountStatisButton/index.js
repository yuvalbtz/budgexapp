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
import { DialogTitle, useMediaQuery, useTheme } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import history from '../../../util/history';
import { DataGrid } from '@material-ui/data-grid';
import NumericLabel from 'react-pretty-numbers';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
  flex: 1,
  wordBreak:'break-word'
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
    margin:'0 auto',
   
     [theme.breakpoints.up('sm')]:{
      width:'90%'
     },
     
  },

  datagridSpending:{
    height:400, 
    width: '100%', 
    margin:'0 auto',
    
    
     [theme.breakpoints.up('sm')]:{
      width:'90%'
     },
    

  }

}));


const PieChart = ({data, cols}) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
   
    <Chart 
    height={'50%'} 
    width={'100%'}  
    
    data={data} 
    scale={cols} 
    interactions={['element-single-selected']} 
    autoFit>
		<Coordinate type="theta" radius={matches ? 0.70 : 0.40} />
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
              offset: 10,
							content: (data) => {
								return `${data.item} ${Number(data.percent * 100).toFixed(1)}%`;
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
  const params = useParams()
  
  const accountData = useSelector(state => state.uiReducer.getCurrentAccountUi)
  
 
    function getSpendingSumDuplicateTitleData(){
      let array2 = []
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
     
     result.map(i => array2.push({ item:i.title, percent:Math.abs((i.amount / totalSpending).toFixed(4))})) 
     
     return array2    
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
      let array3 =[]
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
     result.map(i => array3.push({ item:i.title, percent:Math.abs((i.amount / totalEarning).toFixed(4))})) 
      return array3    
   }
    
     
    }
   

  const classes = useStyles();
  const open = window.location.pathname === `/myAccounts/${params.accountId}/statis`

  

  const handleClose = () => {
    history.goBack()
  };

 
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
              פילוח נתונים - &apos;&apos;{accountData && accountData.title}&apos;&apos;
            </Typography>
          </Toolbar>  
        </AppBar>
       
        <div style={{height:'100%', width:'100%'}} dir='ltr' >
           
           <Typography 
           variant='h5'
           style={{
             textDecoration:'underline',
             color:`${Number(totalEarning + totalSpending).toFixed(2) > 0  ? 'green' : 'red'}`,
            }}
           >
           ₪ {accountData ? ( <NumericLabel params={FormatOptions}>{Number(totalEarning + totalSpending).toFixed(2)}</NumericLabel>) : 'calculate...' } :מאזן נוכחי
           </Typography>
        
          <div className={classes.stasWrapper}>
          
          {totalEarning > 0 && (<div style={{display:'flex', flexDirection:'column', height:'100%',  width:'100%'}}>
            <DialogTitle style={{position:'relative', margin:'0 auto', textDecoration:'underline'}}>₪ <NumericLabel params={FormatOptions}>{Math.abs(totalEarning).toFixed(2)}</NumericLabel> :הכנסות</DialogTitle>
            <PieChart data={!getEarningSumDuplicateTitleData() ? [] : getEarningSumDuplicateTitleData()} cols={cols} />
            
            <div className={classes.datagridEarning}>
            <div style={{height:'100%'}}>
              <DataGrid
              columns={[
                { 
                  field: 'date',
                  headerName: 'תאריך',
                  align:'right',
                  flex: 0.9,
                  width: 125,
                  headerAlign:'right',
                  valueFormatter: (params) => {
                    const date = new Date(parseInt(params.value))
                    const valueFormatted = date.toLocaleDateString();
                    return `${valueFormatted}`;
                  }, 
                },
                { 
                  field: 'amount', 
                  headerName: 'סכום',
                  flex: 1,
                  width: 125,
                  align:'right',type: 'number',
                  headerAlign:'right',
                  valueFormatter: (params) => {
                    const valueFormatted = Number(params.value).toLocaleString();
                    return `₪ ${valueFormatted}`;
                  },  
                },
                { 
                  field: 'title', 
                  flex: 1,
                  width: 130,
                  headerName: 'קטגוריה',
                  align:'right',
                  type:'string',
                  headerAlign:'right' 
                },
                { 
                  field: 'id', 
                  hide:true 
                },
                
               
               
                
                ]}
                rows={!getEarningSumDuplicateDataGrid() ? [] : getEarningSumDuplicateDataGrid()}
              />
              </div> 
            </div>
            
            </div>
          )}
            
          {totalSpending < 0 && (<div style={{display:'flex', flexDirection:'column', height:'100%', width:'100%'}}>
            <DialogTitle  style={{position:'relative', margin:'0 auto', textDecoration:'underline'}}>₪ <NumericLabel params={FormatOptions}>{-Math.abs(totalSpending).toFixed(2)}</NumericLabel> :הוצאות</DialogTitle>
          <PieChart data={!getSpendingSumDuplicateTitleData() ? [] : getSpendingSumDuplicateTitleData() } cols={cols} />
          
          <div className={classes.datagridSpending}>
          <div style={{height:'100%'}}>
              <DataGrid
              
              columns={[
                { 
                field: 'date',
                width: 125, 
                headerName: 'תאריך',
                flex: 0.9,
                align:'right',
                headerAlign:'right',
                valueFormatter: (params) => {
                  const date = new Date(parseInt(params.value))
                  const valueFormatted = date.toLocaleDateString();
                  return `${valueFormatted}`;
                }, 
              },
                { 
                  field: 'amount',
                  width: 125,
                  flex: 1,
                   headerName: 'סכום',
                   align:'right',
                   type: 'number',
                   headerAlign:'right',
                   valueFormatter: (params) => {
                    const valueFormatted = Number(params.value).toLocaleString();
                    return `₪ ${valueFormatted} `;
                  }, 
                },
                
               
              { 
                field: 'title', 
                width: 130, 
                flex: 1,
                headerName: 'קטגוריה',
                align:'right',
                type:'string',
                headerAlign:'right', 
              },
                
                { 
                  field: 'id', 
                  hide:true 
                },
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