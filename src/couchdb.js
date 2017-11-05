/**
 * Created by beggl on 11/5/2017.
 */
import nano from 'nano'


export class MemberDao {
    constructor() {
        this.fam = nano('http://localhost:5984').use('fam')
    }

    getMembers(name) {
        return new Promise( (resolve, reject) => {
            this.fam.get(name,function(err, doc){
                if(err !== null)
                    return reject(err)
                resolve(doc.allMembers)

            })
        })
    }
}



