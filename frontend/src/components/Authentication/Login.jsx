import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import { useHistory } from "react-router-dom"

const Login = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)
    const toast = useToast();
    const history = useHistory();

    const submitHandler = async () =>{
        setloading(true)
        if(!email || !password){
            toast({
                title: 'Please fill all the details',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            setloading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const {data} = await axios.post(
                "http://localhost:4000/api/user/login",
                { email, password},
                config
            );

            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            // history.pushState("http://localhost:4000/api/chat");
            setloading(false);
        } catch (error) {
            // console.log(error);
            // console.log(error.response.data.messsage);
            toast({
                title: error.response.data.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            setloading(false);
        }
    }


    return (
        <VStack spacing="5px">
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter your email :' onChange={(e) => { setemail(e.target.value) }} />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input placeholder='Enter your Password :' onChange={(e) => { setpassword(e.target.value) }} />
            </FormControl>


            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            > Login
            </Button>
        </VStack>
    )
}

export default Login
