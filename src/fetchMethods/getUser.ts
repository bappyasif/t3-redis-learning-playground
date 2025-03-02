"use server"

export const fetchUser = async () => {
    const fetchUser = await fetch("https://jsonplaceholder.typicode.com/users/1")
    const jsonUser = await fetchUser.json()
    return jsonUser
}