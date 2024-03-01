import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
 

    const submitHandler = () =>{
        
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
                // isLoading={loading}
            > Login
            </Button>
        </VStack>
    )
}

export default Login
