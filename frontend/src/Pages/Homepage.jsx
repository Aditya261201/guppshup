import React from 'react'
import { Box, Container ,Tab,TabList,TabPanel,TabPanels,Tabs,Text  } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'



const Homepage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box d="flex" justifyContent="center" bg="white" w="100%" borderRadius="lg" borderWidth="1px" m="40px 0 15px 0">
        <Text fontSize="4xl" p="10px 10px" align="center" fontFamily="work sans">GupShupp</Text>
      </Box>
      <Box bg="white" w="100%" p="4px" borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded'>
          <TabList d="flex" alignItems="center" justifyContent="center">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            {/* login form */}
              <Login />
            </TabPanel>
            <TabPanel>
            {/* signup form  */}
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage
