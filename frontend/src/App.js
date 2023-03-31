import './App.css';
import { lightTheme, darkTheme, GlobalStyle } from './theme';
// import {ColorModeSwitcher} from "./ColorModeSwitcher";
import {
  ChakraProvider, Box, useDisclosure,
  Grid, VStack, Text, Flex, HStack, Spacer,
  Stack, Switch, Container, Modal, ModalOverlay,
  ModalHeader, ModalBody, FormControl, Input, ModalFooter, Button, ModalContent, UnorderedList, ListItem
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { MoonIcon, SunIcon, Search2Icon } from '@chakra-ui/icons';
import { ThemeProvider } from 'styled-components';
import Main from './components/Main';
import Contact from './components/Pages/Contact';
import SinglePost from './components/blogComponents/SinglePost';

function App() {

  const [theme, setTheme] = useState("dark");
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResultitem, setSearchresultItems] = useState([]);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  /**
   * switch theme on and off
   */
  const changeThemeSwitch = () => {
    let newValue = null;
    newValue = !isSwitchOn;
    setIsSwitchOn(newValue);

    !newValue ? setTheme('light') : setTheme('dark');
  }
  function slug(string) {
    if (typeof string !== 'string') {
      return '';
    }

    const trimmedString = string.trim();

    if (trimmedString.length === 0) {
      return '';
    }

    return trimmedString.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  /**
   * get search result from database
   */
  const fetchSearhResults = async (searchTerm) => {
    const res = await fetch(
      `http://localhost/php/reactPhp/api/searchresult?keyword=${searchTerm}`,
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );
    return await res.json();
  }

  /**
   * when search term update fetch data
   */
  useEffect(() => {
    const getUserInput = setTimeout(() => {
      fetchSearhResults(searchTerm).then((items) => {
        // console.log(item.posts);
        setSearchresultItems(items.posts);
      })
    }, 100);
    return ()=>clearTimeout(getUserInput);
  }, [searchTerm]);

  return (

    <div className="App">
      <ChakraProvider>
        {/* <Box textAlign={"center"} fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
              <VStack spacing={8}>
                <Text>
                  Some Content
                </Text>
                <Link color={'teal.500'}
                href="#"
                fontSize={"2xl"}
                target="_blank"> 
                  Explore More
                </Link>
              </VStack>
          </Grid>
        </Box> */}
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <BrowserRouter>
            <GlobalStyle />
            <Box bg={theme === 'light' ? '#333' : '#fff'}
              borderBottom={theme === 'light' ? 'solid 1px #333' : 'solid 1px  #fff'}
              color={theme === 'light' ? '#fff' : '#333'} px={4}>
              <Flex h={16} alignItems={"center"} justifyContent="space-between">
                <HStack spacing={16} alignItems={"left"}>
                  <HStack as={'nav'} spacing={6} display={{ base: 'none', md: 'flex' }}>
                    <Link to="/">Home</Link>
                    <Link to="/contact">Contact</Link>
                  </HStack>
                </HStack>
                <Search2Icon onClick={onOpen}></Search2Icon>
                <HStack>

                  <Flex alignItems={'center'} >
                    <Spacer></Spacer>
                    <Stack direction={'row'} spacing={7}>
                      <Switch onChange={changeThemeSwitch} >
                        {isSwitchOn ? (<MoonIcon mr="5" />) : (<SunIcon mr="5" />)}
                      </Switch>
                    </Stack>
                  </Flex>
                </HStack>
              </Flex>
            </Box>
            <Modal initialFocusRef={initialRef}
              isCentered
              onClose={onClose}
              isOpen={isOpen}
              motionPreset='slideInBootom'
              bg='blue'>
              <ModalOverlay
                bg='none'
                backdropFilter={'auto'}
                backdropInvert='80%'
                backdropBlur={'2px'}>
                <ModalContent>
                  <ModalHeader color={'#333'}>
                    Type Keyword to search
                  </ModalHeader>
                  <ModalBody pb={6}>
                    <FormControl mt={4}>
                      <Input
                        placeholder=''
                        ref={initialRef}
                        color={'#333'}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </FormControl>
                    <br />
                    {searchResultitem && 
                    <UnorderedList color={theme === 'light' ? '#333' : '#333'}>
{searchResultitem.map(function(item){
  return (<Link to={slug(item.title)} key={item.id}>
    <ListItem key={item.id} >
{item.title}
    </ListItem>
  </Link>)
})}
                    </UnorderedList>
                    }
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}> Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </ModalOverlay>
            </Modal>
            <div className='App'>
              <Container maxW={"1200px"} marginTop={'50px'}>
                <Routes>
                  <Route exact path='/' element={<Main />}></Route>
                  <Route path='/contact' element={<Contact />}></Route>
                  <Route path=':slug' element={<SinglePost />}></Route>

                </Routes>
              </Container>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </ChakraProvider>
    </div>
  );
}
export default App;
