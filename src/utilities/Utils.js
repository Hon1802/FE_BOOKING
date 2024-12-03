export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    if (!file) {
      alert("Please select an image")
    } else {
      fileReader.readAsDataURL(file)
      fileReader.onload = (event) => {
        var imagePath = event.target.result

        resolve(imagePath)
      }
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

export function base64ToFile(base64data, fileName, mimeType) {
  const byteCharacters = atob(base64data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)

  // Tạo tệp tin từ mảng bytes
  const blob = new Blob([byteArray], { type: mimeType })

  return new File([blob], fileName, { lastModified: new Date().getTime(), mimeType })
}
