export const emailPattern = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/
export const usernamePattern = /^(?=.*\d)(?=.*[a-z])[a-z\d]{6,}$/
export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&/]{8,}$/
export const fullNamePattern = /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂưạảấầẩẫậắằẳẵặẹẻẽềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
export const phonePattern = /^[+]?\d+$/

export const BASE_CONSTANTS = {
  BASE_URL: process.env.BASE_URL || "https://gw.qc.wordoflifeusa.vn/enterprise/api/v1"
}

export const LOGIN_ERRORS = {
  INCORRECT_PASSWORD_OR_LOGIN_WOLCG: "INCORRECT_PASSWORD_OR_LOGIN_WOLCG",
  INCORRECT_PASSWORD: "INCORRECT_PASSWORD",
  NOT_FOUND_USER: "NOT_FOUND_USER",
  USER_BLOCK: "USER_BLOCK",
  INCORRECT: "INCORRECT",
  DELETED: "DELETED"
}

export const JWT_CONFIG = {
  storageUserRemember: "storageUserRemember",
  remember: "remember"
}

export const DEFAULT_PHONE_NUMBER = "0123456789"

export const DEFAULT_EMAIL = "G6CQ2@example.com"

export const PAYMENT_STATUS = {
  NEW_REQUEST: "NEW_REQUEST",
  DEPOSIT_ADVANCE: "DEPOSIT_ADVANCE",
  COMPLETED: "COMPLETED"
}

export const ORDER_STATUS = {
  WAITING_CONFIRM: "WAITING_CONFIRM",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  CANCELLED_BY_ADMIN: "CANCELLED_BY_ADMIN",
  REFUND_COMPLETED: "REFUND_COMPLETED"
}
