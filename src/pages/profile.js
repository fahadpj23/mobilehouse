
import MainLayoutWebsite from "components/MainLayoutWebsite";
import ProfileMain from "components/profile/profileMain";
import { useHistory } from "react-router";
const Profile=()=>{
    const history=useHistory();

    return(
        <div>
            {
               localStorage.getItem('UserName') ?
               <MainLayoutWebsite>
                    <ProfileMain/>
                </MainLayoutWebsite>
               :
               
               history.push("/")
              
            }
          
            
        </div>
    )
}
export default Profile