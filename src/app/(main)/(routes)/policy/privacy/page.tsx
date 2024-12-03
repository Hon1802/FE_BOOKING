import React, { memo } from "react"
import Link from "next/link"
import { BASE_CONSTANTS, DEFAULT_EMAIL } from "@/constants/base.constant"

const ReturnPolicy = () => {
  const content: any = {
    title: { vi: "Chính sách bảo mật thông tin cá nhân", en: "Privacy policy of personal information" }
  }

  return (
    <div className="container w-full h-auto flex-col justify-start items-start gap-5 inline-flex pt-[20px] mt-[140px] mb-[20px]">
      <div className="Frame5276 w-full h-auto relative">
        <div className="text-[40px] font-bold mb-[20px] leading-[54px]">{content.title["en"]}</div>

        <>
          <div className="text-xl leading-8 text-black mt-[10px] flex flex-col gap-4">
            <div className="font-bold">1. Purpose of personal information collection</div>
            <div>
              &emsp;The collection on BookingNow E-commerce Platform mainly includes: full name, email, phone number, address of customer. This is the information that we require
              members to provide when sending information for consultation or wanting to buy products and for us to contact customers to confirm on the E-commerce Platform to ensure
              consumer rights.
            </div>
            <div>
              &emsp;In addition, members are responsible for promptly notifying our E-commerce Platform of any unauthorized use, abuse, security breach, or retention of third-party
              registration names and passwords for appropriate action.
            </div>
          </div>
          <div className="text-xl leading-8 text-black mt-[10px] flex flex-col gap-4">
            <div className="font-bold">2. Scope of collection</div>
            <div>&emsp;We use the information members provide to:</div>
            <ul className="list-disc pl-[40px]">
              <li>Contact to confirm order and deliver to member upon receiving request from member;</li>
              <li>Provide product information to customers upon request;</li>
              <li>Send marketing emails, promotions about related products and knowledge;</li>
              <li>Send notifications about activities on the E-commerce Platform;</li>
              <li>Contact and resolve with users in special cases;</li>
              <li>When requested by judicial authorities including: Procuracy, court, police investigation agency related to any illegal behavior of the customer.</li>
            </ul>
          </div>
          <div className="text-xl leading-8 text-black mt-[10px] flex flex-col gap-4">
            <div className="font-bold">3. Information retention period</div>
            <div>
              &emsp;
              {
                "Member's personal data will be stored until the administrator requests cancellation. In all other cases, member's personal information will be kept confidential on our server."
              }
            </div>
          </div>

          <div className="text-xl leading-8 text-black mt-[10px] flex flex-col gap-4">
            <div className="font-bold">4. The people or organizations that may have access to that information</div>
            <ul className="list-disc pl-[40px]">
              <li>The information collected from members will be accessed by the administration.</li>
              <li>Authorities upon request.</li>
            </ul>
          </div>

          <div className="text-xl leading-8 text-black mt-[10px] flex flex-col gap-4">
            <div className="font-bold">
              5. Address of the information collection and management unit, including contact methods so that consumers can inquire about the collection and processing of information
              related to them.
            </div>
            <ul className="list-disc pl-[40px]">
              <li>BookingNow</li>
              <li>Address: 01 Street Vo Van Ngan, Thu Duc City</li>
              <li className="word-break">Email: {DEFAULT_EMAIL}</li>
            </ul>
          </div>

          <div className="text-xl leading-8 text-black mt-[10px] flex flex-col gap-4">
            <div className="font-bold">6. Methods and devices for consumers to approach and update their personal data on e-commerce system of information collection unit</div>
            <ul className="list-disc pl-[40px]">
              <li>
                Members have the right to check, update, adjust or cancel their personal information by contacting the management board of{" "}
                <span className="font-bold">E-commerce Platform</span> to do this.
              </li>
              <li>
                Members have the right to submit complaints about information security content, please contact the Management Board of{" "}
                <span className="font-bold">E-commerce Platform</span>. When receiving these feedbacks, we will confirm the information, if it is true as reflected by the member,
                depending on the level, we will have timely handling measures.
              </li>
            </ul>
          </div>

          <div className="text-xl leading-8 text-black mt-[10px] flex flex-col gap-4">
            <div className="font-bold">
              7. Mechanism for receiving and resolving consumer complaints related to personal information being used for purposes other than those notified
            </div>
            <ul className="list-disc pl-[40px]">
              <li>
                {
                  "Members' personal information is committed to absolute confidentiality according to the personal information protection policy. The collection and use of each member's information is only carried out with the consent of that customer, except in cases where the law provides otherwise."
                }
              </li>
              <li>{"Do not use, transfer, provide or disclose to any third party any member's personal information without the member's consent."}</li>
              <li>
                {
                  "In case the server storing information is hacked, leading to loss of member's personal data, we will be responsible for reporting the incident to the authorities for timely investigation and notification to members."
                }
              </li>
              <li>Absolute security of all online transaction information of members including accounting invoice information and digitized documents</li>
              <li>
                The Management Board requires individuals to provide full relevant personal information when registering/purchasing such as: Full name, contact address, email, phone
                number, etc., and is responsible for the legality of the above information. The Management Board is not responsible for and will not resolve any complaints related to
                the rights of that member if it is determined that all personal information provided by that member when initially registering is incorrect.
              </li>
            </ul>
          </div>
        </>
      </div>
    </div>
  )
}

export default memo(ReturnPolicy)
