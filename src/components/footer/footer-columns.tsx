import Link from "next/link"
import React from "react"

import { ADDRESS_LIST, FOOTER_COLUMNS } from "@/constants/footer.constant"
import { DEFAULT_EMAIL, DEFAULT_PHONE_NUMBER } from "@/constants/base.constant"

const FooterColumns = () => {
  return (
    <div className="flex justify-between flex-wrap flex-grow min-width-[800px] xl:rtl:pl-60">
      {FOOTER_COLUMNS.map((item, index) => {
        return (
          <div className="mt-6 md:mt-0" key={index}>
            <h2 className="text-[18px] border-b-2 text-primary font-semibold border-[#BCBCBC] pb-4 inline-block max-w-max">{item.titleEn}</h2>
            <div className="flex flex-col mt-2">
              {item.subtitles?.map((subItem, subIndex) => {
                return (
                  <Link href={subItem.href} key={`${index}${subIndex}`}>
                    <a className="text-primary text-[14px] py-2 hover:underline">{subItem.textEn}</a>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
      <div className="mt-6 md:mt-0 max-w-[350px] w-full">
        <h2 className="text-[18px] border-b-2 text-primary font-semibold border-[#BCBCBC] pb-4 inline-block max-w-max">Contact information</h2>
        <div className="flex flex-col mt-2">
          <a href={`mailto:${DEFAULT_EMAIL}`} className="text-[14px] text-justify text-primary py-2 hover:underline">
            <span className="font-bold">Email:</span> {DEFAULT_EMAIL}
          </a>
          <a href={`tel:${DEFAULT_PHONE_NUMBER}`} className="text-[14px] text-justify text-primary py-2 hover:underline">
            <span className="font-bold">Phone number:</span> {DEFAULT_PHONE_NUMBER}
          </a>
          {ADDRESS_LIST.length > 0 &&
            ADDRESS_LIST.map((address, index) => {
              return (
                <a className="text-[14px] text-justify text-primary py-2" key={index}>
                  <span className="font-bold">Address {index + 1}:</span> {address.titleEn}
                </a>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default FooterColumns
