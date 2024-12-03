import { convertDateDefaultV3 } from "@/utilities/ConvertDate"

const renderVehicle = (type: string) => {
  switch (type) {
    case "FLIGHT":
      return "Flight"
    case "Car":
      return "Car"
    default:
      return "There is currently no vehicle"
  }
}

const InfoComponent = ({ hotel, transportation, detail }: any) => {
  return (
    <>
      <div className="w-full mb-5 relative flex flex-col gap-2">
        <div className="text-red-500 font-bold">Departure date: {convertDateDefaultV3(detail?.estimatedTime)}</div>
        <div>Vehicle: {renderVehicle(transportation?.type)}</div>
        {transportation?.hotel && <div>Hotel: {hotel?.hotelName}</div>}
        <div>Starting location: {transportation?.departure || "---"}</div>
        <div>Destination: {transportation?.destination || "---"}</div>
      </div>
    </>
  )
}

export default InfoComponent
