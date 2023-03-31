import { Box, Badge } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardBody, CardFooter, Heading } from '@chakra-ui/react'

export default function PostList(props) {
  const { id, title, image, content, userId } = props;

  // Rest of the code here


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

 


  return (

    <Box maxWidth='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' m={15}>
      <Link to={slug(title)} state={id}>
        <img src={image} alt={title} />
        <Box p={6}>
          <Box title={title} mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'>
            {title}
          </Box>
          <hr />
          <Box display='flex' alignItems='baseline'>
            <Badge variant='solid' borderRadius='full' px='2' colorScheme='blue'>
              User:
            </Badge>
            <Box color='gray.500'
              fontWeight='semibold'
              fontSize='xs' ml='2'>
              {userId}
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>

  )
}
