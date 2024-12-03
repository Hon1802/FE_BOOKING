import BannerSlider from "@/components/pages/home/banner-slider"
import HotTour from "@/components/pages/home/hot-tour"
import Counting from "@/components/pages/home/counting"
import LatestTour from "@/components/pages/home/latest-tour"
import TourList from "@/components/pages/home/tour-list"

export default function Home() {
  return (
    <div className="mb-6">
      <BannerSlider />
      <HotTour />
      <Counting />
      <LatestTour />
      <TourList />
    </div>
  )
}
