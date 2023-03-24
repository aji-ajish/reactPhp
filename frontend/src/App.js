import logo from "./logo.svg";
// import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./theme";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box, ChakraProvider, Grid, VStack, Text, Link, Flex, HStack, Spacer, Stack, Switch, } from "@chakra-ui/react";
import { MoonIcon,SunIcon,Search2Icon } from "@chakra-ui/icons";
import './App.css';

function App() {
  const [theme, setTheme] = useState("light");
  const [isSwichOn,setIsSwitchOn] =useState(true);
  /**
   * switch theme on nd off
   */
    const changeThemeSwitch=()=>{
    let newValue =null;
    newValue=!isSwichOn;
    setIsSwitchOn(newValue);

    !newValue ? setTheme('dark'):setTheme('light');
    }

  return (
    <div className="App">
      <ChakraProvider>
        
        {/* <Box textAlign="center" fontSize="xl"> 
                  <Grid minHeight="100vh" p={3}>
                    <ColorModeSwitcher justifySelf="flex-end" />
                    <VStack spacing={8}>
                      <Text>Some Content</Text>
                      <Link
                        color="teal.500"
                        href="https://google.com"
                        fontSize="2xl"
                        target="_blank" >
                        Explor More
                      </Link>
                    </VStack>
                  </Grid>
         </Box>*/}
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <BrowserRouter>
            <GlobalStyle />
            <Box bg={theme==='light'? '#333' : '#fff'}
            borderBottom={theme==='light'? 'solid 1px #333' : 'solid 1px #fff'}
            color={theme==='light'? '#fff' : '#333'}
            >
              <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"} >
                <HStack spacing={16} alignItems={"left"}>
                  <HStack
                    as={"nav"}
                    spacing={6}
                    display={{
                      base: "none",
                      md: "flex",
                    }}>
                    <Link to="/"> Home </Link>
                    <Link to="/contact"> Contct </Link>
                  </HStack>
                  <Search2Icon />
                  <Flex alignItems={'center'}>
                    <Spacer></Spacer>
                    <Stack direction={'row'} spacing={7}></Stack>
                    <Switch onChange={changeThemeSwitch}>
                      {isSwichOn ? (<MoonIcon mr="5" />) : (<SunIcon mr="5" />) }
                    </Switch>
                  </Flex> 
                </HStack>
              </Flex>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
