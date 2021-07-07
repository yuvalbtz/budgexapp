import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import history from '../../../util/history';
 


function Index() {
 const params = useParams()
 const ImageUrl = useSelector(state => state.uiReducer.LightBoxImage.ImageUrl) 
 const open = window.location.pathname === `/myAccounts/${params && params.accountId}/showImage` && ImageUrl    
 
  return (
      <div>
        {open && (
          <Lightbox
            mainSrc={ImageUrl && ImageUrl}
            onCloseRequest={() => history.goBack()}
           />
        )}
      </div>
    );
  
}

export default Index
























