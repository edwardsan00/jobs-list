import { gql } from 'apollo-boost'

export const GET_COUNTRIES = gql`
  query countries{
    countries{
      id
      name
      slug
    }
  }
`

export const GET_COMPANIES = gql`
  query companies{
    companies{
      id
      name
      slug
    }
  }
`

export const GET_JOBS = gql`
  query jobs{
    jobs{
      id
      title
      slug
      commitment{
        title
        slug 
      }
      cities(first: 1){
        name
        type
        country{
          name
          slug
          type
          isoCode  
        }
      }
      remotes{
        name
        type
      }
      tags(first: 3){
        id
        name
        slug
      }
      company{
        name
        logoUrl
      }
      isPublished
      isFeatured
      locationNames
      userEmail
      postedAt
    }
  }
`