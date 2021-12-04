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
                    <CImage className="d-block w-100" src="../images/react.jpg" alt="slide 1" />
                    <CCarouselCaption className="d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className="d-block w-100" src="/images/react.jpg" alt="slide 2" />
                    <CCarouselCaption className="d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className="d-block w-100" src="/images/react.jpg" alt="slide 3" />
                    <CCarouselCaption className="d-none d-md-block">
                    <h5>Third slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                </CCarouselItem>
            </CCarousel>   
        </>
    );
};
export default Carousel;