import React,{useState, useEffect} from 'react'
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Axios from 'axios'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks';
import {useSelector} from 'react-redux'

function Index({accountId, itemId}) {
   
  const [fileSelected, setFileSelected] = useState(null)
  const [imageMutation ,setImageMutation] = useState('')
  const [loading ,setLoading] = useState(false)
  
  const getUsername = useSelector(state => state.userReducer.userDetails)

  const formData = new FormData()
  
   const [updateItemImage,{data}] = useMutation(ADD_ITEM_IMAGE_MUTATION, {
       variables:{ 
           accountId,
           itemId,
           imageURL:imageMutation},
    onCompleted:() => {
        setLoading(false) }, 
        refetchQueries:[{query:GET_USER_ACCOUNT, variables:{accountId}}]})
        



   useEffect(() =>{ 
 
        if(fileSelected){
          formData.append('file', fileSelected)
          formData.append('upload_preset','temed3va')
          formData.append('folder',`Users/${getUsername.username}/myAccounts/${accountId}/${itemId}`)
          
          Axios.post("https://api.cloudinary.com/v1_1/dw4v5axnj/image/upload/",formData)
          .then(res => {
            setLoading(true)
            setImageMutation(res.data.secure_url) 
            console.log(res.data);
            updateItemImage()
            
           
            
        }).catch(err => console.log(err)) 
        
          console.log(imageMutation);
        }
      } 
          ,[fileSelected]) 



          
   
    function handleFileChanged(e){
        e.preventDefault() 
        setLoading(true)
        setFileSelected(e.target.files[0])
        console.log('loading', loading);
       
       
    }
   
   return (
        <>
        <input name="file" accept="image/*" hidden id={`icon-button-file-image-${itemId}`} type="file" onChange={handleFileChanged} />
        <label htmlFor={`icon-button-file-image-${itemId}`} style={{position:'absolute', bottom:-2, left:0, transform:'translate(6%, -14%)' }}>
        
      <IconButton color='inherit' size='small' disabled={loading} style={{backgroundColor:'white'}} aria-label="upload picture" component="span">
      { loading  ?  <CircularProgress color='secondary' size={20}/> : <AddAPhotoRoundedIcon style={{fontSize:'18px'}} /> } 
        </IconButton>
       </label>
      </>
    )
}

export default Index



const ADD_ITEM_IMAGE_MUTATION = gql`

mutation addItemImage($accountId:ID!, $itemId:ID!, $imageURL:String!){
    addItemImage(accountId:$accountId, itemId:$itemId, imageURL:$imageURL)
}

`; 

const GET_USER_ACCOUNT = gql`

    query($accountId:ID!){
        getUserAccount(accountId:$accountId){
            title
            id
            owner
            list{
              id
              title
              description
              media
              amount
              createdAt
            }
        }  
      }


`;