import MyProfileImage from '../../assets/default-light.webp';
import Searchbar from '../Searchbar';

function Avatar({ icon }) {
    return (
        <>
            <figure className="flex gap-2 items-center justify-start">
                <img
                    src={icon}
                    alt="John Doe"
                    className="w-8 order-2 border rounded-full p-1"
                />
                <figcaption className="order-1">John Doe</figcaption>
            </figure>
        </>
    );
}

const Header = () => {
    return (
        <>
            <header className="flex justify-between items-center px-2 border-b-[1px]">
                <Searchbar></Searchbar>
                <Avatar icon={MyProfileImage} />
            </header>
        </>
    );
};

export default Header;
