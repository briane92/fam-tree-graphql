/**
 * Created by beggl on 11/4/2017.
 */
import Member from './memberSchema'
import {GraphQLList, GraphQLID, GraphQLNonNull} from '../graphql'



const members = [

]



export default {
    getMembersByFamilyId: {
        type: new GraphQLList(Member),
        description: 'All the family members for a specific family',
        args: {
            familyId: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve: (source, {id}) => {
            return members
        }
    }


}