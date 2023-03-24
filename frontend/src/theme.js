import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  text: "#000",
  toggleBorder: "#FFF",
  gradient: "linear-gradient(#39598A, #79D7ED",
};

export const darkTheme = {
  body: "#363537",
  text: "#FAFAFA",
  toggleBorder: "#6B8096",
  gradient: "linear-gradient(#091236, #1E215D",
};

export const GlobalStyle = createGlobalStyle`
*,
*::afrer,*::before{
    box-sizing:border-box;
}
body{
    align-items:center;
    background:${({ theme }) => theme.body};
    color:${({ theme }) => theme.text};
    flex-direction:column;
    justify-content:center;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition:all 0.25s linear;
}`;
