import { gql } from "@apollo/client";

export const GET_RELATIONS = gql`
    query 
    {
        applicantIndividualCompanyRelations
        {
            data 
            {
                id
                name
            }
        }
    }
`