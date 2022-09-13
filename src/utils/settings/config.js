export const userfromLocal = JSON.parse(localStorage.getItem("user")) || "";


export const TOKEN = JSON.parse(localStorage.getItem("token")) || "";

export const userRole = userfromLocal.type || "";