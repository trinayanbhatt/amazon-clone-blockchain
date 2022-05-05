import { createContext, useState, useEffect } from "react"
import { useMoralis, useMoralisQuery} from "react-moralis"

export const AmazonContext = createContext()

export const AmazonProvider = ({childern}) => {

    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')

    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled,
    } = useMoralis()

    useEffect(()=> {
        ;(async()=> {
            if(isAuthenticated){
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
            }
        })()
    }, [isAuthenticated, user, username])

     const handleSetUsername = () => {
         if(user){
             if(nickname){
                 user.set('nickname', nickname)
                 user.save()
                 setNickname('')
                }
            else {
                console.log("Can't set empty nickname")
            }
         }
         else {
             console.log("No user")
         }
     }
    return (
        <AmazonContext.Provider 
            value ={{
                isAuthenticated,
                setNickname,
                nickname,
                username,
                setUsername
            }}
        >
            {childern}
        </AmazonContext.Provider>
    )
}