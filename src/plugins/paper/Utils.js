export default class Utils {
  truncate (text, maxLength) {
    if (text && text.length > maxLength) {
      text = text.substr(0, maxLength - 3) + '...'
    }
    return text
  }
}
