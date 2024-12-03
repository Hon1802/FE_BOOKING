import Image from "next/image"

const TourList = () => {
  return (
    <div className="my-[100px]">
      <div className="text-[33px] mb-[20px] font-bold leading-[33px] text-center uppercase">Tour list</div>
      <div className="flex justify-center gap-[50px] container flex-wrap">
        <a href="/tours?type=Northern+Vietnam">
          <div className="w-[245px] h-[290px] relative card-translateX overflow-hidden">
            <div className="hidden__img">
              <Image src="/tour-1.jpg" layout="fill" alt="image" />
              <div className="absolute bottom-[30px] text-white left-0 text-[17px] z-[2] bg-[#000] opacity-[0.5] px-2 py-1">
                <div className="uppercase line-clamp-1 font-bold">Northern VN</div>
              </div>
            </div>
          </div>
        </a>
        <a href="/tours?type=Central+Vietnam">
          <div className="w-[245px] h-[290px] relative card-translateX overflow-hidden">
            <div className="hidden__img">
              <Image src="/tour-2.jpg" layout="fill" alt="image" />
              <div className="absolute bottom-[30px] text-white left-0 text-[17px] z-[2] bg-[#000] opacity-[0.5] px-2 py-1">
                <div className="uppercase line-clamp-1 font-bold">Central VN</div>
              </div>
            </div>
          </div>
        </a>
        <a href="/tours?type=Southern+Vietnam">
          <div className="w-[245px] h-[290px] relative card-translateX overflow-hidden">
            <div className="hidden__img">
              <Image src="/banners/banner-flights.jpg" layout="fill" alt="image" />
              <div className="absolute bottom-[30px] text-white left-0 text-[17px] z-[2] bg-[#000] opacity-[0.5] px-2 py-1">
                <div className="uppercase line-clamp-1 font-bold">Southern VN</div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default TourList
