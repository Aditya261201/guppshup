import React , {useState} from 'react'
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'

const Signup = () => {


    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [pic, setpic] = useState("")


    const postdetails = (pics) =>{

    }

    const submitHandler = () =>{

    }



    return (
        <VStack spacing="5px">
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder='Enter your name :' onChange={(e) => { setname(e.target.value) }} />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter your email :' onChange={(e) => { setemail(e.target.value) }} />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input placeholder='Enter your Password :' onChange={(e) => { setpassword(e.target.value) }} />
            </FormControl>
            <FormControl id="confirmpassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input placeholder='Confirm Password :' onChange={(e) => { setconfirmpassword(e.target.value) }} />
            </FormControl>
            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input type='file' p={1.5} accept="image/*" onChange={(e) => { postdetails(e.target.files[0]) }} />
            </FormControl>

            <Button colorScheme="blue" width="100%" style={{marginTop: 15}} onClick={submitHandler}>
                Sign up
            </Button>
        </VStack>
    )
}

export default Signup
