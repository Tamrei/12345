export function putInBraces(string, val) {
    string = string.replace(/{.*}/, val);
    return string;
}