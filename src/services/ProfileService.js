import axios from 'axios';
import { USER } from '../constants/apiRoutes';

async function saveUserProfile(token, {name, email, profilePicture}) {
    return axios.put(
        USER.UPDATE_PROFILE,
        { name, email, profilePicture },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
}

export { saveUserProfile };