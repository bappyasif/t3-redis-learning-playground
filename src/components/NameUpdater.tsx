import { trpc } from "@/utils/trpc"
import { useState } from "react"

export const NameUpdater = () => {
    const [name, setName] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleUpdateName = async () => {
        // This will call the updateUser mutation with the current
        // value of the "name" state variable as an argument.
        // The mutate function will return a promise that resolves
        // when the mutation is complete.
        // await trpc.user.getUser.useQuery()

        // await trpc.user.updateUser.mutate({ name })
        // const res = await trpc.user.updateName()
        // console.log(res, "res")

        const res = await trpc.user.updateSmthng.mutate()
        console.log(res, "res")
    }

    return (
        <div>
            <h1>Update Name</h1>
            <input value={name} onChange={handleChange} type="text" />
            <button onClick={handleUpdateName}>Update Name</button>
        </div>       
    )
}