function safeString (string) {
    return string
    .replace(/\</g, '&lt')
    .replace(/\>/g, '&gt')
    .replace(/&/g, '&amp')
    .replace(/\"/g, '&quot')
    .replace(/\'/g, '&#39');
}