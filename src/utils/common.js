function S4 () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}

export function guid () {
    return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4()
}

export function setCookie (name, value, minutes = 30, path = '/', domain = '') {
    const expires = new Date(Date.now() + minutes * 60000).toGMTString()
    document.cookie = name + `=${encodeURIComponent(value)};expires=${expires};path=${path}` + (domain ? `;domain=${domain}` : '')
}

export function getCookie (name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}

export function deleteCookie (name, path = '/') {
    setCookie(name, '', -1, path)
}

export function getCsrfToken () {
    let token = getCookie('csrf_token')
    if (!token) {
        setCookie('csrf_token', token = guid(), 5)
    }
    return token
}
