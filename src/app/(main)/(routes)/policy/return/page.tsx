import React, { memo } from "react"

const ReturnPolicy = () => {
  const content: any = {
    title: { vi: "Dịch vụ đổi trả", en: "Tour refund & cancellation policy" },
    step: { vi: "Bước", en: "Step" },
    sectionOne: {
      customer: { vi: "Đi công tác rồi làm sao mà có thể đổi/trả hàng được chứ?", en: "How can I exchange / return goods on business trips?" },
      supporter: { vi: "Đừng lo đã có BookingNow hỗ trợ bạn.", en: "Don't worry BookingNow has your back." },
      supporterSub: { vi: "Hãy yên tâm nhé !", en: "Rest assured!" }
    },
    sectionTwo: {
      title: { vi: "ĐỔI TRẢ MIỄN PHÍ TẬN NHÀ", en: "FREE HOME RETURN" },
      heading: { vi: "TRONG VÒNG 60 NGÀY", en: "WITHIN 60 DAYS" }
    },
    sectionThree: {
      title: { vi: "Đối với những sản phẩm bạn đã mua tại", en: "For products you have purchased at" },
      subtitle: {
        vi: "Với những sản phẩm bạn đã mua tại BookingNow, 60 ngày kể từ khi bạn nhận sản phẩm thì bạn sẽ được đổi hàng và trả hàng với bất kỳ lý do gì, bao gồm cả các sản phẩm đã qua sử dụng",
        en: "For products you have purchased at BookingNow, within 60 days from the time you receive the product, you will be able to exchange and return goods for any reason, including used products"
      },
      noteTitle: {
        vi: "Một số lưu ý",
        en: "Some note"
      },
      noteOne: {
        vi: "sẽ không áp dụng đổi trả với 1 số dòng sản phẩm nhất định như: Trái cây, giảm giá,... Tuy nhiên nếu như mà các bạn thực sự cần hỗ trợ thì cứ thử gửi yêu cầu cho CSKH.",
        en: "will not accept returns for certain product lines such as: Fruits, discounts,... However, if you really need support, just try sending a request to BookingNow customer service."
      },
      noteTwo: {
        vi: "Nếu các bạn mua sản phẩm ở sàn TMĐT, thì",
        en: "If you buy products at the e-commerce platform,"
      },
      noteThree: {
        vi: "sẽ áp dụng trước chính sách đổi/trả của sàn, nếu quá hạn của sàn TMĐT thì bạn có thể yêu cầu hỗ trợ từ CSKH của Trung tâm CSKH WOLTECH trực tiếp",
        en: "will apply the exchange/return policy of the platform in advance. If the e-commerce platform's deadline is overdue, you can request support from the WOLTECH Customer Service Center directly"
      }
    },
    sectionFour: {
      title: { vi: "Đối với những sản phẩm Cà phê bạn mua tại đây", en: "For products you have purchased at" },
      noteTitle: {
        vi: "Một số lưu ý",
        en: "Some note"
      },
      noteOne: {
        vi: "sẽ hỗ trợ đổi trả trong vòng 7 ngày đối với dòng sản phẩm cà phê tại TPHCM.",
        en: "will support returns within 7 days for coffee products in Ho Chi Minh City."
      },
      noteTwo: {
        vi: "Các trường hợp đổi trả nhiều xin hãy liên hệ lại với cửa hàng qua kênh hỗ trợ hoặc hotline của cửa hàng.",
        en: "In case of multiple returns, please contact the store via the store's support channel or hotline."
      }
    },
    sectionFive: {
      title: { vi: "CÁC BƯỚC ĐỔI TRẢ", en: "For products you have purchased at" },
      stepOne: {
        vi: "Gửi thông tin và lý do trả hàng về cho nhà bán.",
        en: "Send the information and reason for the return to the seller."
      },
      stepTwo: {
        vi: "Nhận cuộc gọi từ nhà bán hoặc Trung tâm CSKH về vấn đề đổi trả.",
        en: "Receive a call from the seller or Customer Service Center about the return issue."
      },
      stepThree: {
        vi: "Ngay khi xác nhận chúng tôi sẽ gởi bạn đơn hàng mới (hoặc lấy đơn hàng về), bạn chỉ cần gởi hàng cần đổi/trả cho shipper là được.",
        en: "As soon as you confirm that we will send you a new order (or pick up the order), you just need to send the goods to be exchanged / returned to the shipper."
      }
    },
    sectionSix: {
      title: { vi: "Đối với việc đổi trả hàng", en: "For returns" },
      subtitle: {
        vi: "Chúng tôi sẽ hoàn lại số tiền hàng (sau khi đã trừ 25.000 VNĐ phí ship hàng) vào tài khoản mà bạn cung cấp tối đa trong 24h làm việc (không tính thứ 7 & Chủ Nhật) sau khi yêu cầu hoàn tiền được CSKH xác nhận.",
        en: "We will refund the amount (after deducting 25,000 VND shipping fee) to the account you provide within 24 working hours (excluding Saturday & Sunday) after the refund request is confirmed by Customer Service."
      },
      noteTitle: {
        vi: "Lưu ý",
        en: "Note"
      },
      noteTitleTwo: {
        vi: "Chúng tôi làm gì với hàng đổi trả?",
        en: "What do we do with returned goods?"
      },
      noteOne: {
        vi: "BookingNow hỗ trợ đổi trả hàng tối đa 3 lần/1 khách hàng.",
        en: "BookingNow supports returns and exchanges up to 3 times per customer."
      },
      noteTwo: {
        vi: "BookingNow có quyền quyết định dừng việc hỗ trợ đổi trả hàng và trả lại tiền cho khách hàng nếu phát hiện khách hàng sử dụng chính sách để trục lợi (như việc đổi quá nhiều lần).",
        en: "BookingNow has the right to decide to stop supporting returns and refunds to customers if it detects that customers are using the policy for profit (such as exchanging too many times)."
      },
      noteThree: {
        vi: "Quần áo: thu gom và gởi cho các chương trình từ thiện.",
        en: "Clothes: collect and send to charity programs."
      },
      noteFour: {
        vi: "Trái cây, đồ ăn: huỷ bỏ 100%.",
        en: "Fruits, food: cancel 100%."
      }
    }
  }

  return (
    <div className="container w-full h-auto flex-col justify-start items-start gap-5 inline-flex pt-[20px] mt-[140px] mb-[20px]">
      <div className="Frame5276 w-full h-auto relative">
        <div className="text-[40px] font-bold mb-[20px] leading-[54px]">{content.title["en"]}</div>
        <div className="text-xl leading-8 text-black mb-2">
          - Tour cancellation time is calculated for working days, excluding Saturdays, Sundays and holidays.
          <br />- Holiday tours are tours whose time falls on one of the prescribed holidays.
        </div>
        <span className="font-bold text-[24px]">
          1. In case of cancellation due to <span className="font-bold text-blue-900">BookingNow</span>
        </span>
        <div className="text-xl leading-8 text-black mb-2">
          If BookingNow cannot make the trip, BookingNow must immediately notify the customer and refund the customer the entire amount paid within 3 days from the date of notification
          of trip cancellation. Schedule in cash or bank transfer.
        </div>
        <div className="font-bold text-[24px]">2. In case of cancellation by the customer</div>
        <em className="text-xl leading-8 text-black">Tour cancellation conditions:</em>
        <div className="text-xl leading-8 text-black">
          – Tour cancellation from 30 – 45 days before departure date: Tour cancellation fee is 10% of total tour price.
          <br />
          – Tour cancellation from 16 – 29 days before departure date: Tour cancellation fee is 30% of total tour price.
          <br />
          – Cancellation of tour from 08 - 15 days before departure date: Tour cancellation fee is 60% of total tour price.
          <br />
          – Tour cancellation from 04 - 07 days before departure date: Tour cancellation fee is 90% of total tour price.
          <br />
          – Tour cancellation from 01 - 03 days before departure date: Tour cancellation fee is 100% of total tour price.
          <br />
          * Tour cancellation time is calculated for working days, excluding Saturdays, Sundays and holidays.
          <br />
        </div>
        <div className="font-bold text-[24px] mt-2">3. Force majeure cases</div>
        <div className="text-xl leading-8 text-black">
          If the tour program is canceled or changed by either party due to a force majeure reason (fire, weather, accident, natural disaster, war, delay and cancellation of public
          transport means plus...), then both parties will not bear any obligation to compensate for losses that have occurred and will not bear any legal responsibility. However, each
          party is responsible for trying its best to help the injured party to minimize losses caused by force majeure.
        </div>
        <div className="text-xl leading-8 text-black font-bold mt-3">
          Note: Trip cancellation must be notified directly to the Company or via fax or email and must be confirmed by the Company. Cancellations by phone are not accepted.
        </div>
      </div>
    </div>
  )
}

export default memo(ReturnPolicy)
