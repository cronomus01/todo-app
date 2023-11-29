import MyProfileImage from "../../assets/irefrans-cosme.png";
const Profile = () => {
  return (
    <div className="w-[30px] border rounded-full bg-slate-300">
      <img className="w-full rounded-full" src={MyProfileImage} alt="test" />
    </div>
  );
};

export default Profile;
