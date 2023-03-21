const headers = (token) => {
    return {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

export default headers
