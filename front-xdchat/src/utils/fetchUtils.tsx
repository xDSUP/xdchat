const PORT = "8080" // TODO: выпилить хардкод порта, тк все приложение будет в докере

export enum Method {
    POST,
    PUT,
    DELETE
}

export function getServerApiUrl(path?: string) {
    let url = new URL(window.location.origin);
    url.port = PORT;
    return new URL("api/" + (path || ""), url)
}

export function getStompSocketUrl() {
    let url = new URL(window.location.origin);
    url.port = PORT;
    url.protocol = "ws";
    return new URL("stomp", url)
}

function responseHandler<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
}

export function apiGet<T>(path: string): Promise<T> {
    return fetch(getServerApiUrl(path))
        .then(responseHandler<T>)
}

export function api<T>(path: string, method: Method, body?: Object): Promise<T> {
    return fetch(getServerApiUrl(path), {
        method: Method[method],
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body || {})
    })
        .then(responseHandler<T>)
}