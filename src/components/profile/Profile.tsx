import MyProfileImage from "../../assets/default-light.webp";
const Profile = () => {
  return (
    <div className="w-[35px] border rounded-full p-1">
      <img className="w-full rounded-full" src={MyProfileImage} alt="test" />
    </div>
  );
};

export default Profile;
