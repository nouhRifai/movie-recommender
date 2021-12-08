import React from 'react';
import { CCarousel,
        CCarouselItem,
        CCarouselCaption,
        CImage,

    } from '@coreui/react';

const Carousel = () => {
    return (
        <>
            <CCarousel controls indicators>
                <CCarouselItem>
                    <CImage className="d-block w-100" src="../images/caroussel1.jpg" alt="slide 1" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className="d-block w-100" src="/images/caroussel2.jpg" alt="slide 2" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className="d-block w-100" src="/images/caroussel3.jpg" alt="slide 3" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className="d-block w-100" src="/images/caroussel4.jpg" alt="slide 4" />
                </CCarouselItem>
            </CCarousel>   
        </>
    );
};
export default Carousel;