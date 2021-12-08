import {
    CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCloseButton, CCol, CContainer, CFormInput, CModal, CModalBody,
    CModalFooter, CModalHeader,
    COffcanvas, COffcanvasBody, COffcanvasHeader,
    COffcanvasTitle, CRow, CSpinner
} from '@coreui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const FormRecommandationContenu = () => {
    
    const [movieTitle,setMovieTitle] = useState('');
    const [foundMovies,setFoundMovies] = useState({});
    const [showFoundMovies,setShowMovies] = useState(false);
    const [iterableMovies,setIterableMovies] = useState([]);
    const [chosenMovie,setChosenMovie] = useState('');
    const [visible, setVisible] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [recommendedMovies,setRecommendedMovies] = useState([]);
    const [recommendedMoviesIds,setRecommendedMoviesIds] = useState([]);
    const [recommendedMovies2,setRecommendedMovies2] = useState([]);
    const [recommendedMoviesIds2,setRecommendedMoviesIds2] = useState([]);
    const [postersPaths,setPostersPaths] = useState([]);
    const [postersPaths2,setPostersPaths2] = useState([]);
    const [loading, setLoading] = useState(false);

    
    const change = (event) => {
        setMovieTitle(event.target.value);
    }

    const search = async  () => {
        //before sending a request to the backend
        //we have to check if input is empty
        let go = false;
        if (movieTitle.length==0){
            setVisible(true)
            setErrorMessage({'error':'No Movie Title',
                            'errorMessage':'Please make sure that you fill the movie title field in order to make a search!'
                            })
        }
        else
            go = true;
        
        //now that we checked we will send a get request to our backend  
        if (go){
            const response = await axios.get('https://noahrifai.pythonanywhere.com/?movieTitle='+movieTitle)
            setFoundMovies(response.data.message);
        }
    }
    const recommand = async  () => {
        //before sending a request to the backend
        //we have to check if input is empty
        setLoading(true);
        let go = false;
        if (chosenMovie.length==0){
            setVisible(true)
            setErrorMessage({'error':'No chosen movie',
                            'errorMessage':'Please make sure that you choose a movie after searching for it!'
                            })
        }
        else
            go = true;
        
        //now that we checked we will send a get request to our backend  
        if (go){
            const response = await axios.get('https://noahrifai.pythonanywhere.com/recommandC/?movieTitle='+chosenMovie)
            //setRecommandedMovies(response.data.message.split('//'));
            console.log(response);
            const resList = response.data.message.split('//');
            setRecommendedMovies(resList.slice(0,resList.length/2));
            setRecommendedMoviesIds(resList.slice(resList.length/2,resList.length));
            const resList2 = response.data.message2.split('//');
            setRecommendedMovies2(resList2.slice(0,resList2.length/2))
            setRecommendedMoviesIds2(resList2.slice(resList2.length/2,resList2.length))
        }
    }



    const chooseMovie = async  (event) => {
        let i = parseInt(event.target.id);
        console.log(i);
        setChosenMovie(iterableMovies[i][0]);
        setIterableMovies([]);
        setMovieTitle('');
    }

    useEffect(() => {
        //console.log(foundMovies);
        
        if (foundMovies && Object.keys(foundMovies).length === 0 && Object.getPrototypeOf(foundMovies) === Object.prototype){

        }
        else{
            let foundMoviesArray = [];
            Object.keys(foundMovies).forEach((key)=>{
                let temp = [];
                Object.keys(foundMovies[key]).forEach(key2 =>{
                    temp.push(foundMovies[key][key2]);
                })
                foundMoviesArray.push(temp);
            })
            let temp = [];
            for (let i=0; i<foundMoviesArray[0].length; i++){
                temp.push([foundMoviesArray[1][i],foundMoviesArray[0][i],""+foundMoviesArray[2][i]])
            }
            setIterableMovies(temp)
        }
    },[foundMovies]);

    useEffect(() => {
        if (iterableMovies && Object.keys(iterableMovies).length === 0 && Object.getPrototypeOf(iterableMovies) === Object.prototype)
            setShowMovies(false);
        else{
            setShowMovies(true);
            
        }
    },[iterableMovies]);

    useEffect(() => {
        
    },[chosenMovie]);

    useEffect(() => {
        if(recommendedMovies.length>0){
            //setVisibleModal(true);
        }
    },[recommendedMovies]);


    const recommender = async () => {
        let paths = [];
        for (const id of recommendedMoviesIds){
            let path='';
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/'+parseInt(id)+'?api_key=1c428cb02c52e5c275359bf1f5d04239&language=en-US');
                path = response.data.poster_path;
            } catch (error) {
                console.log(error);
                path = null;
            }
            
            if (path==null){
                paths.push('../images/movie_poster.jpeg');
            }
            else{
                paths.push('https://image.tmdb.org/t/p/original'+path);
            }
        }
        setPostersPaths(paths);    
    }
    const recommender2 = async () => {
        let paths = [];
        for (const id of recommendedMoviesIds2){
            let path='';
            
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/'+parseInt(id)+'?api_key=1c428cb02c52e5c275359bf1f5d04239&language=en-US');
                path = response.data.poster_path;
            } catch (error) {
                console.log(error);
                path = null;
            }


            if (path==null){
                paths.push('../images/movie_poster.jpeg');
            }
            else{
                paths.push('https://image.tmdb.org/t/p/original'+path);
            }
        }
        setPostersPaths2(paths);    
    }

    useEffect(() => {
        if(recommendedMoviesIds.length>0){
            recommender();
        }
        if(recommendedMoviesIds2.length>0){
            recommender2();
        }
    },[recommendedMoviesIds,recommendedMoviesIds2]);

    useEffect(() => {
        //console.log(postersPaths)
        if((postersPaths.length > 9)&&(postersPaths2.length > 9)){
            setLoading(false);
            setVisibleModal(true);
        }
    },[postersPaths,postersPaths2]);

    return (
        <>
        <COffcanvas placement="top" visible={visible} onHide={() => setVisible(false)}>
        <COffcanvasHeader>
            <COffcanvasTitle>{errorMessage['error']}</COffcanvasTitle>
            <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
            {errorMessage['errorMessage']}
        </COffcanvasBody>
        </COffcanvas>
        <CModal visible={visibleModal} onClose={() => setVisibleModal(false)}>
            <CModalHeader onClose={() => setVisibleModal(false)}>
                <h1>Recommended Movies</h1>
            </CModalHeader>
            <CModalBody>
                <hr/>
                <h2>
                    Based on the overview
                </h2>
                <hr/>
                <CRow className='row-form'>
                    {recommendedMovies.map((movieTitle,i)=>{
                        return (
                            <CCol xs={6} md={3} key={i}>
                                <CCard className={'movie-card'} >
                                    <CCardImage className='poster' orientation="top" src={postersPaths[i]}>
                                    </CCardImage>
                                    <CCardBody>
                                        <CCardTitle>#{i+1} - {movieTitle}</CCardTitle>
                                    </CCardBody>
                                </CCard>
                            </CCol> 
                        )
                    })}
                        
                </CRow>
                <hr/>
                <h2>
                    Based on actors, director, genre and keywords
                </h2>
                <hr/>
                <CRow className='row-form'>
                    {recommendedMovies2.map((movieTitle,i)=>{
                        return (
                            <CCol xs={6} md={3} key={i}>
                                <CCard className={'movie-card'} >
                                    <CCardImage className='poster' orientation="top" src={postersPaths2[i]}>
                                    </CCardImage>
                                    <CCardBody>
                                        <CCardTitle>#{i+1} - {movieTitle}</CCardTitle>
                                    </CCardBody>
                                </CCard>
                            </CCol> 
                        )
                    })}
                        
                </CRow>
                
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setVisibleModal(false)}>
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
        <CContainer className='container-form'>
            <CRow className='row-form'>
                <h5>Recommendation based on movie content</h5>
                <hr/>

                    <span className="centered">{chosenMovie}</span>
                <hr/>
                <CCol xs={12} className='form-input'>
                    <CFormInput id="movieTitle" placeholder="Movie Title" onChange={change} />
                </CCol>
                
                <CCol xs={12} className='search' >
                
                    <CButton color='dark' className='search'  onClick={search}>Search</CButton> 
                </CCol>
                <hr/>
                <PerfectScrollbar className='scroll-area'>
                    {!showFoundMovies 
                        ? (<span>No match!</span>)
                        : iterableMovies.map((movie,i) => {
                            return (<p key={i}>
                                <b>{movie[0]}</b> ({movie[2]}) : {movie[1]} 
                                <a id={i} onClick={(i)=>chooseMovie(i)}>  Choose...</a>
                            </p>)
                        })
                    }
                </PerfectScrollbar>
                
                <hr/>
                {loading && <div className='spinner'><CSpinner variant="grow"/></div>}
                <CCol xs={12}  className='place_end'>
                    <CButton color='dark' className='submit' onClick={recommand}>Recommend</CButton> 
                </CCol>
                
            </CRow>
        </CContainer> 
        </>
    );
};

export default FormRecommandationContenu;