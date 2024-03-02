import React , {useState} from 'react'
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import {useHistory} from "react-router-dom"


const Signup = () => {

    const toast = useToast();
    const history = useHistory();
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [pic, setpic] = useState("")
    const [loading, setloading] = useState(false);


    const postdetails = (pics) =>{
        setloading(true);
        if(pics===undefined){
            toast({
                title: 'Please select an image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'top'
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","gupshupp");
            data.append("cloud_name","dwcziqqgt");
            fetch("https://api.cloudinary.com/v1_1/dwcziqqgt/image/upload",{
                method: 'post',
                body:data
            }).then((res)=> res.json())
            .then(data => {
                setpic(data.url.toString());
                console.log(data.url.toString());
                setloading(false);
            })
            .catch((err)=>{
                console.log(err);
                setloading(false);
            })
        }else{
            toast({
                title: 'Please select an image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            setloading(false);
            return;
        }
    }

    const submitHandler =async () =>{
        setloading(true);
        if(!name || !email || !password || !confirmpassword){
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
        if(password != confirmpassword){
            toast({
                title: 'Password doesnt match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            setloading(false);
            return;
        }

        try {
            const config={
                headers: {
                    "Content-Type":"application/json",
                },
            };

            const response = await axios.post(
                "http://localhost:4000/api/user",
                {name,email,password,pic},
                config
            );
            if(response && response.data){
                const data = response.data;
            }
            toast({
                title: 'Registration Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            localStorage.setItem("userInfo",JSON.stringify(data));
            // history.pushState("http://localhost:4000/api/chat");
            setloading(false);
        } catch (error) {
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

            <Button colorScheme="blue" width="100%" style={{marginTop: 15}} onClick={submitHandler} isLoading={loading}>
                Sign up
            </Button>
        </VStack>
    )
}

export default Signup
