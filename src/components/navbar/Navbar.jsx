import { Menu, Button, Flex } from 'antd';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutHandler } from '../../redux/AuthActions';
import WorkspaceDropDown from '../workspaceDropdown/WorkspaceDropdown';
import AddWorkspaceButton from '../addWorkspaceButton/AddWorkspaceButton';

const Navbar = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { email, name, image, isLoggedIn } = useSelector((store) => {
        return {
            isLoggedIn: store.isLoggedIn,
            email: store.email,
            name: store.name,
            image: store.image
        };
    });

    /*
    const onLogoutSuccess = () => {
        dispatch(logoutHandler());
    }
    */

    return (
        <Menu mode="horizontal">

            <img src={require("../../assets/full-logo.png")} alt="Logo" style={{ width: '120px', margin: '13px 150px', cursor: 'pointer' }} 
            onClick={() => {navigate('/')}}/>

            {isLoggedIn &&
                <div>
                    <Flex>
                        <AddWorkspaceButton />
                        <WorkspaceDropDown />
                    </Flex>
                </div>}
            <div className="right-menu">
                {!isLoggedIn ?
                    <>
                        <Button className='button-login' onClick={() => {
                            navigate("login");
                        }}>
                            Giriş yap
                        </Button>
                        <Button onClick={() => {
                            navigate("register");
                        }}>
                            Kayıt ol
                        </Button>
                    </>
                    :
                    <div>
                        <Button onClick={() => {
                            dispatch(logoutHandler());
                            navigate('login');
                        }}>
                            Çıkış yap
                        </Button>
                    </div>

                }
            </div>
        </Menu>
    );
};

export default Navbar;
