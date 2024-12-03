import React, { memo } from "react"
import { BASE_CONSTANTS, DEFAULT_EMAIL } from "@/constants/base.constant"

const ReturnPolicy = () => {
  const content: any = {
    title: { vi: "Điều khoản sử dụng", en: "Terms of use" }
  }

  return (
    <div className="container w-full h-auto flex-col justify-start items-start gap-5 inline-flex pt-[20px] mt-[140px] mb-[20px]">
      <div className="Frame5276 w-full h-auto relative">
        <div className="text-[40px] font-bold mb-[20px] leading-[54px]">{content.title["en"]}</div>

        <div className="flex flex-col text-xl leading-8 text-black">
          <div className="w-full font-bold leading-[160%] text-slate-950 max-md:max-w-full">I. INTRODUCTION</div>
          <div className="mt-2.5 w-full max-md:max-w-full">
            Welcome to BookingNow. Before registering for an account or using BookingNow{`'`}s services, please carefully read the following Terms of Use and the Operation Regulations
            of BookingNow e-commerce platform here to understand your legal rights and obligations towards BookingNow and its affiliates and subsidiaries (hereinafter collectively
            referred to as {`"`} we{`"`}).
            <br /> <br />
            The {`"`}Service{`"`} we provide includes content posted on the BookingNow website and tools, features, information, links, linked applications and any new features or
            content added or further developed are covered by these Terms of Service. BookingNow e-commerce platform service is an online e-commerce center serving the needs of
            introduction, sales and online shopping between Buyers and Sellers collectively referred to as Customers. Sellers and Buyers enter into contracts on BookingNow E-commerce
            Platform on the basis of respecting the principle of voluntary freedom, respecting the legitimate rights and interests of the parties involved in the sale and purchase of
            products and services and not contrary to the provisions of law. The Contract of Sale is actually directly between the Buyer and the Seller. Buyer and Seller shall be
            responsible for their obligations including but not limited to: listing products, warranty obligations, payment obligations. BookingNow is an intermediary in the sale and
            purchase of goods between Buyers and Sellers and manages transportation between related parties.
          </div>
          <div className="mt-2.5 w-full font-bold leading-[160%] text-slate-950 max-md:max-w-full">II. TERMS OF USE</div>
          <div className="mt-2.5 w-full max-md:max-w-full">
            The right to use BookingNow and the Services is effective until terminated. The right to use will be terminated in accordance with these Terms of Service or in case the
            Customer violates any of the terms or conditions specified in these Terms of Service. In such event, BookingNow may terminate Customer{`'`}s use with or without notice.
          </div>
          <div className="mt-5 w-full max-md:max-w-full">
            Customers are not allowed to:
            <br /> <br /> - Upload, post, transmit or otherwise make public any content that is unlawful, harmful, threatening, abusive, harassing, confusing, disturbing,
            misrepresenting, defamatory, offensive, obscene, libelous, invasive of another{`'`}s privacy, hateful, or racially discriminatory, ethnicity or any other inappropriate
            content;
            <br /> - Post, transmit, or in any other way display any content featuring minors or use the Services that harms minors in any way;
            <br /> - Use the Services or post Content to impersonate any person or entity, or otherwise misrepresent a person or entity;
            <br /> - Use the Services or post Content for fraudulent, unreasonable, false, misleading or misleading purposes
            <br /> - Open and operate various accounts in connection with any violation of the terms or spirit of these Terms of Service;
            <br /> - Commit fraudulent acts to profit from opening an account and using BookingNow Services
            <br /> - Access the BookingNow e-commerce trading platform, open an account or otherwise access its user account through any software or hardware not approved or provided by
            BookingNow, including emulator software, emulators, automated software or any software, which device or hardware has similar functionality.
            <br /> - Exploit or collect, store any information related to another Customer{`'`}s Account, including any personal information or data;
            <br /> - Upload, email, post, transmit or otherwise make public any Content that you are not permitted under any law or contractual or trust relationship (such as insider,
            proprietary and confidential information known or disclosed as part of an employment relationship or under confidentiality agreements);
            <br /> - Upload, email, post, transmit or otherwise make public any Content that would infringe any patent, trademark, trade know-how, copyright or any privilege of any
            party;
            <br /> - Upload, email, post, transmit or otherwise publicize any unauthorised or illegal advertising, promotional materials, {`"`}harassment letters{`"`}, {`"`}spam
            {`"`}, {`"`}string letters{`"`}, or any other unauthorized form of solicitation;
            <br /> - Take any action or conduct that could directly or indirectly destroy, disable, overburden, or impair the Services or servers or systems associated with them;
            <br /> - Use the Services to invade the privacy of others or to {`"`}stalk{`"`} or otherwise harass others;
            <br /> - Infringe on BookingNow{`'`}s rights, including any intellectual property rights, and cause confusion to those rights;
            <br />- List goods that infringe the copyrights, trademarks or other intellectual property rights of third parties or use the Services in ways that may infringe the
            intellectual property rights of other parties.
          </div>
          <div className="mt-5 w-full max-md:max-w-full">
            Customer understands that Content, whether publicly posted or privately transmitted, is the sole responsibility of the person who created it.
            <br />
            Customer agrees that BookingNow and its designees have the right to (but have no obligation) to screen, refuse, remove, stop, suspend, remove or displace any Content
            available on BookingNow, including any Content or information Customer has posted.  
            <br />
            Customer agrees that any Content, ideas posted by Customer either through the Services or otherwise transferred to BookingNow will not be kept confidential by BookingNow and
            may be disseminated or used by BookingNow or its affiliated companies without charge or liability to Customer, for any purpose, including developing, manufacturing and
            promoting products.
            <br />
            Customer acknowledges and agrees that BookingNow may access, maintain, and disclose Customer Account information, Content, and any materials or other information Customer
            provides to BookingNow where required by law or by order of a court or governmental authority or competent government authority to request BookingNow, or Other causes as
            prescribed by law
          </div>
          <div className="my-5 w-full font-bold leading-[160%] text-slate-950 max-md:max-w-full">III. GENERAL</div>
          <div className="text-xl leading-8">
            BookingNow reserves the right to modify these Terms of Service at any time by posting the revised Terms of Service to BookingNow. Customer{`'`}s continued use of BookingNow
            after the change is posted will constitute Customer{`'`}s acceptance of the revised Terms of Service.
            <br />
            The Customer is not permitted to assign, sublicense or assign any of the rights or obligations granted to the Customer hereunder.
            <br />
            These Terms of Service are solely for the benefit of BookingNow and Customer and not for the benefit of any other person or entity
            <br />
            You agree to comply with all applicable laws relating to anti-corruption and anti-bribery.
            <br />
            If you have any questions or concerns regarding the Terms of Service or issues arising in connection with the Terms of Service, please contact BookingNow at email{" "}
            <a className="text-blue-900" href={`mailto:${DEFAULT_EMAIL}`}>
              {DEFAULT_EMAIL}.
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ReturnPolicy)
