import React, { useEffect,useState } from 'react'
import axios from "axios"

const Chatpage = () => {
    
    const [chats, setChats] = useState([]);
    const fetchchats = async () => {
        try {
            const {data} = await axios.get("http://localhost:4000/api/chat");
            console.log(data);
            setChats(data);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    }

    useEffect(() => {
        fetchchats();
    }, [])


    return (
        <div>
            {chats.map(chat =><div key={chat._id}>{chat.chatName}</div> )}
        </div>
    )
}

export default Chatpage
