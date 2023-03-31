import { Box, Badge } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardBody, CardFooter ,Heading} from '@chakra-ui/react'

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

  console.log(title);


  return (
    <Card>
  <CardHeader>
    <Heading size='md'>Client Report</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Summary
        </Heading>
        <Text pt='2' fontSize='sm'>
          View a summary of all your clients over the last month.
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Overview
        </Heading>
        <Text pt='2' fontSize='sm'>
          Check out the overview of your clients.
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Analysis
        </Heading>
        <Text pt='2' fontSize='sm'>
          See a detailed analysis of all your business clients.
        </Text>
      </Box>
    </Stack>
  </CardBody>
</Card>
    // <Box maxw='sm' borderWidth='1px' borderRadius='1g' overflow='hidden' m={15}>
    //   <Link to={slug(title)} state={id}>
    //     <img src={image} alt={title} />
    //     <Box p={6}>
    //       <Box slug={title} mt='1'
    //         fontWeight={'semibold'}
    //         as='h4'
    //         lineHeight={'tight'}>

    //       </Box>
    //       <hr />
    //       <Box display={'flex'} alignItems={'baseline'}>
    //         <Badge borderRadius={'full'} px='2'>
    //           User :
    //         </Badge>
    //         <Box color="gray.500"
    //           fontWeight={'semibold'}
    //           fontSize='xs' ml='2'>
    //           {userId}
    //         </Box>
    //       </Box>
    //     </Box>
    //   </Link>
    // </Box>
  )
}
