
import MainLayoutWebsite from "Layout/MainLayoutWebsite";
import ProfileMain from "components/profile/profileMain";
import { useNavigate } from "react-router-dom";
const Profile=()=>{
    const navigate=useNavigate();

    return(
        <div>
            {
               localStorage.getItem('UserName') ?
               <MainLayoutWebsite>
                    <ProfileMain/>
                </MainLayoutWebsite>
               :
               
               navigate("/")
              
            }
          
            
        </div>
    )
}
export default Profile