import './App.css';
import { lightTheme, darkTheme, GlobalStyle } from './theme';
// import {ColorModeSwitcher} from "./ColorModeSwitcher";
import { ChakraProvider, Box, Grid, VStack, Text, Flex, HStack, Spacer, Stack, Switch, Container } from '@chakra-ui/react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes,Link } from "react-router-dom";
import { MoonIcon, SunIcon, Search2Icon } from '@chakra-ui/icons';
import { ThemeProvider } from 'styled-components';
import Main from './components/Main';
import Contact from './components/Pages/Contact';

function App() {

  const [theme, setTheme] = useState("dark");
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  /**
   * switch theme on and off
   */
  const changeThemeSwitch = () => {
    let newValue = null;
    newValue = !isSwitchOn;
    setIsSwitchOn(newValue);

    !newValue ? setTheme('light') : setTheme('dark');
  }

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
                <Search2Icon></Search2Icon>
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
            <div className='App'>
              <Container maxW={"1200px"} marginTop={'50px'}>
                <Routes>
                  <Route  exact path='/' element={<Main/>}></Route>
                  <Route path='/contact' element={<Contact/>}></Route>
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
