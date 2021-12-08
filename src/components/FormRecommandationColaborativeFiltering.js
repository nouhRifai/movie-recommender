
import React, {useState,useEffect} from 'react';
import { CCol, CButton, CRow, CContainer, CModalFooter, CModal, CModalHeader, CModalBody, CCard, CCardBody, COffcanvas, COffcanvasHeader, COffcanvasTitle, CCloseButton, COffcanvasBody, CAlert, CCardTitle, CCardImage, CSpinner } from '@coreui/react';
import { useAuth0 } from '@auth0/auth0-react';
import movies from '../ressources/mv.json';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';


const FormRecommandationColaborativeFiltering = () => {
    const {isAuthenticated,user} = useAuth0();
    const [allMovies,setAllMovies] = useState(movies);
    const filterList = ['0-9','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','Special Characters'];
    const [filteredMovies,setFilteredMovies] = useState([]);
    const [visibleModal,setVisibleModal] = useState(false);
    const [visibleModalRCF,setVisibleModalRCF] = useState(false);
    const [displayFilteredMovies,setDisplayFilteredMovies] = useState(false);
    const [currentPage,setCurrentPage] = useState('0-9');
    const [ratedMovies,setRatedMovies] = useState({});
    const [ratedMoviesIds,setRatedMoviesIds] = useState([]);
    const [showRating,setShowRating] = useState(false);
    const [rate,setRate] = useState(0);
    const [movie2rate,setMovie2rate] = useState({});
    const [visibleOffCanvas, setVisibleOffCanvas] = useState(false);
    const [ratingErrorVisible,setRatingErrorVisible] = useState(false);
    const [ratingErrorMessage, setRatingErrorMessage] = useState('Unfortunatley we couldnt submit your rating!');
    const [countRatedMovies, setCountRatedMovies] = useState(0);
    const [loading, setLoading] = useState(false);
    const [recommandedMoviesCF, setRecommandedMoviesCF] = useState({});


    const showMoviesList = (event) =>{
        const index = filterList[event.target.id];
        setCurrentPage(index);
    }

    const getRatedMovies = async() => {
        const response = await axios.get('https://noahrifai.pythonanywhere.com/ratedMovies/?userId='+user.sub.split('|')[1]);
        const tempMovies = response.data.movies.split('//');
        const tempRating = response.data.ratings.split('//');        
        let mr = []
        for (let i=0; i<tempMovies.length;i++){
            mr[tempMovies[i]] = tempRating[i];
        }
        setRatedMovies(mr);
        setRatedMoviesIds(tempMovies);
    }

    useEffect(() => {
        if(isAuthenticated)
            getRatedMovies();
    },[isAuthenticated]);

    useEffect(() => {
        if(Object.keys(ratedMovies).length>0){
            setDisplayFilteredMovies(true);
            setShowRating(true);
            setCountRatedMovies(Object.keys(ratedMovies).length);
        }
    },[ratedMovies,ratedMoviesIds]);

    
    useEffect(() => {
        //if(filteredMovies.length>0){
        //    setDisplayFilteredMovies(true);
        //}
        console.log(filteredMovies);
    },[filteredMovies]);

    useEffect(() => {
        //console.log(allMovies);
        setFilteredMovies(allMovies[currentPage]);
    },[currentPage]);


    const handleRating = (rate) => {
        
        setRate(rate/20);
      }

    const submitRate = async () => {
        console.log(movie2rate);
        console.log(rate);
        const response = await axios.get('https://noahrifai.pythonanywhere.com/rate/?userId='+user.sub.split('|')[1]+'&movieId='+movie2rate.movieId.toString()+'&rating='+rate)
        if (response.data.status == 'yes'){
            getRatedMovies();
            turnOffOffCanvasOnModal();

        }else{
            setRatingErrorVisible(true);
        }
        
    }

    const turnOnOffCanvasOffModal = () => {    
        setVisibleModal(false);
        setVisibleOffCanvas(true);
    }
    const turnOffOffCanvasOnModal = () => {    
        setVisibleModal(true);
        setVisibleOffCanvas(false);
        setRatingErrorVisible(false);
    }

    const pickMovie = (event) => {
        const id = event.target.id;
        console.log(visibleModal);
        console.log(visibleOffCanvas);
        setMovie2rate(allMovies[currentPage][id]);
    }
    useEffect(() => {
        if (movie2rate && Object.keys(movie2rate).length === 0 && Object.getPrototypeOf(movie2rate) === Object.prototype){
            
        }
        else{
            console.log(movie2rate);
            if (ratedMoviesIds.includes(movie2rate['movieId'].toString())) {
                console.log('match!');
                setRate(parseFloat(ratedMovies[movie2rate['movieId']]));
            }else{
                console.log('nomatch!');
                setRate(0);
            }
            turnOnOffCanvasOffModal();
        }
    },[movie2rate]);

    const recommandCF = async(event) => {
        setLoading(true);
        const response = await axios.get('https://noahrifai.pythonanywhere.com/recommandCF/?userId='+user.sub.split('|')[1]);
        let tempList = {};
        for (let i=0;i<Object.keys(response.data.message['title']).length;i++){
            tempList[response.data.message['title'][i]] = response.data.message['rating'][i];
        }
        setRecommandedMoviesCF(tempList)
    }

    useEffect(() => {
        if (recommandedMoviesCF && Object.keys(recommandedMoviesCF).length === 0 && Object.getPrototypeOf(recommandedMoviesCF) === Object.prototype){
            
        }
        else{
            setLoading(false);
            setVisibleModalRCF(true);
        }
    },[recommandedMoviesCF]);


    return (
        <>
        <CContainer className='container-form'>
        {visibleOffCanvas && (<COffcanvas placement="bottom" visible={visibleOffCanvas} onHide={turnOffOffCanvasOnModal}>
            <COffcanvasHeader>
                <COffcanvasTitle>{movie2rate['title']}</COffcanvasTitle>
                <CCloseButton className="text-reset" onClick={turnOffOffCanvasOnModal} />
            </COffcanvasHeader>
            <COffcanvasBody>
                {(
                    <>
                        {ratingErrorVisible && (<CAlert color="danger">
                                                    {ratingErrorMessage}
                                                </CAlert>
                                                )
                        }
                        <Rating ratingValue={rate} allowHalfIcon={true} readonly={ratedMoviesIds.includes(movie2rate.movieId.toString()) ? true : false}  onClick={handleRating}/>
                        <CButton color='dark' className='submit' onClick={submitRate}>Submit Rate</CButton>
                    </>
                )}
            </COffcanvasBody>
        </COffcanvas>)}
        <CModal visible={visibleModal} onClose={() => setVisibleModal(false)}>
            <CModalHeader onClose={() => setVisibleModal(false)}>
                <h1>Rating Movies</h1>
            </CModalHeader>
            <CModalBody>
                <div className='filters-container'>
                    {filterList.map((filter,i) => (
                        <a key={i} className='filters' id={i} onClick={showMoviesList}>{filter}</a>
                    ))}
                </div>
                <hr/>
                {displayFilteredMovies && (<div className='movies-list'>
                    {filteredMovies.map((m,i)=>
                        (
                        
                        <CCard key={i} style={{ width: '90%', height:'fit-content'  }}>
                            <CCardBody>
                                <h5>{m.title}</h5>
                                <CButton color='dark' className='submit' id={i} onClick={pickMovie}>Rate</CButton>
                            </CCardBody>

                        </CCard>
                        )
                    )}
                </div>)}
            </CModalBody>    
            <CModalFooter>
                <CButton color="secondary" onClick={() => setVisibleModal(false)}>
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
        <CModal visible={visibleModalRCF} onClose={() => setVisibleModalRCF(false)}>
            <CModalHeader onClose={() => setVisibleModalRCF(false)}>
                <h1>Recommended Movies</h1>
            </CModalHeader>
            <CModalBody>
                <CRow className='row-form'>
                    {visibleModalRCF && (<div className='movies-list'>
                        {Object.keys(recommandedMoviesCF).map((m,i)=>
                            (  
                            <CCol xs={6} md={3} style={{display : 'inline-block'}} key={i}>
                                <CCard className={'movie-card'} >
                                    <CCardImage className='poster' orientation="top" src={"../images/movie_poster.jpeg"}>
                                    </CCardImage>
                                    <CCardBody style={{overflow : 'scroll'}}>
                                        <CCardTitle>#{i+1} - {m} : {recommandedMoviesCF[m]}</CCardTitle>
                                    </CCardBody>
                                </CCard>
                            </CCol> 
                            )
                        )}
                    </div>)}
                </CRow>
            </CModalBody>    
            <CModalFooter>
                <CButton color="secondary" onClick={() => setVisibleModalRCF(false)}>
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
            <CRow className='row-form'>
                <h5>Recommendation based on users preferences</h5>
                <hr/>
                {!isAuthenticated 
                    ? (<span className='text'>(You need to login!)</span>)
                    : (<span className='text'>(You have rated {countRatedMovies} movies so far!)
                        {(countRatedMovies>=20) 
                            ? 'Good to go !' 
                            : 'Still need '+(20-countRatedMovies).toString()+' more!'
                        }
                    </span>)
                }
                
                <CCol xs={12} className='place_end'>
                    <CButton color='dark' className='submit' disabled={!isAuthenticated} onClick={()=>setVisibleModal(true)}>Rate Movies</CButton>
                </CCol>
                <hr/>
                {loading && <div className='spinner'><CSpinner variant="grow"/></div>}
                <CCol xs={12} className='place_end'>
                    <CButton color='dark' className='submit' disabled={isAuthenticated ? (countRatedMovies>=20) ? false : true : false} onClick={recommandCF}>Recommend</CButton>
                    
                </CCol>
                <CCol xs={12} className='place_end'>
                    
                    <CButton color='dark' className='submit' disabled={true}>M-Recommend (Not available in the current version!)</CButton>
                </CCol>
            </CRow>  
        </CContainer>
        </>
    );
};


//still 2 do
//function onclick to recommandeCF
//function onclick to recommandeM and its backend
//loading before showing results





export default FormRecommandationColaborativeFiltering;