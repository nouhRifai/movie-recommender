import { CCol, 
    CFormInput, 
    CButton, 
    CRow, 
    CContainer, 
    COffcanvas, 
    COffcanvasHeader, 
    COffcanvasTitle, 
    CCloseButton,
    COffcanvasBody,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CCard,
    CCardImage,
    CCardBody,
    CCardTitle,
    CCardText, 
    } from '@coreui/react';
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

const FormRecommandationContenu = () => {
    
    const [movieTitle,setMovieTitle] = useState('');
    const [foundMovies,setFoundMovies] = useState({});
    const [showFoundMovies,setShowMovies] = useState(false);
    const [iterableMovies,setIterableMovies] = useState([]);
    const [chosenMovie,setChosenMovie] = useState('');
    const [visible, setVisible] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [recommandedMovies,setRecommandedMovies] = useState([]);

    
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
            const response = await axios.get('http://localhost:5000/?movieTitle='+movieTitle)
            setFoundMovies(response.data.message);
        }
    }
    const recommand = async  () => {
        //before sending a request to the backend
        //we have to check if input is empty
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
            const response = await axios.get('http://localhost:5000/recommandC/?movieTitle='+chosenMovie)
            setRecommandedMovies(response.data.message.split('//'));
            console.log(response.data.message.split('//'));
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
        if(recommandedMovies.length>0){
            setVisibleModal(true);
        }
    },[recommandedMovies]);

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
                <CModalTitle>Recommanded Movies</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <hr/>
                <h2>
                    Based on the overview
                </h2>
                <hr/>
                <CRow className='row-form'>
                    {}
                        <CCol xs={6} md={2} >
                            <CCard >
                                <CCardImage orientation="top" src="/images/react.jpg" />
                                <CCardBody>
                                    <CCardTitle>Card title</CCardTitle>
                                    <CCardText>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </CCardText>
                                </CCardBody>
                            </CCard>
                        </CCol> 
                </CRow>
                <hr/>
                <h2>
                    Based on actors, director, genre and keywords
                </h2>
                <hr/>
                <CRow className='row-form'>
                    {}
                        <CCol xs={6} md={2} >
                            <CCard >
                                <CCardImage orientation="top" src="/images/react.jpg" />
                                <CCardBody>
                                    <CCardTitle>Card title</CCardTitle>
                                    <CCardText>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </CCardText>
                                </CCardBody>
                            </CCard>
                        </CCol> 
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
                <h5>Recommandation based on movie content</h5>
                <hr/>

                    <span className="centered">{chosenMovie}</span>
                <hr/>
                <CCol xs={12} md={10} className='form-input'>
                    <CFormInput id="movieTitle" placeholder="Movie Title" onChange={change} />
                </CCol>
                
                <CCol xs={12} md={2} className='search' >
                
                    <CButton color='dark'   onClick={search}>Search</CButton> 
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
                <CCol xs={12}  className='place_end'>
                    <CButton color='dark' className='submit' onClick={recommand}>Recommand</CButton> 
                </CCol>
                
            </CRow>
        </CContainer> 
        </>
    );
};

export default FormRecommandationContenu;