//import * as tokenService from './tokenService'

//set base url for api 
const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/profile/` // subject to change


async function getProfile() {
  try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`,
                       'Content-Type': 'application/json' }
        });

        // Handle the response here (e.g., convert to JSON or check status)
        const profile = await res.json();
        console.log(profile,'res');
        return profile;
    } catch (error) {
        console.error('Error fetching profile:', error);
    }

}

async function updateProfile(profileData) {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}`, {
      method: 'PUT', 
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });

    const updatedProfile = await res.json();
    console.log(updatedProfile);
    return updatedProfile;
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}

export { getProfile, updateProfile }