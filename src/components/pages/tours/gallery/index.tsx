import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Slideshow from "yet-another-react-lightbox/plugins/slideshow"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import { Swiper, SwiperSlide } from "swiper/react"
import styled from "styled-components"
import { Navigation, FreeMode, Thumbs } from "swiper/modules"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import { useState } from "react"

import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"

const SwiperStyled = styled(Swiper)`
  border-radius: 10px 10px 0 0;
  height: 80%;
  .swiper-slide {
    background-size: cover;
    background-position: center;
    position: relative;
    border-radius: 20px;
    cursor: default;
  }
`

const SwiperChild = styled(Swiper)`
  padding: 10px 0;
  border-radius: 10px;
  height: 20%;
  .swiper-slide {
    background-size: cover;
    background-position: center;
    width: 25%;
    height: 100%;
    opacity: 0.4;
    &-thumb-active {
      opacity: 1;
    }
  }
`
const photos = ["/tour-1.jpg", "/tour-2.jpg"]

interface Props {
  images: Array<any>
}
const Gallery = (props: Props) => {
  const [open, setOpen] = useState(false)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <>
      <div className="bg-[#fff] rounded-[10px] h-[480px] shadow-md">
        <SwiperStyled loop={true} spaceBetween={10} thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Navigation, Thumbs]} navigation={true}>
          {props?.images?.length > 0 &&
            props?.images?.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <div className="cursor-pointer h-full relative w-full" onClick={open ? () => setOpen(false) : () => setOpen(true)}>
                    {item?.urlImage ? (
                      <Image alt={item?.urlImage} loading="lazy" blurDataURL={item?.urlImage} placeholder="blur" src={item?.urlImage} layout="fill" objectFit="cover" />
                    ) : null}
                  </div>
                </SwiperSlide>
              )
            })}
        </SwiperStyled>
        <SwiperChild
          loop={true}
          watchSlidesProgress={true}
          modules={[Thumbs, Navigation, FreeMode]}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            368: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10
            }
          }}
        >
          {props?.images?.length > 0 &&
            props?.images?.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <div className="cursor-pointer relative h-full w-full">
                    {item?.urlImage ? (
                      <Image alt={item?.urlImage} loading="lazy" blurDataURL={item?.urlImage} layout="fill" placeholder="blur" src={item?.urlImage} objectFit="cover" />
                    ) : null}
                  </div>
                </SwiperSlide>
              )
            })}
        </SwiperChild>
      </div>
      <div className="lightbox">
        <Lightbox
          open={open}
          slides={props?.images?.map((item: any) => {
            return { src: item?.urlImage }
          })}
          close={() => setOpen(false)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </div>
    </>
  )
}

export default Gallery
